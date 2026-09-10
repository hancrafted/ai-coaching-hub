// THROWAWAY PROTOTYPE.
//
// The structured shape of the talk, derived by hand from
// `docs/presentations/2026-09-15-maintaining-high-value-knowledge-bases.md`
// (as at commit 31d16b6). Theses, figures and verdicts are quoted verbatim so
// the variants disagree about *layout* only, never about content.
//
// This is deliberately hand-authored rather than parsed. Parsing the script's
// prose into thesis/beats/evidence would be the real feature; the question this
// prototype answers is what the page should look like once you have it.

export type Verdict = 'Solved' | 'Holding' | 'Split' | 'Amplified';

export interface Evidence {
  claim: string;
  /** `sources` id from the script's frontmatter. */
  source: string;
}

export interface Subsection {
  id: string;
  number: string;
  title: string;
  thesis: string;
  seconds: number;
  beats: string[];
  evidence?: Evidence[];
  /** The script's own "Visual —" note. */
  visual?: string;
  /** The script's blockquoted speaker asides. */
  aside?: string;
  diagram?: string;
}

export interface Section {
  id: string;
  number: string;
  title: string;
  minutes: number;
  subsections: Subsection[];
}

export const SOURCES: Record<string, { title: string; resource: string }> = {
  'doc-cost': {
    title: 'The measured cost of documentation rot',
    resource: 'docs/llm-wiki/references/aikb-documentation-cost.md',
  },
  'doc-drift': {
    title: 'Established names for documentation drift',
    resource: 'docs/llm-wiki/references/aikb-documentation-drift.md',
  },
  'knowledge-moats': {
    title: 'Do AI knowledge moats track training-data density',
    resource: 'docs/llm-wiki/references/aikb-knowledge-moats.md',
  },
  'okf-knowledge-bases': {
    title: 'Knowledge bases in Open Knowledge Format',
    resource: 'docs/llm-wiki/references/aikb-knowledge-bases.md',
  },
  rag: {
    title: 'Retrieval-augmented generation',
    resource: 'docs/llm-wiki/references/aikb-retrieval-augmented-generation.md',
  },
  'docs-standards': {
    title: 'Is machine-readable documentation standardised',
    resource: 'docs/llm-wiki/references/aikb-structured-docs-standards.md',
  },
  'token-economy-talk': {
    title: 'AI Token Economy — Why you treat AI as a Freelancer (recording)',
    resource: 'https://www.youtube.com/watch?v=S0Nx4faEebY',
  },
  'harness-readme': {
    title: 'markdown-harness — README, v0.0.4',
    resource: 'https://github.com/hancrafted/markdown-harness#readme',
  },
};

/** The scoring rubric from §1.3, re-scored in §2.2. Order is load-bearing. */
export const FAILURE_MODES: {
  n: number;
  name: string;
  gloss: string;
  before: string;
  withAi: string;
  verdict: Verdict;
}[] = [
  {
    n: 1,
    name: 'Individual protectionism',
    gloss: 'knowledge as personal USP',
    before: 'Knowing the undocumented system was security',
    withAi: 'Data density predicts snippet skill, not engineering',
    verdict: 'Holding',
  },
  {
    n: 2,
    name: 'Non-paid work for domain champions',
    gloss: "writing is nobody's job",
    before: 'Unpaid work nobody had time for',
    withAi: 'Drafting is nearly free',
    verdict: 'Solved',
  },
  {
    n: 3,
    name: 'Low discoverability, and no verification of trust',
    gloss: 'you could not find the page, and could not tell if it was true',
    before: "Couldn't find the page",
    withAi: "Retrieval finds it; nothing says if it's true",
    verdict: 'Split',
  },
  {
    n: 4,
    name: 'Low initial cost, high maintenance cost',
    gloss: 'the living-document problem',
    before: 'Docs rotted, updating was manual',
    withAi: 'Generation outpaces verification',
    verdict: 'Amplified',
  },
];

