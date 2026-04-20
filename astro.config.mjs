// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { remarkYoutubeEmbed } from './src/plugins/remark-youtube-embed.mjs';
import { rehypeCodeLinks } from './src/plugins/rehype-code-links.mjs';
import rehypeExternalLinks from 'rehype-external-links';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: false,
    },
    remarkPlugins: [remarkYoutubeEmbed],
    rehypePlugins: [
      rehypeCodeLinks,
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },

  site: 'https://colinaw.com',
  integrations: [sitemap()],

  trailingSlash: 'never',
});
