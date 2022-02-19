import 'dotenv/config';
import { program } from 'commander';
import kleur from 'kleur';
import {
  readFile,
  getOptions,
  updateDevtoArticle,
  createDevtoArticle,
} from './utils.js';

program
  .name('crosspost')
  .description('CLI to crosspost to dev.to and hashnode');

program
  .command('create')
  .argument('<slug>', 'slug of the post')
  .option('--draft', 'publish as draft even if front matter says otherwise')
  .option('-u, --update', 'updates if article already exists')
  .option('-p, --platform [platform]', 'set the platform to publish to')
  .action(async (slug, { draft, update }) => {
    const article = await readFile(slug);
    if (draft) article.published = false;
    const options = await getOptions();
    for (const published of options.drafts.concat(options.published)) {
      if (published.title === article.title) {
        if (!update) {
          console.error(
            kleur.red('\nThe article has been published already\n')
          );
          console.error(
            `\t${kleur.bold().gray('ID:')} ${kleur.yellow(published.id)}`
          );
          console.error(
            `\t${kleur.bold().gray('Title:')} ${kleur.yellow(published.title)}`
          );
          console.error(
            `\t${kleur.bold().gray('Slug:')} ${kleur.yellow(published.slug)}`
          );
          process.exit(1);
        } else {
          const id = published.id;
          try {
            await updateDevtoArticle(id, article);
            console.log(
              kleur.green('Updated article since it already existed')
            );
            process.exit(0);
          } catch (err) {
            console.error(JSON.parse(err.response.body));
            process.exit(1);
          }
        }
      }
    }
    try {
      await createDevtoArticle(article);
      process.exit(0);
    } catch (err) {
      console.error(JSON.parse(err.response.body));
      process.exit(1);
    }
  });

program
  .command('update')
  .argument('<slug>', 'slug of the post')
  .requiredOption('-i, --id <id>', 'id of the post')
  .action(async (slug, { id }) => {
    const article = await readFile(slug);
    try {
      await updateDevtoArticle(id, article);
      console.log(kleur.green('Updated article'));
      process.exit(0);
    } catch (err) {
      console.error(JSON.parse(err.response.body));
      process.exit(1);
    }
  });

program.parse();
