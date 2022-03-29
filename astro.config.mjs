import svelte from '@astrojs/svelte';

/** @type {import('astro').AstroUserConfig} */
export default {
  // projectRoot: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
  // pages: './src/pages', // Path to Astro components, pages, and data
  // dist: './dist',       // When running `astro build`, path to final static output
  // public: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
  markdownOptions: {
    render: [
      '@astrojs/markdown-remark',
      {
        shikiConfig: {
          theme: 'dracula',
        },
      },
    ],
  },
  buildOptions: {
    site: 'https://pablo.berganza.dev/', // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
    sitemap: true, // Generate sitemap (set to "false" to disable)
  },
  devOptions: {
    hostname: '0.0.0.0',
    // hostname: 'localhost',  // The hostname to run the dev server on.
    // port: 3000,             // The port to run the dev server on.
    // tailwindConfig: '',     // Path to tailwind.config.js if used, e.g. './tailwind.config.js'
  },
  integrations: [svelte()],
};
