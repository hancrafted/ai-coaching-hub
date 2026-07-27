# Visual-design references & quality bar for the coaching hub

Research ticket: [#3](https://github.com/hancrafted/ai-coaching-hub/issues/3) — "Gather visual-design references + quality bar for the coaching hub."

## Intro — the design philosophy these references serve

The hub is a public GitHub Pages site for a solo coach: a **marketing-ish hub/landing page** plus
**markdown-driven content pages** (articles, interactive task docs), most likely built on **Astro**,
probably **Astro Starlight**. The owner's standing preference is **form follows function** — design
should serve _reading, navigation, and trust_, not novelty for its own sake — and the owner values
**fast, high-quality output over bespoke uniqueness**.

So these references are chosen to be _achievable-with-discipline_, not aspirational showpieces. Each
direction is judged on real design vocabulary (typography, spacing/rhythm, color, layout) and on how
much of it a docs framework like Starlight gives you **for free** vs. **custom CSS/tokens** vs.
**dropping Starlight for a custom Astro layout**. The bar we're setting is "unmistakably crafted and
trustworthy," which for a content site is mostly typography, rhythm, contrast, and consistency — all
things Starlight is already good at.

---

## Direction 1 — Docs-native editorial (reading-first)

The elevated version of the default documentation aesthetic. This is the natural home for the
**content pages**.

**Concrete examples**

- Astro docs — https://docs.astro.build (itself built with Starlight)
- Cloudflare Docs — https://developers.cloudflare.com
- Netlify Docs — https://docs.netlify.com
- Biome — https://biomejs.dev
- The Starlight showcase itself — https://starlight.astro.build/resources/showcase/

**What works (design vocabulary)**

- **Typography:** clean sans body at a comfortable base (≈16px), high line-height for long-form
  reading, and a clear, restrained H1–H4 hierarchy. Nothing decorative competes with the words.
- **Spacing/rhythm:** predictable vertical rhythm between headings, paragraphs, callouts, and code
  blocks; generous but consistent content padding.
- **Color (light + dark):** a neutral gray ramp for surfaces and one accent hue for links/active
  states. Both themes are first-class, not an afterthought.
- **Layout:** the three-region docs grid — left sidebar navigation, a **measure-constrained** center
  column, and a right-hand on-page table of contents. There is essentially no "hero"; trust comes
  from clarity and completeness, not a splash.
- **Trust/credibility:** authoritative because it is _predictable_ — reliable navigation, full-text
  search, and a reading column tuned for comprehension. This is how a solo coach signals "I will not
  waste your time."

**Starlight achievability: ~90% free.** This _is_ what Starlight ships — filesystem-derived sidebar,
auto TOC, Pagefind full-text search, automatic light/dark, accessible-by-default markup, and
readable default typography. Customization needed: accent color + fonts via CSS custom properties.
Dropping Starlight: not required for this direction.

---

## Direction 2 — Warm personal-brand editorial (trust through voice)

The bridge between the marketing hub and the content. This is where a _solo_ coach earns credibility:
a consistent human identity carried by typography and voice rather than corporate polish.

**Concrete examples**

- Josh W. Comeau — https://www.joshwcomeau.com (full-time solo educator; warm custom type, a
  signature **flicker-free dark mode**, design tokens, playful-but-functional)
- Maggie Appleton — https://maggieappleton.com (semi-serif + Lato pairing, fluid
  viewport-relative sizing, illustrated "visual essays," content stratified by maturity;
  source is open — https://github.com/MaggieAppleton/maggieappleton.com-V3)
- Brian Lovin — https://brianlovin.com (open-source Next.js/MDX/Tailwind personal site, widely
  used as a reference; note: detailed design specifics were thin in sourcing — see Gaps)

**What works (design vocabulary)**

- **Typography:** a deliberate **pairing** — a characterful serif/semi-serif for display plus a clean
  sans for body (Maggie's semi-serif + Lato is the archetype) — or one warm family used across
  weights (Josh). Headings are larger and more expressive than in Direction 1; body stays at a
  comfortable ≈65ch measure. Fluid/`clamp()` sizing keeps proportions right across widths.
- **Spacing/rhythm:** generous whitespace, clear section rhythm, and figures/illustrations that break
  up text and anchor abstract ideas.
- **Color (light + dark):** warm neutrals (cream/off-white rather than pure white) with one signature
  accent; **dark mode treated as a signature feature**, built flicker-free via design tokens rather
  than a naive inversion.
- **Layout:** content-first single column with occasional full-bleed figures. The **hub/home** gets a
  personal hero — a photo or mark, a first-person line on _who I am and who I help_, then curated
  entry points into the content.
- **Trust/credibility:** first-person voice, a face, an explicit "who this is for," and evidence
  (writing, courses, testimonials). Consistency of identity across pages is the trust mechanism.

**Starlight achievability: mixed — plan for a split.**

- _Content pages:_ fit Starlight cleanly with custom fonts + color tokens (custom CSS only).
- _The hub/landing page:_ partly free — Starlight ships a `splash` page template with hero
  frontmatter, and you can override built-in components (Hero, Header, etc.). A warm branded hero is
  reachable via **component overrides + custom CSS**.
- _Heavy bespoke interactivity_ (Josh-level 3D assets, custom embeds): this is where you **drop
  Starlight for a custom Astro route/layout** on just those pages. Recommended split: Starlight for
  all content; a custom Astro page (or Starlight splash + overrides) for the hub. Do not chase the
  bespoke tail — it fights the owner's "fast + high-quality over unique" preference.

---

## Direction 3 — System-backed rigor (measurable quality in both themes)

Not an aesthetic but the **backbone** that makes Directions 1 and 2 _verifiably_ high-quality rather
than "looks fine to me." Adopt an established, published system so light **and** dark are principled
and contrast is guaranteed.

**Concrete systems (with published type-scale / contrast references)**

- Radix Colors — https://www.radix-ui.com/colors — a 12-step semantic scale (backgrounds → borders →
  text), with light, **dark**, and alpha variants, contrast targeted on the modern **APCA** model
  (text steps guaranteed to Lc 60 / Lc 90). Semantic step roles map directly to CSS variables.
