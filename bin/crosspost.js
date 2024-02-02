import 'dotenv/config';
import { program } from 'commander';
import kleur from 'kleur';
import { readFile, getSaved, writeSaved } from './utils.js';
import devtoAdapter from './crosspost.devto.js';
import hashnodeAdapter from './crosspost.hashnode.js';

const adapters = {
  devto: devtoAdapter,
  hashnode: hashnodeAdapter,
};

program
  .name('crosspost')
  .description('CLI to crosspost to dev.to and hashnode');

program
  .command('create')
  .argument('<slug>', 'slug of the post')
  .option('--draft', 'publish as draft even if front matter says otherwise')
  .option('-u, --update', 'updates if article already exists')
  .option('-p, --platform [platform]', 'set the platform to publish to')
  .action(async (slug, options) => {
    const { draft, update } = options;
    const platform = options.platform ?? 'devto';
    const article = await readFile(slug);
    if (draft) article.published = false;
    const saved = await getSaved(platform);
    for (const published of saved[platform].published) {
      if (published.title === article.title) {
        if (!update) {
          console.error(
            kleur.red('\nThe article has been published already\n'),
          );
          console.error(
            `\t${kleur.bold().gray('ID:')} ${kleur.yellow(published.id)}`,
          );
          console.error(
            `\t${kleur.bold().gray('Title:')} ${kleur.yellow(published.title)}`,
          );
          console.error(
            `\t${kleur.bold().gray('Slug:')} ${kleur.yellow(published.slug)}`,
          );
          process.exit(1);
        } else {
          const id = published.id;
          try {
            await adapters[platform].updateArticle(id, article);
            console.log(
              kleur.green('Updated article since it already existed'),
            );
            process.exit(0);
          } catch (err) {
            console.log(err);
            console.error(JSON.parse(err.response.body));
            process.exit(1);
          }
        }
      }
    }
    try {
      await adapters[platform].createArticle(article);
      process.exit(0);
    } catch (err) {
      console.error(JSON.parse(err.response.body));
      process.exit(1);
    }
  });

program
  .command('update')
  .argument('<slug>', 'slug of the post')
  .option('-p, --platform [platform]', 'set the platform to publish to')
  .requiredOption('-i, --id <id>', 'id of the post')
  .action(async (slug, options) => {
    const id = options.id;
    const platform = options.platform ?? 'devto';
    const article = await readFile(slug);
    try {
      await adapters[platform].updateArticle(id, article);
      console.log(kleur.green('Updated article'));
      process.exit(0);
    } catch (err) {
      console.error(JSON.parse(err.response.body));
      process.exit(1);
    }
  });

program
  .command('init')
  .option('-p, --platform [platform]', 'set the platform to publish to')
  .action(async (options) => {
    const platform = options.platform ?? 'devto';
    const articles = await adapters[platform].getArticles();
    const saved = await getSaved(platform);
    for (const article of articles) {
      if (!saved[platform].published.find((p) => p.id === article.id)) {
        saved[platform].published.push({
          id: article.id,
          title: article.title,
          slug: article.slug,
        });
      }
    }
    await writeSaved(saved, platform);
  });

program.parse();
