// THROWAWAY PROTOTYPE 2 — one hub + two learning modules, rendered twice: once
// on Starlight (`/`, `/talk`, `/token-101`) and once on plain Astro (`/bare/*`),
// sharing one kit. Answers "do we stick with Astro + Starlight?".
// See ./README.md and the /findings route.
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
      // Order matters: tokens.css declares the kit contract with literal
      // values, then tokens-starlight.css re-points it at --sl-*. Both are
      // unlayered, so source order is what makes the adapter win. Asserted
      // in the build check, not assumed.
      customCss: [
        './src/kit/tokens.css',
        './src/kit/tokens-starlight.css',
        './src/styles/chrome.css',
        './src/styles/starlight-only.css',
      ],
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
