# Starlight design latitude & SSG stack mechanics

> Research for issue #2. Investigated against primary sources (official Astro docs, Starlight docs, official GitHub repos). Every non-obvious claim is cited inline by a `[n]` marker resolved in **Sources**. Version numbers and recency are noted where known; uncertainty is flagged explicitly. Captured 2026-07-27.

## Recommendation

**Use Astro Starlight as the base, not plain Astro** — and treat the "docs-vs-design-forward" question as a false dichotomy, because Starlight lets you do both in one project. Starlight hands you the expensive parts for free (theming tokens, dark/light mode, accessible docs chrome, Pagefind search, and — critically for us — a complete built-in DE/EN i18n system with German UI strings already translated), while still allowing a fully design-forward, chrome-free landing/marketing experience via `template: splash` pages, custom `hero` config, component overrides, and standalone `src/pages/*.astro` routes that bypass the Starlight layout entirely [1][2][3][4][5]. This fits our "form follows function" preference: we get high-quality output fast without chasing bespoke visuals for their own sake. The one honest caveat: if the _entire_ site were meant to be a bespoke marketing site with no content/reference surface at all, plain Astro would be the cleaner call — but a markdown-driven coaching hub is exactly Starlight's sweet spot. **Islands: default to `.astro` components (zero JS) and reach for Preact only for the rare interactive widget** — the two obvious interactive needs (theme toggle, language switch) are already built into Starlight, so we may ship almost no island JS at all; when we do need one, Preact (3 kB, React-like API, and what Starlight itself uses internally) beats React and Svelte on bundle size and paradigm-fit [6][7]. **Tailwind: optional, lean "yes" but scoped** — Starlight's CSS-custom-property design tokens + `customCss` cover docs theming without it, but Tailwind v4 is officially supported (`@astrojs/starlight-tailwind`) and speeds up building the bespoke splash/marketing pages; add it only if the team wants utility-class velocity there, and keep the docs pages on tokens [8]. All of the committed toolchain (TypeScript, Vitest, ESLint, Prettier, Knip) has working Astro support, with a few sharp edges noted in the DX section [9][10][11][12].

---

## 1. Starlight theming & design surface

