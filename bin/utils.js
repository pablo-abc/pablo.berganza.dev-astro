import fs from 'node:fs/promises';
import fm from 'front-matter';
import got from 'got';

export async function getOptions() {
  try {
    const content = await fs.readFile('./bin/.crosspost.options.json', 'utf-8');
    const options = JSON.parse(content);
    if (!options.drafts) options.drafts = [];
    if (!options.published) options.published = [];
    return options;
  } catch {
    const defaultOptions = {
      drafts: [],
      published: [],
    };
    await fs.writeFile(
      './bin/.crosspost.options.json',
      JSON.stringify(defaultOptions, null, 2)
    );
    return defaultOptions;
  }
}

export async function writeOptions(options) {
  return fs.writeFile(
    './bin/.crosspost.options.json',
    JSON.stringify(options, null, 2)
  );
}

export async function updateOptions(article) {
  const options = await getOptions();
  if (article.published) {
    options.drafts = options.drafts.filter((d) => d.id !== article.id);
    if (!options.published.find((p) => p.id === article.id)) {
      options.published = options.published.push({
        id: article.id,
        title: article.title,
        slug: article.slug,
      });
    }
  } else {
    options.published = options.drafts.filter((d) => d.id !== article.id);
    if (!options.drafts.find((p) => p.id === article.id)) {
      options.drafts = options.published.push({
        id: article.id,
        title: article.title,
        slug: article.slug,
      });
    }
  }
  return writeOptions(options);
}

export async function readFile(slug) {
  return fs
    .readFile(`./src/posts/en/${slug}.md`, 'utf-8')
    .then(fm)
    .then((p) => {
      return {
        body_markdown: p.body,
        published: p.attributes.published,
        tags: p.attributes.tags,
        main_image: `https://pablo.berganza.dev/assets/blog-pics/${p.attributes.created}.${p.attributes.imgext}`,
        canonical_url: `https://pablo.berganza.dev/blog/${slug}`,
        series: p.attributes.series,
        title: p.attributes.title,
        description: p.attributes.description,
      };
    });
}

export async function updateDevtoArticle(id, article) {
  const response = await got
    .put(`https://dev.to/api/articles/${id}`, {
      headers: {
        'api-key': process.env.DEVTO_KEY,
      },
      json: { article },
    })
    .json();
  await updateOptions(response);
}

export async function createDevtoArticle(article) {
  const response = await got
    .post('https://dev.to/api/articles', {
      headers: {
        'api-key': process.env.DEVTO_KEY,
      },
      json: { article },
    })
    .json();
  options.drafts.push({
    id: response.id,
    title: response.title,
    slug: response.slug,
  });
  await updateOptions(response);
}