export const TRIM_ORDER: {
  rank: number;
  /** Subsection number the cut applies to — variant B matches rows on this. */
  section: string;
  target: string;
  how: string;
  saves: number;
  lastResort?: boolean;
}[] = [
  {
    rank: 1,
    section: '2.3',
    target: '2.3, the standards landscape',
    how: 'drop llms.txt, MCP and Dublin Core; keep "converging, not standardised" and the OKF age.',
    saves: 60,
  },
  {
    rank: 2,
    section: '1.3',
    target: '1.3',
    how: 'four modes read off one slide, 82.3% spoken without dwelling.',
    saves: 45,
  },
  {
    rank: 3,
    section: '2.3',
    target: '2.3, RAG',
    how: 'drop the mechanism explanation, keep the hot-swap numbers.',
    saves: 40,
  },
  {
    rank: 4,
    section: '3.4',
    target: '3.4',
    how: 'A/B only, hook described rather than run — this is the section that converts.',
    saves: 60,
    lastResort: true,
  },
];

/** Segments the script marks never-cut. Kept as numbers so variant B can flag rows. */
export const NEVER_CUT_SECTIONS = ['2.1', '2.2', '3.4'];

export const NEVER_CUT =
  "2.1 (the ease-in the audience needs), 2.2 (the argument), 3.4's hook if it is still in (the proof)";

export const CORRECTIONS = [
  { claim: '"Assess mode evaluates them at read time" — removed, then reinstated.', stamp: 'true at 0.0.1, false from 0.0.3', detail: 'No such mode existed in 0.0.1; the CLI was --check, --query, --audit, --help. As of 0.0.4 there are four commands and --assess is one of them.' },
  { claim: 'verified_by → verified.by', stamp: '0.0.1, still true at 0.0.4', detail: 'The field is a mapping, verified: { by, at }. The underscore form does not resolve.' },
  { claim: '"Built on the Google OKF standard" — removed.', stamp: '0.0.4', detail: 'Wrong twice: OKF is a format rather than a standard, and nothing in the config language privileges it.' },
  { claim: '"Standardised now, not experimental" → "converging."', stamp: '0.0.4, per #36', detail: 'Nothing in the landscape has crossed the line into standardisation, including OKF.' },
  { claim: '"COBOL still defensible; full-stack web already gone" — half refuted.', stamp: 'per #34', detail: 'The COBOL half holds. The web half inverts, and the mechanism the claim assumed is not the mechanism the researchers found.' },
  { claim: '"Citation drift" — dropped.', stamp: 'per #35', detail: 'The name is already claimed for LLM reference fabrication. Link rot and content drift are the established terms; structure drift is flagged as my own.' },
];

export const OPEN_GAPS = [
  { title: 'Demo fallback', detail: '3.4 is a live Claude Code session and there is no recorded run behind it. A stale-fact demo that silently works is worse than no demo. Needs a rehearsal slot, not a to-do.' },
  { title: 'Rehearsal against the clock', detail: '26 minutes is estimated, not measured.' },
];

export const HELD_FOR_QA = [
  'Full harness internals — a separate session',
  'Which internal domains sit in holding vs collapsed — invites speculation you don’t need on stage',
  'Why not JSON Schema, Astro collections, remark-lint — answer exists, costs three minutes',
  'The OKF Preset — it is not shipped; the config is hand-written',
];

export const TALK = {
  title: 'Maintaining High Value Knowledge Bases',
  occasion: 'AI all-hands · Tue 2026-09-15 · 20-minute slot, 20–30 tolerated',
  description:
    'All-hands talk scoring four pre-AI knowledge-base failure modes against what AI actually changed — one solved, one holding, one split, maintenance amplified.',
  status: 'draft',
  staleAfter: '2026-09-16',
  sourcePath: 'docs/presentations/2026-09-15-maintaining-high-value-knowledge-bases.md',
  totalMinutes: 26,
  envelope: '20–30 tolerated, aim 20–23',
};
