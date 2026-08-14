import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.pierceobrienpiano.com',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: {
    enabled: false,
  },
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/design-reference/'),
      namespaces: {
        news: false,
        video: false,
        xhtml: false,
      },
    }),
  ],
});
