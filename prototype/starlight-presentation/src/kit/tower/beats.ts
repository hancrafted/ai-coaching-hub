// Beat metadata, lifted verbatim from the harvest's own data attributes
// (data-section / data-section-title / data-beat / data-assertion on each
// `.beat` <section>). The original derived this model from the DOM at runtime;
// here it is authored data, so the TOC renders server-side instead of being
// injected by JS. That difference is a finding: the harvest's TOC was invisible
// to search engines and to Pagefind.

export interface BeatMeta {
  /** DOM id, e.g. `s2-1` — also the deep-link hash. */
  id: string;
  /** Display code, e.g. `S2.1`. */
  code: string;
  section: string;
  assertion: string;
}

export interface BeatSection {
  num: string;
  title: string;
  beats: BeatMeta[];
}

const RAW: Array<[string, string, string, string]> = [
  ['S1.1', '1', 'Intro', "AI can give you and the people you lead super powers, but it comes with hidden managing responsibilities you didn't sign up for. A general overview."],
  ['S2.1', '2', 'Motivation', "Thought experiment: imagine you're assigned a freelancer with three weird characteristics."],
  ['S2.2', '2', 'Motivation', 'It’s an LLM — but if it were a human, how would you manage it?'],
  ['S2.3', '2', 'Motivation', "New technology gives rise to new disciplines — and the newest one doesn't have a settled name yet."],
  ['S2.4', '2', 'Motivation', "For a human freelancer you'd demand a business case. AI bills you the same money — invisibly, over many prompts."],
  ['S2.5', '2', 'Motivation', "You're now accountable for a budget you never signed up to manage — and the winner optimizes outcome per euro."],
  ['S3.1', '3', 'What Is a Token', 'Tokens are the basic unit of data for LLMs — every one is billed.'],
  ['S3.2', '3', 'What Is a Token', 'How to measure token usage — develop a sense of what tasks cost, and which model to use.'],
  ['S3.3', '3', 'What Is a Token', 'Vendors profit when the meter is invisible — treat hidden cost as a design choice, not an accident, and build a sense of it.'],
  ['S4.1', '4', 'Managing Context', "Tokens pile up in the context window — the model's attention span, and it fills up."],
  ['S4.2', '4', 'Managing Context', 'The lost middle — models attend to the start and end, but the middle blurs and key instructions vanish.'],
  ['S4.3', '4', 'Managing Context', 'Below 50% is the smart zone; above it the model loses the plot — so monitor, compact, and hand off.'],
  ['S5.1', '5', 'Cost of Agentic AI', 'Every step re-sends everything before it, so one bug fix compounds to ~73,000 tokens of context.'],
  ['S5.2', '5', 'Cost of Agentic AI', 'Same bug fix, ~14× cost swing — DeepSeek ~$0.11 vs Opus ~$1.54.'],
  ['S6.1', '6', 'Model Tiers', 'One workflow, many models — route each task to the cheapest model that can do it well.'],
  ['S7.1', '7', 'Tools & Tips', 'Three levers to improve your token economy'],
  ['S8.1', '8', 'Closer', 'Start building the context — shared rules, clear definitions, and structured memory scale effortlessly.'],
  ['S8.2', '8', 'Closer', "The winner isn't who spends the most on AI, or who refuses it — it's whoever's teaching their people to use it economically."],
];

/** `S2.1` → `s2-1`, the id convention the harvest used for its hashes. */
export const beatId = (code: string): string => code.toLowerCase().replace('.', '-');

export const BEATS: BeatMeta[] = RAW.map(([code, section, , assertion]) => ({
  id: beatId(code),
  code,
  section,
  assertion,
}));

export const BEAT_SECTIONS: BeatSection[] = RAW.reduce<BeatSection[]>(
  (acc, [code, section, title, assertion]) => {
    let group = acc.find((s) => s.num === section);
    if (!group) {
      group = { num: section, title, beats: [] };
      acc.push(group);
    }
    group.beats.push({ id: beatId(code), code, section, assertion });
    return acc;
  },
  []
);

export const BEAT_ORDER: string[] = BEATS.map((b) => b.id);
