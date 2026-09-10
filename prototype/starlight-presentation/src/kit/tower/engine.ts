/**
 * Scroll-tower engine — ported wholesale from
 * coaching-content/ai-token-economy-101/presentation.js (1287 lines, zero deps).
 *
 * Kept as-is: the `registerActivate`/`fireActivate` one-shot registry, the
 * IntersectionObserver reveal + active-sync, dual progress bars, accordion
 * grouping, keyboard nav (↑/↓/PageUp/PageDown/Home/End), hash deep-linking via
 * `history.replaceState`, and the `reduceMotion` short-circuit on every path.
 *
 * THREE deliberate changes, each a finding on /findings:
 *
 * 1. Scroll root is now optional. The original hard-coded `root: #tower`, an
 *    `overflow-y-auto` element that owned the whole viewport. Starlight owns
 *    page scroll, so a nested scroller fights its layout. The engine now uses
 *    `[data-tower-scroll]` when present and the viewport otherwise, which lets
 *    the SAME engine drive both trees.
 * 2. The 35-theme daisyUI picker is gone. It set `data-theme` on <html>, which
 *    Starlight also owns — they cannot both have it. Dropped per issue #4
 *    ("Starlight owns theming, no parallel palette").
 * 3. The TOC is rendered server-side from `beats.ts` rather than injected as an
 *    innerHTML string, so it exists without JS and Pagefind can see it.
 */

import { BEAT_ORDER } from './beats';

export type ActivateFn = (reduceMotion: boolean) => void;

const registry = new Map<string, ActivateFn>();
const activated = new Set<string>();

export const reduceMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** A beat registers its one-shot on-activation animation here. */
export function registerActivate(id: string, fn: ActivateFn): void {
  registry.set(id, fn);
  scheduleInit();
}

/** Fire a beat's activate callback exactly once. */
export function fireActivate(id: string): void {
  if (activated.has(id)) return;
  const fn = registry.get(id);
  if (!fn) return;
  activated.add(id);
  fn(reduceMotion());
}

// --- init is deferred so every beat module has registered before we start.
// All component scripts land in one bundle evaluated synchronously, so a single
// rAF hop is enough; no ordering assumptions between modules.
let scheduled = false;
function scheduleInit(): void {
  if (scheduled || typeof window === 'undefined') return;
  scheduled = true;
  requestAnimationFrame(() => init());
}

let started = false;

export function init(): void {
  if (started) return;
  const tower = document.getElementById('tower');
  if (!tower) return;
  started = true;

  const reduced = reduceMotion();
  const scrollRoot = document.querySelector<HTMLElement>('[data-tower-scroll]');
  const beatEls = Array.from(tower.querySelectorAll<HTMLElement>('.beat'));
  if (beatEls.length === 0) return;

  const order = beatEls.map((el) => el.id);
  const total = order.length;
  const sectionOf = new Map<string, string>();
  for (const el of beatEls) sectionOf.set(el.id, el.dataset.section ?? '');
  const sections = [...new Set(beatEls.map((el) => el.dataset.section ?? ''))];

  const progressEls = Array.from(
    document.querySelectorAll<HTMLElement>('[data-tower-progress]')
  );

  let activeBeatId: string | null = null;

  const revealBeat = (el: Element | null) => {
    el?.querySelector('.beat-inner')?.classList.add('is-revealed');
  };

  const setSectionExpanded = (num: string, expanded: boolean) => {
    for (const el of document.querySelectorAll(`[data-section-beats="${num}"]`)) {
      el.classList.toggle('is-collapsed', !expanded);
    }
    for (const c of document.querySelectorAll(`[data-section-toggle="${num}"] [data-caret]`)) {
      c.classList.toggle('is-open', expanded);
    }
    for (const b of document.querySelectorAll(`[data-section-toggle="${num}"]`)) {
      b.setAttribute('aria-expanded', String(expanded));
    }
  };

  const setActive = (id: string) => {
    if (!sectionOf.has(id) || id === activeBeatId) return;
    activeBeatId = id;

    for (const a of document.querySelectorAll('[data-toc-jump]')) {
      a.classList.toggle('is-active', a.getAttribute('data-toc-jump') === id);
    }
    const activeSection = sectionOf.get(id);
    for (const s of sections) setSectionExpanded(s, s === activeSection);

    const idx = order.indexOf(id);
    const pct = total > 1 ? (idx / (total - 1)) * 100 : 100;
    for (const el of progressEls) el.style.width = `${pct}%`;

    const hash = `#${id}`;
    if (window.location.hash !== hash) window.history.replaceState(null, '', hash);

    // A beat taller than the viewport may never cross the reveal ratio, so
    // becoming active is a reliable second trigger for its instrument.
    fireActivate(id);
  };

  const scrollToBeat = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  // --- clicks: TOC jumps and accordion toggles
  document.addEventListener('click', (e) => {
    const target = e.target as Element | null;
    const jump = target?.closest('[data-toc-jump]');
    if (jump) {
      e.preventDefault();
      scrollToBeat(jump.getAttribute('data-toc-jump') ?? '');
      const drawer = document.getElementById('toc-drawer');
      if (drawer instanceof HTMLInputElement) drawer.checked = false;
      return;
    }
    const toggle = target?.closest('[data-section-toggle]');
    if (toggle) {
      e.preventDefault();
      const num = toggle.getAttribute('data-section-toggle') ?? '';
      const beatsEl = document.querySelector(`[data-section-beats="${num}"]`);
      if (beatsEl) setSectionExpanded(num, beatsEl.classList.contains('is-collapsed'));
    }
  });

  // --- keyboard nav, inert while typing in a control
  window.addEventListener('keydown', (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    const idx = activeBeatId ? order.indexOf(activeBeatId) : 0;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      if (idx < total - 1) scrollToBeat(order[idx + 1]);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      if (idx > 0) scrollToBeat(order[idx - 1]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      scrollToBeat(order[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      scrollToBeat(order[total - 1]);
    }
  });

  window.addEventListener('hashchange', () => {
    const id = window.location.hash.slice(1);
    if (sectionOf.has(id) && id !== activeBeatId) scrollToBeat(id);
  });

  // --- reveal + active tracking
  const ratios = new Map<string, number>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        if (e.isIntersecting && e.intersectionRatio > 0.1) revealBeat(e.target);
        if (e.isIntersecting && e.intersectionRatio > 0.35) fireActivate(e.target.id);
      }
      let bestId: string | null = null;
      let bestRatio = 0;
      ratios.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });
      if (bestId) setActive(bestId);
    },
    { root: scrollRoot, threshold: [0.1, 0.25, 0.5, 0.75, 1] }
  );
  for (const el of beatEls) io.observe(el);

  // --- reduced motion: everything is already in its final state
  if (reduced) {
    for (const el of document.querySelectorAll('.beat-inner')) el.classList.add('is-revealed');
  }

  const hashId = window.location.hash.slice(1);
  const initialId = sectionOf.has(hashId) ? hashId : order[0];
  setActive(initialId);
  if (sectionOf.has(hashId)) {
    requestAnimationFrame(() => scrollToBeat(hashId));
  } else {
    revealBeat(document.getElementById(order[0]));
  }
}

export { BEAT_ORDER };
