#!/usr/bin/env node
// PROTOTYPE 2 GUARD — asserts the two-tree experiment stays controlled.
//
// The whole comparison is void if Starlight leaks onto the bare tree, and the
// first build of /bare/talk leaked in two ways at once (105 `--sl-*` refs via
// the variant components, plus zero chrome because prototype.css shipped only
// through `customCss`). Neither was visible in the page HTML — both hid in
// external CSS bundles. Hence a script rather than an eyeball.
//
// Run: node scripts/verify-isolation.mjs   (after `npm run build`)
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const BARE = ['bare/index.html', 'bare/talk/index.html', 'bare/token-101/index.html'];
const STARLIGHT = ['index.html', 'talk/index.html', 'token-101/index.html'];

const fail = [];
const ok = [];

// Asset URLs carry the configured base (`/ai-coaching-hub/...`) in a Pages
// build and no base at the root. The base is DERIVED from the emitted HTML
// rather than read from PROTOTYPE_BASE, because in `VAR=x astro build && node
// ...` the assignment applies only to the first command — so the env var is
// absent here. Getting this wrong made every lookup miss and the script report
// "no CSS at all": a false NEGATIVE that would have hidden real contamination.
const cssOf = (html) => [...html.matchAll(/href="([^"]*\.css)"/g)].map((m) => m[1]);

const detectBase = () => {
  for (const page of [...STARLIGHT, ...BARE]) {
    const p = join(DIST, page);
    if (!existsSync(p)) continue;
    const m = readFileSync(p, 'utf8').match(/href="(\/[^"]*?)\/?_astro\//);
    if (m) return m[1].replace(/^\/|\/$/g, '');
  }
  return '';
};
const BASE = detectBase();

const toDistPath = (url) => {
  let u = url.replace(/^\/+/, '');
  if (BASE && (u === BASE || u.startsWith(`${BASE}/`))) u = u.slice(BASE.length + 1);
  return join(DIST, u);
};

if (!existsSync(DIST)) {
  console.error('dist/ missing — run `npm run build` first.');
  process.exit(2);
}

for (const page of BARE) {
  const p = join(DIST, page);
  if (!existsSync(p)) {
    fail.push(`${page}: not built`);
    continue;
  }
  const html = readFileSync(p, 'utf8');

  if (html.includes('--sl-')) fail.push(`${page}: HTML references --sl-*`);
  // Look for Starlight ARTIFACTS, not the word — the stack switcher links to
  // the Starlight tree by name, which is legitimate content.
  if (/class="[^"]*\bsl-[a-z]/.test(html)) fail.push(`${page}: HTML has Starlight sl-* classes`);
  if (/_astro\/(Search|ThemeSelect|Page)\./.test(html))
    fail.push(`${page}: loads a Starlight component bundle`);
  if (/data-pagefind|starlight-route/.test(html))
    fail.push(`${page}: carries Starlight runtime markers`);

  const sheets = cssOf(html);
  if (sheets.length === 0) fail.push(`${page}: loads no stylesheet at all`);
  for (const css of sheets) {
    const cp = toDistPath(css);
    if (!existsSync(cp)) {
      fail.push(`${page}: stylesheet ${css} did not resolve under ${DIST}/`);
      continue;
    }
    const body = readFileSync(cp, 'utf8');
    const slRefs = (body.match(/--sl-/g) ?? []).length;
    if (slRefs > 0) fail.push(`${page}: loads ${css} which has ${slRefs} --sl-* refs`);
  }

  // The bare tree must still be styled — a page with no --k-* is not "clean",
  // it is broken. This is the check that would have caught the missing chrome.
  const kitRefs = cssOf(html)
    .map(toDistPath)
    .filter(existsSync)
    .reduce((n, c) => n + (readFileSync(c, 'utf8').match(/--k-/g) ?? []).length, 0);
  if (kitRefs === 0) fail.push(`${page}: loads no CSS using the kit contract (--k-*)`);
  else ok.push(`${page}: clean, ${kitRefs} kit token refs`);
}

// Sanity: the Starlight tree SHOULD have Starlight. If it doesn't, the two
// trees are accidentally identical and the comparison proves nothing.
for (const page of STARLIGHT) {
  const p = join(DIST, page);
  if (!existsSync(p)) {
    fail.push(`${page}: not built`);
    continue;
  }
  const html = readFileSync(p, 'utf8');
  const hasSl = cssOf(html)
    .map(toDistPath)
    .filter(existsSync)
    .some((c) => readFileSync(c, 'utf8').includes('--sl-'));
  if (!hasSl) fail.push(`${page}: no Starlight CSS — control tree is not actually Starlight`);
  else ok.push(`${page}: Starlight present, as expected`);
}

console.log(`  base: ${BASE === '' ? '(root)' : `/${BASE}`}`);
for (const line of ok) console.log(`  ok   ${line}`);
for (const line of fail) console.log(`  FAIL ${line}`);
console.log(
  fail.length === 0
    ? `\nisolation verified — ${ok.length} assertions passed`
    : `\n${fail.length} isolation failure(s)`
);
process.exit(fail.length === 0 ? 0 : 1);
