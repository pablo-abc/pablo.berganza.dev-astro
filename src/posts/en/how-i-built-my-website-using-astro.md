---
title: "How I built my website using Astro"
description: Sort of a tutorial on how I built the current iteration of my website
published: false
created: '2022-03-04'
imgext: png
image:
  width: 800
  height: 420
tags:
  - javascript
  - astro
  - tutorial
  - webdev
---

My [personal website](https://pablo.berganza.dev) has undergone a few rewrites and redesigns. First written using [Clojure](https://clojure.org), then rewritten using [Svelte](https://svelte.dev) and now using [Astro](https://astro.build).

## What is Astro
Astro is a static site builder that outputs only plain HTML and CSS by default and, if necessary, sprinkles of JavaScript. Astro embraces component driven development by allowing you to split your app in [components](https://docs.astro.build/en/core-concepts/astro-components/). Astro’s components (`.astro` extension) output plain HTML, but they do let you use JavaScript at build time to generate your final site. The most special characteristic about Astro is that it lets you use components from other frameworks to build your site as well. You can use components from React, Svelte, Solid, Vue, etc. from within an Astro component and they will output plain HTML by default as well!

## Why Astro
A website like a personal site or a blog does not really need a full front-end framework to work. Since the purpose of a site like this is mostly to display information, it feels like a waste of resources to make it an SPA. But the developer experience from frameworks might be desirable. With Astro you can[keep the developer experience from your favourite framework while still only sending HTML to your user](https://docs.astro.build/en/core-concepts/component-hydration/)! In the case of my personal site I only needed JavaScript for a few specific features: a “copy to clipboard” button on my articles’ code snippets, a comment section on each article, and a little widget that shows the logos of technologies I have experience in. This is why Astro felt like a perfect choice for it!

Besides this, Astro gave me some other niceties:

* Support to write the content of my site/articles in markdown.
* Support to create an RSS feed of my articles.
* Easy to transition to since, for the most part, I could reuse some of the components I used on my previous Svelte site.

## Scope of this article
I will focus mostly on some details related to features of my website. Styling and layouts will not be mentioned at all since that would depend highly on yourself and your requisites. And only some basic information regarding how to use Astro itself will be included. Check [Astro’s documentation](https://docs.astro.build/en/getting-started/) to get familiar with it. In order to understand this article, you should at least be familiar with [Astro’s component syntax](https://docs.astro.build/en/core-concepts/astro-components/). You may see this article more as an overview on how my site works rather than a full in-depth tutorial.

## Structure of the project
There's not that many pages on my site, so the structure is quite small:

```
src/pages
├── 404.astro
├── blog
│   ├── [slug].astro
│   ├── index.astro
│   └── tags
│       └── [tag].astro
├── es
│   ├── blog
│   │   ├── [slug].astro
│   │   ├── index.astro
│   │   └── tags
│   │       └── [tag].astro
│   └── index.astro
└── index.astro
```

There’s basically four kinds of pages pages: The home page: `index.astro`, a page with a list of all my articles: `blog/index.astro`, a page for a specific article: `blog/[slug].astro` and a page for articles filtered by a tag: `blog/tags/[tag].astro`.

This whole structure is duplicated inside of the `es` directory since my site is also in Spanish.

I keep my articles as markdown files on `src/posts`:

```
src/posts
├── en
│   ├── announcing-felte-v1.md
│   ├── creating-a-chai-like-assertion-library-using-proxies.md
│   ├── felte-an-extensible-form-library-react.md
│   ├── felte-an-extensible-form-library-solid.md
│   ├── felte-an-extensible-form-library-svelte.md
│   ├── graphql-is-it-worth-the-switch.md
│   ├── how-i-built-my-website-using-astro.md
│   ├── start-of-a-new-digital-journey.md
│   ├── svelte-my-new-obsession.md
│   └── you-dont-need-apollo.md
└── es
    ├── announcing-felte-v1.md
    ├── creating-a-chai-like-assertion-library-using-proxies.md
    ├── felte-an-extensible-form-library-react.md
    ├── felte-an-extensible-form-library-solid.md
    ├── felte-an-extensible-form-library-svelte.md
    ├── graphql-is-it-worth-the-switch.md
    ├── start-of-a-new-digital-journey.md
    ├── svelte-my-new-obsession.md
    └── you-dont-need-apollo.md
```

Two layout components in `src/layouts`:

```
src/layouts
├── Base.astro
├── PostLayout.astro
└── copy-button.js
```

> `copy-button.js` is the script I use to add a `Copy to clipboard` button on code snippets.

I also keep some reusable components on the `src/components` folder.

## Article list page
Since my site is in both English and Spanish, most of the contents of the files within the `pages` are reusable components. This means that the markup for files within `src/pages` is really small. The file that generates the list of articles (`src/pages/blog/index.astro`) contains the following markup:

```html
<Base title="Blog" lang="en" section="blog">
  <Blogs lang="en" posts={posts} showRss />
</Base>
```

It’s just two components. A `Base` layout component that contains the `<html>` tag, SEO related tags, styling, etc. And a `Blogs` component that renders the lists of articles.  Each of them receiving certain props:

The `Base` component receives the following:
* `title` is used to create the pages `<title>`. Within the `Base` component this will get turned into `Blog | Pablo Berganza`.
* `lang` is used to communicate what language the page is currently on. Since this is called within the English part of my site, it’s hardcoded as `en`. This is used to create the `<html lang>` attribute, the link to the Spanish version, and to change communicate which language to use for certain attributes such as the page’s description.
* `section` is used to communicate on which section of the page we are. Used to build links among other things.

The `Blogs` component receives the following:
* `lang` serves the same purpose as for `Base`.
* `posts` is an array containing the articles to show in the page.
* `showRss` is a boolean to tell if the current page should show a link to my RSS feed. Since I share this component also for the `tags` page, and I don’t want to show said link in that page since I felt it’d give the false impression that you can subscribe to a specific tag.

The `posts` array is obtained by using `Astro.fetchContent` to get the markdown files for my articles. Within the `blog/index.astro` file, this looks more or less like this (in the file’s front matter):

```javascript
// Inside of the component's front matter
const posts = Astro
      // We fetch the markdown files for
      // my articles in English
      .fetchContent('../../posts/en/*.md')
      // If we are in production mode, we filter
      // posts that are not yet published
      .filter((post) => {
        if (import.meta.env.PROD) {
          return post.published;
        }
        return true;
      })
      // We add the URL for each article based on the
      // file's path.
      .map((post) => {
        let slug = post
          .file
          .pathname
          .replace(/\/src\/posts\/en\//, '')
          .replace(/\.md$/, '');
        // For local development, we modify the URL for
        // drafts.
        if (!post.published) slug = `__draft__${slug}`;
        const url = `/blog/${slug}`
        return {
          ...post,
          url,
        };
      })
      // We sort the articles based on publication date
      .sort((a, b) => {
        return (
          new Date(b.created).getTime() -
            new Date(a.created).getTime()
        )
      });
```

We are chaining a few methods here. First we use `fetchContent` to get all the markdown articles that are in English (in my project I keep them on `src/posts/en`). [Astro.fetchContent](https://docs.astro.build/en/reference/api-reference/#astrofetchcontent) is a utility provided by Astro that, currently, only serves to import markdown files.

Next we use `filter` to filter articles that have not yet been published in production mode. I only filter these articles in this page since I still want the blog to be available via direct URL as a draft.

Next we use `map` to add a `url` property to each post derived from the file’s path. This is used to add the link to each article’s page on each item. Note that I modify the URL when the article is a draft. This is only useful for local dev since the article won’t appear on the article list when deployed.

Finally we sort the articles based on the property `created`, which contains the publication date I set on the file’s front matter.

## Article page
The pages for each article are created from the file `pages/blog/[slug].astro`. The `[slug]` section indicates that this file will handle a [dynamic route](https://docs.astro.build/en/core-concepts/routing/#dynamic-routes), which may refer to multiple pages. The markup for this component is as follows:

```html
<Post post={post} />
```

`Post` is similar to our `Base` component previously mentioned. It also sets an `<html>` tag, sets meta tags, styling, etc. The layout was different enough to warrant a different layout in this case.

Unlike the `Base` component, this one only receives a `post` prop which contains the post’s parsed content from `Astro.fetchContent`. The language of the page and its content are included in that same prop.

The value for `post` comes from `getStaticPaths`, which is a function exported from the component itself that is used by Astro to handle dynamic routes. For my site this looks more or less like this:

```javascript
// Inside of the component's front matter
export async function getStaticPaths() {
  const posts = Astro
        .fetchContent('../../posts/en/*.md')
        .map((post) => {
          // We generate slugs for each article based
          // on the file's path
          let slug = post
            .file
            .pathname
            .replace('/src/posts/en/', '')
            .replace('.md', '');
          // We modify the article's slug for drafts
          if (!post.published) slug = `__draft__${slug}`;
          return {
            ...post,
            lang: 'en',
            slug,
          };
        });

  // We get an array of all the possible slugs
  const slugs = posts.map((post) => post.slug);

  // This is the return value expected from `getStaticPaths`
  // It's an object representing each page that's going
  // to be generated.
  return slugs.map(slug => {
    return {
      params: { slug },
      props: {
        // Each page will receive a single article as a prop.
        post: posts.find(post => post.slug === slug)
      },
    }
  });
}

// We get the `post` prop from `Astro.props`
// This is the value that will be passed to the `Post`
// component.
const { post } = Astro.props;
```

The front matter will export a `getStaticPaths` function. Inside of this function I’m fetching the markdown file’s from my articles. I’m then adding a `slug` property to each file which is derived from the file’s path. This slug will refer to the path parameter in `[slug].astro`. Note that I’m not filtering the articles on this page since I want to be able to share them as drafts.

> Out of the scope of this article: If the file is a draft I add a `<meta name=“robots” content=“noindex”>` tag to the page’s head so it does not get indexed by search engines. The slug is modified to prepend `__draft__` to prevent search engines from caching the `noindex` when the article is actually published.

Astro expects that the `getStaticPaths` function returns an array of objects. Each object represents each page that should be generated. In my case each object contains the following properties:

* `params` is an object that contains the path parameters for each page. For example: if we had a slug `example-article` in this file `src/pages/blog/[slug].astro`, and we assign that to the `slug` property of `params`, this would tell Astro to generate a file for this page in `/blog/example-article/index.html`.
* `props` is an object that contains the props each component will receive from `Astro.props`. In this case it only contains a single prop `post` which will have a single article with a matching slug from the path parameter.

## Adding an RSS feed
Astro has a really handy utility to [create RSS feeds from your dynamic routes](https://docs.astro.build/en/guides/rss/). This is only available on dynamic routes currently, which is why I used a `[slug].astro` file to create my articles instead of using [markdown pages](https://docs.astro.build/en/guides/markdown-content/#markdown-pages). In order to add an RSS feed to the site, we’d need to modify the `getStaticPaths` function exported from `[slug].astro`. This looks like this in my site:

```javascript
// Inside of the component's front matter
// `getStaticPaths` receives an object with a function `rss`
export async function getStaticPaths({ rss }) {
  const posts = Astro
        .fetchContent('../../posts/en/*.md')
        .map((post) => {
          const slug = post
                .file
                .pathname
                .replace('/src/posts/en/', '')
                .replace('.md', '');
          return {
            ...post,
            lang: 'en',
            slug,
          };
        });

  const slugs = posts.map((post) => post.slug);

  // We call the `rss` function with the information of our
  // feed.
  rss({
    title: 'Blog | Pablo Berganza',
    stylesheet: true,
    description: 'Articles about web dev among other things',
    customData: '<language>en-us</language>',
    // We filter, sort by published date and map the
    // articles to be in the shape Astro expects.
    items: posts
      .filter((post) => {
        if (import.meta.env.PROD) {
          return post.published;
        }
        return true;
      })
      .sort((a, b) => {
        return (
          new Date(b.created).getTime() -
            new Date(a.created).getTime()
        )
      })
      .map(item => ({
        title: item.title,
        description: item.description,
        link: item
          .file
          .pathname
          .replace('/src/posts/en', '/blog')
          .replace('.md', ''),
        pubDate: item.created,
      })),
    dest: '/blog/rss.xml',
  });

  return slugs.map(slug => {
    return {
      params: { slug },
      props: {
        post: posts.find(post => post.slug === slug)
      },
    }
  });
}

const { post } = Astro.props;
```

The only difference from this and the previous version of `getStaticPaths` is that we’re accepting an object as a parameter that contains an `rss` function, and then we’re calling it with some options. The rest is the same.

## Table of contents component
The table of contents, a recent addition to my site, is made without any JavaScript.  I’m using a `<details>` element so the table of contents is hidden unless the user wants to see it. The markup for it looks like this:

```jsx
<details>
  <summary>
    <!-- An SVG icon obtained from heroicons -->
    <ChevronRight />
    {lang === 'en' ? 'Table of contents' : 'Índice'}
  </summary>
  <ol id="toc">
    {headers.map((header) => {
      return (
        <li>
          <a href={`#${header.slug}`}>{header.text}</a>
          {header.subheaders.length !== 0 && (
            <ul>
              {header.subheaders.map((sh) => (
                <li>
                  <a href={`#${sh.slug}`}>{sh.text}</a>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    })}
  </ol>
</details>
```

The `headers` come from Astro’s `fetchContent` result. I manually nested sub levels (only `<h2>` and `<h3>` elements get added to the table of contents).

```javascript
// Inside of the component's front matter
const { headers: astroHeaders, lang = 'en' } = Astro.props;
let headers = [];
for (const header of astroHeaders) {
  if (header.depth === 2) {
    headers.push({
      ...header,
      subheaders: [],
    });
    continue;
  }
  if (header.depth === 3) {
    const lastHeader = headers[headers.length - 1];
    lastHeader.subheaders.push(header);
  }
}
```

## Copy to clipboard button on code snippets
As mentioned earlier, I’m adding a `copy to clipboard` button using JavaScript to my code snippets. This is a vanilla JS script that looks for each `<pre>` block, puts it in a container and adds a `<button>` to it with a handler that copies the `<pre>` element’s text content to the clipboard. While there are some third party packages/plugins to accomplish this, I could not make them work as I wanted. You may have better luck than me, though!

 This script gets added using a `<script>` tag in the component right after the article’s content. This prevent’s the layout from jumping (since the script modifies the layout itself). A simplified version of it is as follows:

```javascript
const codeBlocks = document.querySelectorAll('pre');
// SVG markup omitted for brevity.
const copySvg = `...`;
const copiedSvg = `...`;
const failedSvg = `...`;
// Adding some styles for the button
const style = document.createElement('style');
style.type = 'text/css';
style.textContent = `...`;
document.head.appendChiled(style);
let id = 0;
for (const block of codeBlocks) {
  const textContent = block.textContent;
  const parent = block.parentNode;
  const container = document.createElement('div');
  // Moving the code block to the container div
  parent.insertBefore(container, block);
  // Making the code block focusable so it can be scrolled
  // by keyboard users
  block.tabIndex = 0;

  // Creating the button and its children
  const copyButton = document.createElement('button');
  container.appendChild(copyButton);
  const svgContainer = document.createElement('div');
  copyButton.appendChild(svgContainer);
  const tooltip = document.createElement('div');
  copyButton.appendChild(tooltip);

  tooltip.id = `tooltip-copy-${id}`;
  tooltip.setAttribute('aria-hidden', true);

  // Setting initial attributes and styles for tooltip
  tooltip.style.visibility = 'hidden';
  tooltip.style.position = 'fixed';
  tooltip.textContent = 'Copy to clipboard';
  svgContainer.innerHTML = copySvg;

  // Setting aria-labelledby so the label is available to
  // screen readers even when the tooltip is hidden
  copyButton.setAttribute('aria-labelledby', tooltip.id);

  // Adding click handler to button
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(textContent).then(() => {
        // Handling copied successfully
        svgContainer.innerHTML = copiedSvg;
        tooltip.textContent = 'Copied!';
        setTimeout(() => {
          svgContainer.innerHTML = copySvg;
          tooltip.textContent = 'Copy to clipboard';
        }, 500);
      });
    } catch {
      // Handling failure
      svgContainer.innerHTML = failedSvg;
      tooltip.textContent ='Failed to copy';
      setTimeout(() => {
        svgContainer.innerHTML = copySvg;
        tooltip.textContent = 'Copy to clipboard';
      }, 500);
    }
  });

  // Function to handle position of tooltip
  function repositionTooltip() {
    const tooltipRect = tooltip.getBoundingClientRect();
    const buttonRect = copyButton.getBoundingClientRect();
    tooltip.style.left = `${buttonRect.left - tooltipRect.width - 8}px`;
    tooltip.style.top = `${buttonRect.top + buttonRect.height / 2}px`;
    tooltip.style.transform = 'translateY(-50%)';
  }

  // Setting the position before the tooltip is shown
  // to prevent jumps in layout.
  repositionTooltip();

  let interval = null;
  function showTooltip() {
    tooltip.style.visibility = 'visible';
    if (interval) clearInterval(interval);
    repositionTooltip();
    interval = setInterval(repositionTooltip, 10);
  }

  copyButton.addEventListener('mouseenter', showTooltip);
  copyButton.addEventListener('focusin', () => {
    // Only showing the tooltip when the user focuses the button
    // with the keyboard. This is possible since I'm using
    // the `focus-visible` polyfill.
    if (!copyButton.classList.contains('focus-visible')) return;
    showTooltip();
  });
  copyButton.addEventListener('focusout', hideTooltip);
  copyButton.addEventListener('mouseleave', hideTooltip);

  // Finally increasing the id counter
  id += 1;
}
```

There’s some extra code in the script to handle internationalisation and some touch screen interaction, but this is the gist of it.

## Internationalisation
I mentioned previously that my site is in both Spanish and English. I figured this might be a point of interest . As of now, there’s no official way to handle internationalisation of an Astro project. I’m not going to expand much on my way of handling this since right now it’s sort of a mess. Basically I’m doing the following to add internationalisation for my site:

* Articles are on separate markdown files. English files are in `src/posts/en` and Spanish files are in `src/posts/es`. As you might have seen previously, the route used with `Astro.fetchContent` pointed to either of this depending on if the page was in English or Spanish.
* UI widgets from the article list, article and tags page are only using ternary operators to display different content depending on the page’s language.
* The home page uses a JSON file which has `en` and `es` properties, since most of the content does not come from markdown files, this was way cleaner than having the translated content in two separate files (`index.astro` and `es/index.astro`).
* In scripts (such as `copy-button.js`) I get the language of the page using `const lang = document.documentElement.lang;`.

## Conclusion
Out of the three versions of my personal website, using Astro has been the most enjoyable experience. Keeping the developer experience of component driven development and being able to reuse some of the components from my previous site have been some of the main benefits. Besides the site is now lighter than my previous version since it only contains sprinkles of JavaScript where necessary. I’m really excited to see where Astro goes next. A big plus is that it’s also one of the most welcoming communities I’ve been in. I encourage you to consider it for your next static site!
