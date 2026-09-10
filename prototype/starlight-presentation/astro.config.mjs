// THROWAWAY PROTOTYPE — three variants of one talk page, switchable via `?variant=`
// on the single `/` route. See ./README.md for the question this answers.
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// GitHub Pages project sites live under /<repo>. Default to root so `npm run dev`
// serves a plain `/`; `npm run build:pages` sets the sub-path for the real deploy.
const base = process.env.PROTOTYPE_BASE ?? '/';

export default defineConfig({
  site: 'https://hancrafted.github.io',
  base,
  outDir: './dist',
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      title: 'Talk page prototype',
      description:
        'Throwaway prototype: three ways to render the 2026-09-15 all-hands talk as a page.',
      // Pagefind indexes the built output; harmless here and proves search works.
      pagefind: true,
      customCss: ['./src/styles/prototype.css'],
      sidebar: [
        { label: 'Prototype — 3 variants', link: '/' },
        {
          label: 'Control: the governed source, rendered as-is',
          items: [{ autogenerate: { directory: '.' } }],
        },
      ],
      credits: false,
    }),
  ],
  vite: {
    server: {
      // The docs collection loads the real presentation file from outside this
      // project root, so dev needs explicit permission to read the repo.
      fs: { allow: ['../..'] },
    },
  },
});
