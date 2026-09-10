# Prototype — the talk as a Starlight page

> **Throwaway.** Written to answer one question and then be deleted. Nothing here is held to
> production standard: no tests, minimal error handling, and the root toolchain
> (eslint, prettier, knip, tsc) is configured to ignore `prototype/**` on purpose.

## The question

**What should a page about the 2026-09-15 all-hands talk look like?** Specifically: which
visualisations carry the argument, and what shape should the table of contents take?

Three variants on the single `/` route, switchable via `?variant=A|B|C`. Content is identical
in all three — only layout, information hierarchy and the table of contents change.

| Variant | Name            | Primary affordance                     | Its table of contents         |
| ------- | --------------- | -------------------------------------- | ----------------------------- |
| **A**   | Script          | Read the talk top to bottom            | Sticky nested rail, left      |
| **B**   | Run of show     | Drive it on the day; know what to cut  | The timing table itself       |
| **C**   | Argument        | Trace every claim to its source        | A claim ledger, grouped by source document |

## Run it

From the repo root, one command:

```sh
npm run prototype          # installs, then serves http://localhost:4321
npm run prototype:build    # builds to prototype/starlight-presentation/dist for GitHub Pages
```

Cycle variants with the floating bar, the <kbd>←</kbd> / <kbd>→</kbd> keys, or the URL.

## What it turned up

1. **The governed file needs no copy.** `src/content.config.ts` points Starlight's docs
   collection straight at `docs/presentations/`. The OKF frontmatter already carries `title`
   and `description` — all Starlight requires — so the remaining OKF fields only need
   *declaring* so the schema stops rejecting them as unknown keys. Edit the real script,
   reload, see it. No sync step and nothing to drift. The route rendering it is linked from
   the banner as a control: what you get with zero design work.
   - Sharp edge: `<StarlightPage>` validates *its own* frontmatter against that same extended
     schema, so every extended field must be `.optional()` — including `type`. A required
     `type: 'presentation'` breaks every custom page in the project.
2. **Mermaid renders client-side, so `/dist` stays pure static.** No headless browser at build
   time, nothing for Pages to run. Diagrams render lazily per visible variant, and are thrown
   away and redrawn when Starlight flips `data-theme` (verified: all 8 redraw on flip).
3. **Two mermaid diagram types needed fighting.**
   - The §2.1 missing-arrow image — the script's single most important visual — stacked
     vertically *and reversed* on the first attempt, which destroys a comparison whose whole
     point is "the absence in the **right-hand** panel". Fixed by dropping the per-subgraph
     `direction` and adding an invisible `~~~` link to pin the ordering. Both panels carry
     equal node counts so the difference reads as a missing arrow, not a smaller box.
   - Mermaid's default cluster fill is a hard yellow that fights every Starlight palette;
     `clusterBkg: 'transparent'` in `themeVariables` fixes it in both themes.
4. **`timeline` ignores theme tokens.** It keeps its own purple/yellow section palette. Legible,
   but it will not match a brand palette without patching mermaid's CSS.
5. **Base-path links are the real GitHub Pages risk**, exactly as `docs/research/starlight-and-stack.md`
   predicted. Starlight's own links compose with `base` correctly; hand-written ones do not.
   The one hand-written link here goes through `import.meta.env.BASE_URL`. Note `new URL()` is
   no help — `BASE_URL` is a path, not an absolute URL.

## Deliberate deviations from the prototype skill

- **The switcher is not hidden in production builds.** The skill hides it so a stray merge cannot
  ship it to users. Here the built `/dist` *is* the review artifact — hiding the bar would make the
  hosted site useless — so it stays visible and the PROTOTYPE banner carries the warning instead.
- **Sub-shape B (a new route) rather than A (an existing page).** The skill prefers mounting variants
  inside a real page. This repo has no site at all yet, so there was no page to sit inside.

## Verdict

_Unanswered — for Han to fill in._

- Winning variant:
- Bits worth stealing from the others:
- Which diagrams earn a place in the deck (spec is #38):

Once answered: fold the winner into real code, record the answer on the implementation issue, and
leave this branch as the pointer. `main` keeps only the validated decision.

## Layout

```
astro.config.mjs              starlight config; base via PROTOTYPE_BASE
src/content.config.ts         docs collection -> ../../docs/presentations (the real file)
src/talk.ts                   talk metadata, failure modes, trim order, corrections
src/sections.ts               per-section theses, beats, evidence
src/diagrams.ts               13 mermaid sources
src/pages/index.astro         the one route; mounts all three variants
src/components/
  Mermaid.astro               client-side renderer, theme-aware, lazy per variant
  VariantSwitcher.astro       floating bar, ?variant=, arrow keys
  PrototypeBanner.astro       throwaway warning + links to source and control
  VariantAScript.astro        variant A, self-contained layout
  VariantBRunOfShow.astro     variant B, self-contained layout
  VariantCArgument.astro      variant C, self-contained layout
```

Each variant owns its full layout in a scoped `<style>` block. Only `Mermaid.astro` is shared,
because it is infrastructure rather than layout — a shared layout would defeat the point.