**Verdict: Starlight gives a lot of design latitude for a docs-shaped site, and an escape hatch to a fully custom look. It does well at "reskin the docs" and "add a landing page"; it fights you if you want to abolish the docs layout entirely on every page (that's when you drop to `src/pages/`).**

### Built-in theming via CSS custom properties (design tokens)

Starlight ships a dark/light theme controlled by CSS custom properties you override in a `:root` block. Token categories include gray shades (text/background), an accent color (links + current nav item), text sizing (e.g. `--sl-text-5xl`), and content width (`--sl-content-width`); the authoritative list lives in `props.css` in the Starlight repo [8]. You register your own CSS through the `customCss: string[]` option in the `starlight()` integration, e.g. `'./src/styles/custom.css'` [8]. Starlight organizes internal styles with **cascade layers**, so unlayered custom CSS overrides Starlight defaults predictably, and you can order your own `@layer` relative to the `starlight` layer [8]. There is an official interactive **color-theme editor** that generates accent/gray palettes (with a WCAG contrast-level control) and exports either CSS or Tailwind [8]. Last updated on that page: Aug 19, 2025 [8].

### Component overrides

When CSS/config isn't enough, Starlight lets you swap named UI components via the `components: Record<string, string>` map in the integration — each key is a Starlight component name, each value a path to your `.astro` replacement [2]. You can import the default component (`@astrojs/starlight/components/X.astro`) and render it inside your override to extend rather than replace, and you can read the current page's data through `Astro.locals.starlightRoute` to make overrides conditional (e.g. only on the homepage) [2]. **The full overridable set** (from the Overrides reference [3]):

- **Head:** `Head`, `ThemeProvider`
- **Accessibility:** `SkipLink`
- **Layout (structural):** `PageFrame`, `MobileMenuToggle`, `TwoColumnContent`
- **Header:** `Header`, `SiteTitle`, `Search`, `SocialIcons`, `ThemeSelect`, `LanguageSelect`
- **Global sidebar:** `Sidebar`, `MobileMenuFooter`
- **Page sidebar:** `PageSidebar`, `TableOfContents`, `MobileTableOfContents`
- **Content:** `Banner`, `ContentPanel`, `PageTitle`, `DraftContentNotice`, `FallbackContentNotice`, `Hero`, `MarkdownContent`
- **Footer:** `Footer`, `LastUpdated`, `EditLink`, `Pagination`

Caveats: `PageFrame` and `TwoColumnContent` are layout wrappers with **named slots** (e.g. `header`, `sidebar`, `right-sidebar`) that you must explicitly forward or they get dropped; the docs warn overriding these "comes [with] significant complexity" and recommend lower-level overrides instead [2][3].

### Custom splash / landing / marketing pages

Two mechanisms, and this is where Starlight earns the "design-forward" claim:

1. **`template: splash` frontmatter** on a page in `src/content/docs/` switches to a "wider layout without any sidebars designed for landing pages" — it removes the left sidebar (its `hasSidebar` default flips to `false`) and pairs with a `hero` block; set `tableOfContents: false` to also drop the right TOC, giving a full-width canvas [4][5]. The built-in `hero` (`HeroConfig`) supports `title`, `tagline`, `image` (single `file`+`alt`, a `dark`/`light` pair, or raw `html` for custom `<img>`/inline `<svg>`), and an `actions[]` array of CTA buttons with `text`, `link`, `icon`, and `variant` (`primary` | `secondary` | `minimal`) [4]. You can further replace the whole hero by overriding the `Hero` component [3].
2. **Standalone `src/pages/*.astro` routes** live outside the docs content collection and, by default, **do not use the Starlight layout at all** — this is the full-custom escape hatch for "a completely custom layout or generate a page from an alternative data source" [5]. If you want such a page to still wear Starlight's look, wrap it in `<StarlightPage>` (`@astrojs/starlight/components/StarlightPage.astro`), passing a `frontmatter` prop plus optional `sidebar`, `hasSidebar`, `headings`, etc. [5]. So you can freely mix: markdown docs in `src/content/docs/`, splash landing pages, and 100%-bespoke Astro pages in `src/pages/` [5].

### Reshaping the docs chrome (sidebar / TOC / top nav)

- **Left sidebar:** configured via the `sidebar: SidebarItem[]` option (manual `link`/`slug`/`items` groups or `autogenerate: { directory }`, with `collapsed` control) [1]; removable per-page with `template: splash` [4].
- **Right TOC:** global `tableOfContents` config (`{ minHeadingLevel, maxHeadingLevel }`, default h2–h3) or `false` to disable, overridable per-page in frontmatter [1][4].
- **Top nav:** honest limitation — **Starlight has no built-in top navigation-bar concept.** The header is only site title/logo + search + social icon links; there is no config key for a horizontal nav menu [1]. A custom top nav is done by **overriding the `Header`/`SiteTitle` components** or via a community plugin [1][3]. This is the main place Starlight "fights" a marketing-site look.
- **Search:** Pagefind is on by default; `pagefind: false` disables indexing and hides the search UI [1].
- **404:** `disable404Route: true` lets you supply `src/pages/404.astro` [1].

**Where Starlight fights a fully custom look:** anything that assumes a global top-nav marketing shell, or a site where _no_ page should look like docs. In those cases you either override `Header`/`PageFrame` (non-trivial) or move that surface into `src/pages/`. For a content-heavy coaching hub with a few marketing pages, this is comfortably within Starlight's grain.

---

## 2. Islands: framework choice for small interactive bits

**Verdict: default to `.astro` (zero JS); use Preact for the rare interactive island. React only if we need a specific React-only library; Svelte is viable but adds a second paradigm for no clear win here.**

- **`.astro` components are the zero-JS default:** they render to static HTML with no client runtime; to ship any JS you add a `<script>` yourself [6]. Framework components (React/Preact/Svelte/Vue/Solid) also render to static HTML by default and **only ship JS when you hydrate them** with a `client:*` directive [6]. Directives: `client:load` (hydrate immediately), `client:idle`, `client:visible` (hydrate when scrolled into view), `client:media={query}`, and `client:only={framework}` (skip SSR, client-render only) [6]. Shared framework runtime is bundled once per page [6].
- **How much island JS do we actually need?** Very little. Starlight's **theme toggle (`ThemeSelect`) and language switch (`LanguageSelect`) are built in** [3][1] — the two most obvious interactive needs are already solved with Starlight's own (Preact-based) components. Our custom islands would be limited to genuinely bespoke widgets (e.g. an interactive coaching self-assessment).
- **Preact vs React:** `@astrojs/preact` (v6.0.1 as fetched) provides "the same API as React, but in a much smaller 3kB package," installable via `astro add preact` [7]. Its `compat: true` mode can even render React components without shipping React's larger libraries [7]. Preact is also what Starlight uses internally, so it's the lowest-friction, smallest-bundle choice and aligns with the framework's own islands. React (`@astrojs/react`) is the right call only if a required library is React-only.
- **Svelte** (`@astrojs/svelte`) is a fully supported official integration [6] and produces small bundles, but it introduces a second component paradigm alongside Astro/Preact for no concrete benefit given our needs — skip unless the team already prefers Svelte.
- **DX with our toolchain:** framework-component logic and utility functions are plain TS and unit-test cleanly in Vitest; use `getViteConfig()` from `astro/config` in `vitest.config.ts` so tests inherit Astro's Vite settings [9]. `.astro` components themselves need the **Container API** (`experimental_AstroContainer` / `AstroContainer.create()` + `container.renderToString()`, added in `astro@4.9.0`) to render-and-assert — note it's still flagged experimental [9]. See the DX section for ESLint/Prettier/Knip specifics.

**Bundle-size ranking for our case:** `.astro` (0 KB) > Preact island (~3 KB + component) > React island. Prefer moving up that list wherever interactivity allows.

---

## 3. Tailwind: worth it on top of Starlight?

**Verdict: optional. Not required — Starlight's design tokens + scoped CSS fully cover docs theming. Add Tailwind v4 mainly to move fast on the bespoke splash/marketing pages, and keep it scoped so it doesn't churn the docs surface.**

- **Official support exists and is current:** the Starlight docs target **Tailwind CSS v4**, wired through the Tailwind Vite plugin (`@tailwindcss/vite`) plus the compatibility package **`@astrojs/starlight-tailwind`**, which makes `dark:` variants track Starlight's theme, maps theme colors/fonts into the UI, and restores parts of Preflight [8]. New projects can scaffold with `npm create astro@latest -- --template starlight/tailwind`; existing ones run `astro add tailwind`, install `@astrojs/starlight-tailwind`, and add `src/styles/global.css` as the **first** entry in `customCss` [8].
- **Brand theming via Tailwind** uses a `@theme` block overriding `--color-accent-*` (links/current item), `--color-gray-*` (backgrounds/borders), `--font-sans`, and `--font-mono` [8]. You can even run **multiple Tailwind configs** — e.g. full Preflight on custom pages while keeping Starlight's compat layer on docs pages — by importing a distinct config inside a layout component [8].
- **The "no Tailwind" path is equally legitimate:** Starlight's CSS-custom-property tokens + `customCss` + cascade layers already give brand colors, fonts, dark/light theming, and per-component overrides without a utility framework [8]. This keeps the CSS surface smaller and avoids utility-class churn.
- **Tradeoffs to weigh:** Tailwind adds a dependency and lint/Knip surface, and utility classes in `.astro`/markup can complicate "unused CSS" reasoning. Against that, it's the fastest way to build the non-docs marketing/landing layouts where Starlight's tokens give you less scaffolding. Given "form follows function" + the desire for fast, high-quality bespoke landing pages, a **scoped Tailwind v4 setup for `src/pages/` and splash pages, tokens-only for docs**, is a reasonable middle path. If the team is CSS-comfortable, tokens-only for the whole site is fine too.

---

## 4. i18n: DE/EN routing, default locale, language switching

**Verdict: Starlight's built-in i18n covers our DE/EN needs out of the box, including a language picker and pre-translated German UI. No extra i18n library needed.**

- **Config:** set `locales` and `defaultLocale` in the `starlight()` integration. Each locale entry takes `label` (name shown in the picker), `lang` (BCP-47 tag), and optional `dir` (text direction) [10]. `defaultLocale` is used as the fallback for content and UI labels, so it should be our best-covered language [10].
- **Path-based routing `/de/` `/en/`:** by default every configured language gets a URL prefix — English at `/en/about`, German at `/de/about` — with content in matching per-language folders [10]. Alternatively a **root locale** (the `root` key, `defaultLocale: 'root'`) serves one language with **no prefix** (`/about` instead of `/en/about`); root-locale content lives directly in `src/content/docs/` and `lang` is required [10]. So we choose: symmetric `/en/` + `/de/` prefixes, or make one language prefix-free as root.
- **Content structure:** translations mirror filenames across per-language directories, e.g. `src/content/docs/en/index.md` and `src/content/docs/de/index.md`; using the same filename links the pages and unlocks the full i18n feature set [10].
- **Language picker:** automatically enabled when multiple locales are configured (the `LanguageSelect` header component) [10][3].
- **Fallback content:** if a translation is missing, Starlight serves the `defaultLocale` version plus a notice — so we can ship content in one language and translate progressively [10].
- **UI-string translation:** Starlight's own interface labels (e.g. "On this page") are translatable via the `i18n` content collection (`i18nLoader()` + `i18nSchema()` in `src/content.config.ts`, per-locale JSON in `src/content/i18n/`), with runtime access via `Astro.locals.t()` [10]. **German is a built-in supported UI language** ("Deutsch") — its UI strings ship translated out of the box, so we only add JSON to override defaults or add custom keys [10].

---

## 5. GitHub Pages base-path (`hancrafted.github.io/ai-coaching-hub/`)

**Verdict: straightforward with `site` + `base`, deployed via the official `withastro/action`. The main gotchas are (a) prefixing internal links/assets with the base, and (b) making sure i18n prefixes compose on top of the base.**

- **Config for a project page** at `username.github.io/repo-name/` [11]:
  ```js
  // astro.config.mjs
  export default defineConfig({
    site: 'https://hancrafted.github.io',
    base: '/ai-coaching-hub',
  });
  ```
  `site` must be the `https://<username>.github.io` URL; `base` must be the repo name so Astro treats `/ai-coaching-hub` as the site root rather than `/` [11]. (`base` can be omitted only for a `<username>.github.io` _user_ page, which is not our case.)
- **How `base` affects links/assets:** internal links must include the base prefix, e.g. `<a href="/ai-coaching-hub/about">`, and the idiomatic dynamic approach is to build paths from `import.meta.env.BASE_URL` so the prefix stays consistent (the page shows the literal-prefix form; `BASE_URL` is the standard Astro helper) [11]. If we later move to a custom domain we remove `base` and strip the prefixes again [11].
- **Interaction with i18n routing:** the base and the locale prefix stack — a German about page becomes `/ai-coaching-hub/de/about`. Starlight generates its own nav/links base-aware, so its internal links and the language picker compose correctly; the risk area is **hand-written links and asset `src`s in our custom `src/pages/`** — those must include the base (prefer `import.meta.env.BASE_URL`) or they break under the subpath. _(This "stacking" is the logical consequence of [10] path prefixes + [11] base; flagging it as inferred rather than a single quoted sentence.)_
- **Official deploy path — `withastro/action`:** Astro's recommended GitHub Pages deploy uses the official action, which auto-detects the package manager from the committed **lockfile** (so commit `package-lock.json`) [11]. Sample workflow (`.github/workflows/deploy.yml`) triggers on `push` to `main` (+ `workflow_dispatch`), grants `permissions: contents: read / pages: write / id-token: write`, and runs `actions/checkout@v7` → `withastro/action@v6` → `actions/deploy-pages@v5`; optional `with:` inputs include `path`, `node-version` (default 24), `package-manager`, and `build-cmd` [11]. Note our repo policy forbids committing to `main` for _this ticket's research work_, but the deploy workflow itself is expected to trigger on the repo's default branch once the site exists — that's a project decision, not part of this branch.
- **Gotchas checklist** [11]: match `base` exactly to the repo name; prefix internal links/assets with the base (or use `BASE_URL`); commit the lockfile; rename the workflow branch trigger if the default branch isn't `main`; `base` is written without a trailing slash. Trailing-slash behaviour (`trailingSlash`) wasn't covered on the deploy page — flagging as **not verified here**; worth confirming against the Astro config reference before launch since it affects link-prefix correctness.

---

## Stack-mechanics / toolchain DX (TS · Vitest · ESLint · Prettier · Knip)

The committed toolchain is a hard constraint; here's how each piece meets Astro/Starlight, with sharp edges flagged.

- **TypeScript:** first-class in Astro (`.astro` frontmatter is TS; strict tsconfig presets ship with `astro`). No friction.
- **Vitest:** recommended by Astro; use `getViteConfig()` from `astro/config` so tests share the project's Vite config; a second arg (Astro 4.8+) can override per-test settings [9]. Framework/util logic tests are normal; `.astro` component rendering needs the **experimental** Container API (`experimental_AstroContainer`, `renderToString`, since `astro@4.9.0`) — usable but treat as experimental [9].
- **ESLint:** the community-maintained **`eslint-plugin-astro`** (uses `astro-eslint-parser`) is the recommended solution, referenced from Astro's official editor-setup docs; flat-config via `...eslintPluginAstro.configs.recommended`; ESM-only; needs `@typescript-eslint/parser` for TS-in-Astro and `eslint-plugin-jsx-a11y` for the a11y rules; **must include the `.astro` glob** on the CLI since ESLint targets `.js` by default [12]. Caveat: the plugin follows SemVer but _not_ ESLint's SemVer policy, so minor releases can change shared configs/rule behavior — pin deliberately.
- **Prettier:** the **official** `prettier-plugin-astro` (withastro) formats `.astro`; wire via `overrides: [{ files: '*.astro', options: { parser: 'astro' } }]` [12].
- **Knip:** has a built-in **Astro plugin** (auto-enabled when `astro` is a dependency) that registers Astro's config/entry/production patterns, including `src/pages/**/*.{astro,mdx,js,ts}` [13]. Sharp edge: **exports inside non-standard extensions (`.astro`, `.mdx`, `.svelte`) aren't analyzed by default** — you enable Knip's compilers and/or list `.astro` in `entry`/`project` explicitly to avoid false "unused" reports [13]. Plan to add a small `knip` config for `.astro`.
- **Husky / Archgate:** orthogonal to the SSG choice (git hooks + governance), no Astro-specific interaction — not investigated further here.

### Version / recency notes (flag: some from search summaries, not a fetched page)

- **Astro** latest reported **7.0.9 (13 Jul 2026)**; **Starlight** latest reported **0.41.4** (published ~late Jun 2026), and per the same search the 0.41.x line requires **Astro 7** (0.38–0.40.x need Astro 6+). _Treat these exact numbers as approximate — they came from a WebSearch summary, not a directly fetched release page; verify `@astrojs/starlight` + `astro` peer ranges with `npm view` before pinning._ [14]
- Starlight is still **pre-1.0 (0.x)**, so minor bumps can carry breaking changes — pin versions and read release notes on upgrade.
- `@astrojs/preact` fetched at **v6.0.1** [7]. Starlight CSS/Tailwind page last updated **Aug 19, 2025** [8]; Overrides page **Feb 15, 2025** [3].

---

## Sources

1. Starlight — Configuration reference: <https://starlight.astro.build/reference/configuration/>
2. Starlight — Overriding Components (guide): <https://starlight.astro.build/guides/overriding-components/>
3. Starlight — Overrides reference (full component list): <https://starlight.astro.build/reference/overrides/>
4. Starlight — Frontmatter reference (`template`, `hero`, `tableOfContents`, etc.): <https://starlight.astro.build/reference/frontmatter/>
5. Starlight — Pages guide (splash template, `src/pages/`, `<StarlightPage>`): <https://starlight.astro.build/guides/pages/>
6. Astro — Framework components / islands & client directives: <https://docs.astro.build/en/guides/framework-components/>
7. Astro — Preact integration (`@astrojs/preact`): <https://docs.astro.build/en/guides/integrations-guide/preact/>
8. Starlight — CSS & Tailwind (design tokens, `customCss`, Tailwind v4): <https://starlight.astro.build/guides/css-and-tailwind/>
9. Astro — Testing (Vitest, `getViteConfig`, Container API): <https://docs.astro.build/en/guides/testing/>
10. Starlight — Internationalization (i18n) guide: <https://starlight.astro.build/guides/i18n/>
11. Astro — Deploy to GitHub Pages (`site`/`base`, `withastro/action`): <https://docs.astro.build/en/guides/deploy/github/>
12. Astro — Editor setup (ESLint / Prettier) + `eslint-plugin-astro` User Guide + `prettier-plugin-astro`: <https://docs.astro.build/en/editor-setup/> · <https://ota-meshi.github.io/eslint-plugin-astro/user-guide/> · <https://github.com/withastro/prettier-plugin-astro>
13. Knip — Astro plugin & compilers: <https://knip.dev/reference/plugins/astro> · <https://knip.dev/features/compilers>
14. Version/recency (WebSearch summary, verify before pinning): npm `@astrojs/starlight` <https://www.npmjs.com/package/@astrojs/starlight> · npm `astro` <https://www.npmjs.com/package/astro> · Starlight releases <https://github.com/withastro/starlight/releases>