- A modular **type scale** — https://type-scale.com and Bringhurst's modular-scale principle: pick
  one ratio (Minor Third **1.200** or Major Third **1.250**) and derive every size from it.
- Tailwind CSS's published type/spacing scale as a second reference point — https://tailwindcss.com
- WCAG 2.1 AA as the floor — https://webaim.org/resources/contrastchecker/ (body ≥ **4.5:1**,
  large text/UI ≥ **3:1**).

**What works**

- **Typography:** one ratio for the whole scale (no ad-hoc sizes), body 16–18px, measure held to
  45–75ch (≈66ch ideal).
- **Color:** semantic 12-step scales give you hover/border/text states _and_ a matching dark theme
  "for free," with contrast baked in — exactly the hard part of a good dark mode.
- **Rhythm:** derive spacing tokens from the same scale so vertical rhythm is consistent by
  construction.
- **Trust/credibility:** AA-in-both-themes and rigorous consistency _read as competence and care_ —
  the quiet signals a coaching audience uses to judge whether to trust someone.

**Starlight achievability: excellent — almost entirely "override CSS variables."** Starlight's
themes (including page width and colors) are defined as CSS custom properties meant to be overridden
in a custom CSS file, so Radix color tokens and a modular type scale drop straight in. No dropping
Starlight required. Caveat: APCA is the _draft/future_ WCAG 3 model — keep a classic WCAG 2.1 AA
check (4.5:1 / 3:1) in the loop so you're not depending only on a not-yet-final standard.

---

## Quality bar checklist

Concrete, checkable criteria to judge our output against. Target: pass all of these.

1. **One type ratio.** The whole type scale derives from a single ratio (e.g. 1.200 or 1.250) — no
   ad-hoc font sizes.
2. **Readable body.** Body text is 16–18px with line-height ≈1.5–1.75.
3. **Controlled measure.** The content column is held to ~45–75ch (target ≈66ch) for readability.
4. **Consistent vertical rhythm.** Spacing between blocks comes from a defined spacing scale, not
   arbitrary pixel values.
5. **Restrained type palette.** At most two typefaces (one display/heading + one body), or one family
   across weights; code set in a monospace.
6. **Semantic color.** One neutral gray ramp + one accent hue, applied through semantic tokens
   (background / border / text / interactive roles).
7. **Dark mode is first-class.** Designed as its own theme (not an inversion) and **flicker-free** —
   no flash of the wrong theme on first load.
8. **AA contrast in _both_ themes.** Body ≥ 4.5:1 and large text / UI components ≥ 3:1 in light and
   dark (or Radix APCA Lc 60 / Lc 90), verified with a checker.
9. **Accessible navigation preserved.** Visible non-color focus states, keyboard operability, and a
   skip link — Starlight provides these; don't regress them with custom CSS.
10. **Hub page states its value fast.** A clear above-the-fold value proposition + who-it's-for + one
    primary CTA, with a human identity present (name / face / first-person) for trust.
11. **Predictable wayfinding.** Content pages have a sidebar + on-page TOC, and search is available.
12. **Responsive by construction.** Type scale and measure adapt down on mobile (lower ratio/base if
    needed), images are `max-width:100%`, and the page body never scrolls horizontally.

---

## Gaps & honesty notes

- **Brian Lovin** is cited as a well-known open-source personal-site reference, but detailed design
  specifics (exact type pairing, dark-mode treatment) were not well-sourced; treat it as a structural
  reference, not a spec.
- **APCA** (used by Radix Colors) is the _candidate_ model for the future WCAG 3, not yet the ratified
  standard — pair it with classic WCAG 2.1 AA checks.
- The Starlight **showcase** list changes over time; the named sites were current at time of writing
  (2026-07-27) and should be spot-checked before quoting them publicly.

---

## Sources

**Astro Starlight (framework capabilities & showcase)**

- https://starlight.astro.build/
- https://starlight.astro.build/resources/showcase/
- https://docs.astro.build
- https://developers.cloudflare.com
- https://docs.netlify.com
- https://biomejs.dev

**Personal-brand editorial references**

- https://www.joshwcomeau.com
- https://www.joshwcomeau.com/react/dark-mode/ (flicker-free dark mode write-up)
- https://maggieappleton.com
- https://maggieappleton.com/colophon/
- https://github.com/MaggieAppleton/maggieappleton.com-V3
- https://brianlovin.com

**Design systems: color, type scale, contrast**

- https://www.radix-ui.com/colors
- https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
- https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html
- https://tailwindcss.com
- https://type-scale.com

**Typographic readability & accessibility standards**

- https://baymard.com/blog/line-length-readability (optimal measure)
- https://alistapart.com/article/more-meaningful-typography/ (modular scale)
- https://webaim.org/resources/contrastchecker/ (WCAG 2.1 AA: 4.5:1 / 3:1)
