import fs from 'node:fs/promises';
import fm from 'front-matter';
import { globby } from 'globby';
import mjml from 'mjml';
import childProcess from 'child_process';
import { program } from 'commander';

program
  .name('newsletter')
  .description('CLI to prepare newsletter')
  .option('-c, --copy', 'copies result to clipboard')
  .option('-o, --output <path>', 'set the output file')
  .option('-n, --silent', 'prevents output to console');

program.parse();

const { copy, output, silent } = program.opts();

const paths = await globby('./src/posts/en/*.md');

const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));

const files = await Promise.all(
  paths.map(async (path) => {
    const file = await fs.readFile(path, 'utf-8');
    return {
      ...fm(file),
      path,
    };
  }),
);

const articles = files
  .filter((file) => {
    return new Date(file.attributes.created).getTime() >= lastMonth.getTime();
  })
  .sort((a, b) => {
    return (
      new Date(b.attributes.created).getTime() -
      new Date(a.attributes.created).getTime()
    );
  })
  .map((file) => {
    return {
      title: file.attributes.title,
      description: file.attributes.description,
      slug: file.path.replace('./src/posts/en/', '').replace('.md', ''),
      created: file.attributes.created,
    };
  });

const template = {
  tagName: 'mjml',
  children: [
    {
      tagName: 'mj-head',
      children: [
        {
          tagName: 'mj-font',
          attributes: {
            href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap',
            name: 'Roboto Slab',
          },
        },
        {
          tagName: 'mj-attributes',
          children: [
            {
              tagName: 'mj-text',
              attributes: {
                color: 'inherit',
                'font-family': "'Overpass', sans-serif",
              },
            },
          ],
        },
        {
          tagName: 'mj-font',
          attributes: {
            href: 'https://fonts.googleapis.com/css2?family=Overpass&display=swap',
            name: 'Overpass',
          },
        },
        {
          tagName: 'mj-raw',
          content: '<meta name="color-scheme" content="light dark" />',
        },
        {
          tagName: 'mj-raw',
          content:
            '<meta name="supported-color-schemes" content="light dark" />',
        },
        {
          tagName: 'mj-style',
          content: `
            body {
              background-color: #efe1ef;
              color: #523e49
            }

            .text {
              color: #523e49;
            }

            .link {
              color: #33007e;
            }

            @media (prefers-color-scheme: dark) {
              body {
                background-color: #100910;
                color: #efe1ef;
              }

              .text {
                color: #efe1ef;
              }

              .link {
                color: #c299ff;
              }
            }`,
        },
      ],
    },
    {
      tagName: 'mj-body',
      children: [
        {
          tagName: 'mj-section',
          children: [
            {
              tagName: 'mj-column',
              attributes: {
                width: '100%',
              },
              children: [
                {
                  tagName: 'mj-image',
                  attributes: {
                    src: 'https://pablo.berganza.dev/assets/publicationlogo.png',
                    width: '350px',
                    title: 'Pablo Berganza',
                    alt: 'Pablo Berganza',
                    href: 'https://pablo.berganza.dev',
                    name: 'Pablo Berganza',
                  },
                },
              ],
            },
            {
              tagName: 'mj-column',
              attributes: { width: '100%' },
              children: [
                {
                  tagName: 'mj-text',
                  attributes: {
                    'css-class': 'text',
                  },
                  content: "Heya! Hope you're having a fantastic day!",
                },
                {
                  tagName: 'mj-text',
                  attributes: {
                    'css-class': 'text',
                  },
                  content:
                    "Here's the latest content of my blog! Hope you enjoy it",
                },
              ],
            },
            ...articles.map((article) => {
              return {
                tagName: 'mj-column',
                attributes: {
                  width: '100%',
                },
                children: [
                  {
                    tagName: 'mj-text',
                    content: `
                      <h2
                        style="color: #c60065; font-family: 'Roboto Slab', serif;"
                        >
                        ${article.title}
                      </h2>
                      <span class="text" style="font-weight: 700;">Published on:</span>
                      <span class="text">${article.created}</span>
                      <p class="text">${article.description}</p>
                      <a
                        class="link"
                        href="https://pablo.berganza.dev/blog/${article.slug}"
                        >
                        Read more
                      </a>`,
                  },
                ],
              };
            }),
          ],
        },
        {
          tagName: 'mj-section',
          children: [
            {
              tagName: 'mj-column',
              children: [
                {
                  tagName: 'mj-text',
                  content: `
Don't want to receive this anymore? <a class="link" href="$[LI:UNSUBSCRIBE]$">Unsubscribe</a>
`,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const parsed = mjml(template, {
  validationLevel: 'strict',
});

if (output) {
  await fs.writeFile(output, parsed.html);
} else if (!silent) {
  console.log(parsed.html);
}
function pbcopy(data) {
  var proc = childProcess.spawn('pbcopy');
  proc.stdin.write(data);
  proc.stdin.end();
}
if (copy) {
  pbcopy(parsed.html);
}
