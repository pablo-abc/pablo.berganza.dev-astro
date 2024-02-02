import fs from 'node:fs/promises';
import fm from 'front-matter';

export async function getSaved(platform) {
  try {
    const content = await fs.readFile('./bin/.crosspost.saved.json', 'utf-8');
    const saved = JSON.parse(content);
    if (!saved[platform]) saved[platform] = {};
    if (!saved[platform].published) saved[platform].published = [];
    return saved;
  } catch {
    const defaultSaved = {
      [platform]: {
        published: [],
      },
    };
    await fs.writeFile(
      './bin/.crosspost.saved.json',
      JSON.stringify(defaultSaved, null, 2),
    );
    return defaultSaved;
  }
}

export async function writeSaved(saved) {
  return fs.writeFile(
    './bin/.crosspost.saved.json',
    JSON.stringify(saved, null, 2),
  );
}

export async function updateSaved(article, platform) {
  const saved = await getSaved(platform);
  if (!saved[platform].published.find((p) => p.id === article.id)) {
    saved[platform].published.push({
      id: article.id,
      title: article.title,
      slug: article.slug,
    });
  }
  return writeSaved(saved);
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
        slug,
      };
    });
}
