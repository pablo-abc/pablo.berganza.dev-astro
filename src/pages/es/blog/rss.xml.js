import rss from '@astrojs/rss';

const postsImport = import.meta.glob('../../../posts/es/*.md', { eager: true });
const posts = Object.values(postsImport);

export const get = () =>
  rss({
    title: 'Blog | Pablo Berganza',
    stylesheet: '/rss.xsl',
    description: 'Articulos sobre desarrollo web entre otras cosas',
    customData: '<language>es-sv</language>',
    site: import.meta.env.SITE,
    items: posts
      .filter((post) => {
        if (import.meta.env.PROD) {
          return post.frontmatter.published;
        }
        return true;
      })
      .sort((a, b) => {
        return (
          new Date(b.frontmatter.created).getTime() -
          new Date(a.frontmatter.created).getTime()
        );
      })
      .map((item) => ({
        title: item.frontmatter.title,
        description: item.frontmatter.description,
        link: item.file.replace('/src/posts/es', '/es/blog').replace('.md', ''),
        pubDate: item.frontmatter.created,
      })),
  });
