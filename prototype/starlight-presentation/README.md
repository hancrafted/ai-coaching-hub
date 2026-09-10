# THROWAWAY PROTOTYPE — prototype 2: hub + two modules, on two stacks

> **This is not production code.** It lives on a `prototype/**` branch, is never merged to
> `main`, and exists only to answer a question. The answer belongs on issue **#1**.

## The question

Han, verbatim:

> "I'm really right now trying to find out if I want to stick with astro and starlight."

**Deliberate deviation from the `/prototype` skill.** Neither of its branches fits. The LOGIC
branch wants a state machine; the UI branch wants several looks on one route. Han said
look-and-feel is explicitly *not* the focus. So the variant axis is repointed from **visual
variants** to **stack variants**: the same content rendered twice, once on Starlight and once on
plain Astro, sharing one kit.

## Run it

```bash
npm run prototype          # from the repo root — dev server on :4321
npm run prototype:build    # production build at the /ai-coaching-hub base + isolation check
```

From inside `prototype/starlight-presentation/`:

```bash
npm run dev
npm run build              # build + verify-isolation
npm run check              # astro check (0 errors expected)
npm run verify:isolation   # the guard, standalone
```

## The seven routes

| Route | Stack | What it is |
| --- | --- | --- |
| `/` | Starlight | Hub — editorial single column, modelled on `coaching-content/index.html` |
| `/talk` | Starlight | Module 1 — the 2026-09-15 talk, still `?variant=A\|B\|C` |
| `/token-101` | Starlight | Module 2 — the 18-beat scroll tower |
| `/bare/` | plain Astro | Hub, no Starlight |
| `/bare/talk` | plain Astro | Module 1, no Starlight |
| `/bare/token-101` | plain Astro | Module 2, no Starlight |
| **`/findings`** | Starlight | **The scorecard. Start here.** |

Plus `/2026-09-15-…` — the governed markdown rendered as-is by Starlight, the control.

Two switchers coexist by design: **stack** at the top, **variant** at the bottom on `/talk`.

## Layout

```
src/kit/                 the controlled variable — consumes ONLY --k-*
  tokens.css             101 lines, literal light+dark  (the bare baseline)
  tokens-starlight.css    49 lines, remaps --k-* from --sl-*  (loaded via customCss)
  format.ts              one mmss, countUp, usd
  module.ts              LearningModule — deliberately does not model the body
  primitives/            15 files, each scoped from measured duplication
  tower/                 engine.ts (ported wholesale), Tower/Beat/TowerToc/Sources, beats.ts
  beats/                 S1_1 … S8_2 — 18 beat components
  animation.css          513 lines, ported UNTOUCHED from the harvest
src/layouts/BareLayout.astro    161 lines — everything Starlight gave for free
src/components/          page structure + prototype 1's three variants
scripts/verify-isolation.mjs    the guard that keeps the experiment honest
```

**Guard rail** (from the skill's UI.md): the kit owns leaf primitives and beat content,
**never page structure**. On the stack axis the rule is stronger — the kit is the controlled
variable, so if a primitive needed a Starlight-only feature that would be a *finding*, not a
branch. It never did.

## Why one Astro project is safe

Verified, not assumed. Starlight ships **no `injectScript`**; its CSS arrives via
`virtual:starlight/user-css`, imported by its own `Page.astro`. A route that never imports
Starlight gets no Starlight CSS and no `customCss` either. `scripts/verify-isolation.mjs` asserts
this on every build — including that the bare tree is still *styled*, because a page with zero
`--k-*` refs is broken, not clean.

The one thing that does cross is Astro's own 2.5 KB prefetch module, which Starlight enables
project-wide (`dist/index.js:94`). Zero Starlight code in it.

## What the first build caught

Prototype 1's variants looked stack-agnostic and were not. Two independent Starlight couplings,
**neither visible in the page HTML** — both hid in external CSS bundles:

1. **Tokens** — all three variants referenced `--sl-*` directly (39 / 37 / 29 call sites, 105 refs
   emitted). Migrated to `--k-*`.
2. **Delivery** — `prototype.css` shipped only through `customCss`, so `/bare/talk` rendered the
   switcher, banner, chips and verdict badges with no styles at all. Split into
   `styles/chrome.css` (both trees) and `styles/starlight-only.css`.

Lesson: *"is this portable?"* is not answerable by reading. Hence the build-time check.

## Fidelity notes

- **S8.1 / S8.2 are restored.** They are commented out in the harvest
  (`ai-token-economy-101/index.html:3675–3833`), so the live page ships **16** beats, not the 18 its
  own data attributes describe. Restored because the closer is the payoff of the argument.
- **daisyUI dropped** — it sets `data-theme` on `<html>` across 35 themes and Starlight owns that
  exact attribute. `badge` ×91, `card` ×45, `tooltip` ×42, `btn` ×14 rewritten onto the kit.
- **The TOC is server-rendered**; the harvest injected it as an `innerHTML` string, so it did not
  exist without JS and Pagefind never saw it.
- **Reveal-on-enter is progressive**; the harvest shipped `opacity-0` in the markup, so with JS off
  the page was blank.
- **scroll-snap is a prop** — on for `/bare/token-101`, off for `/token-101`. The harvest's tower
  owned the page scroller; Starlight does not give it up.
- **`loop-engineering-101`** is a third page in that repo, out of scope here, listed as a
  coming-soon placeholder.

## Boundaries

- Throwaway. Never merged to `main`.
- Does **not** start #7 (gated on #5/#6). The verdict pointer belongs on **#1** (and #5/#6),
  **not #10** — #10 is the corpus epic and explicitly excludes Astro/Starlight/the site/i18n/Pages.
- No tests, no error handling beyond runnable, no persistence.
- **The verdict section on `/findings` is left blank for Han.**
