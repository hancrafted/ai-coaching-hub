// THROWAWAY PROTOTYPE. Section-by-section content, transcribed from the script.
// Theses and evidence figures are verbatim; beats are lightly compressed.
import type { Section } from './talk';

export const SECTIONS: Section[] = [
  {
    id: 'recap',
    number: '1',
    title: 'What is a knowledge base — recap',
    minutes: 4,
    subsections: [
      {
        id: 'four-jobs',
        number: '1.1',
        title: 'Knowledge management in one pass',
        thesis:
          'A knowledge base has four jobs — capture, curate, retrieve, trust — and only the first three ever get budgeted.',
        seconds: 40,
        beats: [
          'Name the four. Move fast; this is orientation, not content.',
          'Trust is the one nobody staffs, and it is the only one this talk is about.',
        ],
        visual: 'Four labels, the fourth unfilled.',
        diagram: 'fourJobs',
      },
      {
        id: 'pre-ai',
        number: '1.2',
        title: 'The pre-AI situation',
        thesis:
          'Everyone in this room has abandoned a wiki, and none of us thought that was our fault.',
        seconds: 50,
        beats: [
          'Wikis, Confluence graveyards, tribal knowledge.',
          'Ask for hands. Name it out loud — the shared failure is the permission to be blunt for the next twenty minutes.',
        ],
        visual: 'None. This beat is spoken.',
      },
      {
        id: 'four-modes',
        number: '1.3',
        title: 'Why it was always hard — four failure modes',
        thesis:
          'Documentation rot is not folklore about bad teams: 82.3% of the top thousand open-source projects have carried outdated documentation at some point in their history.',
        seconds: 150,
        beats: [
          'These four are the scoring rubric. Section 2 re-scores them in this exact order.',
          'Land the number here so the rubric arrives as measurement rather than opinion.',
        ],
        evidence: [
          {
            claim:
              '82.3% (658/800) of top-1000 GitHub projects contained at least one outdated code-element reference at some point in their history',
            source: 'doc-cost',
          },
        ],
        visual:
          'The four modes on one slide, numbered. The 82.3% figure beside them with its attribution line.',
        diagram: 'failureModes',
      },
    ],
  },
  {
    id: 'changed',
    number: '2',
    title: 'What has changed with AI',
    minutes: 11,
    subsections: [
      {
        id: 'freelancer',
        number: '2.1',
        title: 'The amnesiac freelancer',
        thesis: 'You have hired a brilliant freelancer whose first day is every day.',
        seconds: 120,
        beats: [
          'The metaphor, carried over from the token-economy talk.',
          'To do any work they need tools and context. "It\'s in the manual on Confluence" is you directing retrieval.',
          'Two side-by-side panels. Human freelancer and agent, same context arrow in. The human panel has a second arrow coming back — "this page is wrong." The agent panel does not.',
        ],
        evidence: [
          { claim: 'The freelancer metaphor, carried over from the token-economy talk', source: 'token-economy-talk' },
        ],
        visual:
          'The single most important image in the talk. The absence in the right-hand panel must read as absence, not as less ink — the eye should go looking for the arrow and fail to find it.',
        aside:
          'Plant the missing arrow and say nothing about it. No forward reference. It gets picked up in 3.4 by people who were paying attention, and that is worth more than signposting.',
        diagram: 'missingArrow',
      },
      {
        id: 'triage',
        number: '2.2',
        title: 'The triage — walking the four failure modes in order',
        thesis:
          'Of the four, AI solved one outright, left one standing, split one down the middle, and made the last one worse.',
        seconds: 330,
        beats: [
          'Champion tax — take the clean win first. Drafting is nearly free. Say it plainly; it buys credibility for the three that follow.',
          'Protectionism — the contrarian one. The intuitive story is that AI dissolves moats wherever it has training data. That story is wrong, and the data says so in both directions.',
          'COBOL confirms it: absent from The Stack\'s 30-language table entirely, and GPT-4 manages 15.75 pass@1 on COBOLEval. No data, no capability, moat holds.',
          'JavaScript and TypeScript refute it: together 617 GB against Python\'s 191 GB, the best-represented languages in the corpus — and on real repository issues they finish last and second-to-last of seven.',
          'The researchers do not attribute that to data scarcity. They reserve that explanation for C/C++ and attribute the JS/TS result to language and tooling properties. The mechanism is not the one the moat story assumes.',
          'So: density predicts how well a model writes a snippet. It does not predict whether it can resolve an issue in your repository. Your moat is not where the training data isn\'t — it\'s where the work is repo-shaped.',
          'Discoverability + trust — the split. Discoverability: solved. Verification of trust: amplified. One row, two opposite verdicts, and that is the hinge of the whole talk.',
          'Maintenance — the expensive one. More volume, rotting faster. Everything in section 3 exists for this row.',
        ],
        evidence: [
          {
            claim:
              "COBOL absent from The Stack's per-language table; GPT-4 at 15.75 and GPT-4o at 16.40 pass@1 on COBOLEval",
            source: 'knowledge-moats',
          },
          { claim: 'JS 486 GB + TS 131 GB vs Python 191 GB in The Stack', source: 'knowledge-moats' },
          {
            claim:
              'Multi-SWE-bench, 1,632 human-validated GitHub issues across seven languages, Claude-3.7-Sonnet: Python 45.80%, Java 23.44%, TypeScript 11.16%, JavaScript 4.78%. The paper\'s own words: "TS and JS consistently yield the lowest resolved rates."',
            source: 'knowledge-moats',
          },
        ],
        visual:
          'Two assets. The triage table built up one row at a time, with the Holding row weighted rather than given an equal quarter. Plus a chart of the moat inversion: corpus size against issue-resolution rate, so the two data-richest languages are visibly at the bottom.',
        aside:
          'Retired here as refuted: "AI doesn\'t dissolve knowledge moats, it dissolves the ones there\'s training data for", and "COBOL and legacy mainframe still defensible; full-stack web already gone." The COBOL half stands. The web half runs backwards.',
        diagram: 'moatInversion',
      },
      {
        id: 'state-of-art',
        number: '2.3',
        title: 'State of the art',
        thesis:
          'Retrieval got solved, structure is converging, and neither of them tells you whether what you just read is still true.',
        seconds: 210,
        beats: [
          'RAG — semantic search over chunks, fragments into the prompt. Buys discoverability outright. Buys no judgment about currency or truth, and this is not an opinion about implementations: the scoring step is an inner product between two embeddings, and there is no third term for age, origin or verification.',
          'The RAG paper\'s own hot-swap experiment measures exactly what that costs. One fixed model, 82 world leaders whose posts changed between 2016 and 2018. Matched to the right-era index: 70% and 68%. Matched to the wrong-era index: 12% and 4%. Nothing in the model noticed its index was stale. A person had to know, and swap it.',
          'LLM wiki — documents structured for machine reading from the start: frontmatter, explicit sources, navigable shape. Converging, not standardised — and the distinction matters because I am about to show you a tool built on one of these.',
          'Say the age out loud. Open Knowledge Format is 29 days old, six commits, one contributor, no releases, and its own spec says there is "no schema registry, no central authority, and no required tooling."',
          'llms.txt still calls itself a proposal after two years. MCP has a named owner under the Linux Foundation and is still not a ratified standard. AGENTS.md has the widest adoption — 60,000+ repositories — and makes the smallest standardisation claim of any of them.',
          'What actually crossing that line looks like: Dublin Core went 1995 workshop → RFC 2413 in 1998 → ANSI/NISO Z39.85 → ISO 15836. Years, under a named body.',
          'So the honest word is converging on a shape. I bet on OKF anyway, and section 3 says why that bet is cheap.',
          'Name the drift modes, and get the names right. Link rot and content drift are the two halves of reference rot, named in the scholarly-citation literature in 2014.',
          'Structure drift — a governed document\'s own frontmatter eroding over time — is my term. No literature names it. I am flagging that rather than smuggling it.',
          'I am not calling any of this "citation drift": that name is already taken, in this exact AI space, for LLMs fabricating references mid-conversation.',
        ],
        evidence: [
          { claim: 'Lewis et al. 2020 hot-swap: 70%/68% right-era, 12%/4% wrong-era, 82 world leaders', source: 'rag' },
          {
            claim:
              'OKF repo created 2026-08-11, six commits, one contributor, no releases; spec text on no central authority',
            source: 'docs-standards',
          },
          { claim: 'Dublin Core 1995 → RFC 2413 → Z39.85 → ISO 15836', source: 'docs-standards' },
          {
            claim:
              'Reference rot, link rot and content drift as defined by Klein et al. 2014; "citation drift" claimed by a 2025 workshop paper for LLM reference fabrication',
            source: 'doc-drift',
          },
        ],
        visual: 'One number slide for the hot-swap figures. The rest is spoken.',
        aside:
          "Purpose: the room should leave section 2 believing exactly one thing is still open, and that it's the expensive one. Beats 3 and 4 of the triage hand straight into section 3 — no transition needed.",
        diagram: 'ragHotSwap',
      },
    ],
  },
  {
    id: 'address',
    number: '3',
    title: 'How to address the failure modes',
    minutes: 7,
    subsections: [
      {
        id: 'requirement',
        number: '3.1',
        title: 'The requirement, derived — not "here\'s my tool"',
        thesis:
          'Structure is mechanically checkable and meaning is not, so you need both in one pass and nothing runs in CI today.',
        seconds: 40,
        beats: [
          "Derive the requirement from section 2's open row before naming anything you built. The tool has to look like the answer to a question the room already has.",
        ],
        visual: 'None.',
      },
      {
        id: 'harness',
        number: '3.2',
        title: 'What the harness is',
        thesis: 'It is a config-based linter for frontmatter, and it does not know what OKF is.',
        seconds: 80,
        beats: [
          'Per path glob, declare which frontmatter fields must exist and what constrains them — allowed value sets, length limits, formats.',
          'Nothing in the config language privileges OKF. It expresses any frontmatter vocabulary you want. My config happens to be OKF-shaped because I wrote it that way, and that hand-written config is the proof of the claim.',
          'Every field constraint carries an intent string. When a check fails, the failure is a signal an agent can act on, in my words, not a rule number.',
        ],
        evidence: [
          { claim: "OKF's own field set: type, sources, status, stale_after, verified", source: 'okf-knowledge-bases' },
          { claim: 'Config contract and command surface', source: 'harness-readme' },
        ],
        visual: 'One config excerpt, four lines, with an `intent` string visible.',
        aside:
          'Retired here: "built on the Google OKF standard." The word standard is wrong twice over — OKF is a format, not a standard, and the harness is not built on it.',
        diagram: 'driftModes',
      },
      {
        id: 'not-do',
        number: '3.3',
        title: 'What it does not do — state this plainly',
        thesis: 'It does not judge truth, and no deterministic check can, so it does not try.',
        seconds: 120,
        beats: [
          'What it does instead: enforces that trust metadata exists and is well-formed, which makes unverified-ness visible.',
          '`stale_after`, `verified.by` and `status` become trustable signals precisely because the harness guarantees they are present and pinned rather than optional freeform.',
          'The harness is not in the read path, and that is the design. An agent that opens a governed file in December sees `stale_after` has passed without running anything at all.',
          '`--assess` amplifies that signal at run time — it is never the only way to reach it. Both halves are true and the second does not weaken the first.',
          'Freshness deliberately never fails the build. `--check` is clock-free so a corpus cannot go red overnight on a tree nobody touched. A tool that failed CI on an expired document would only teach everyone to bump the date.',
          'Verification remains a human job. AI can pre-judge it and make it cheaper. It cannot own it.',
          'This also answers "who writes the semantic rules?" — nobody does. You write field constraints and intent strings.',
        ],
        evidence: [{ claim: 'The harness is not in the read path, by design', source: 'harness-readme' }],
        visual: 'None. This section is you talking straight at the room.',
      },
      {
        id: 'demo',
        number: '3.4',
        title: 'The demo',
        thesis: 'The agent makes the argument for me.',
        seconds: 180,
        beats: [
          'A/B first. Same query, twice: against a governed file and an ungoverned one — not "harness on / harness off". Ungoverned, the agent answers a stale fact with full confidence. Governed, `stale_after` and `verified.by` are guaranteed present, so the agent reads the file\'s own trust state and says the document is past its date.',
          "Then the hook, as the payoff. It runs `--assess` after every file the agent reads and hands back the sentence when the file is past its date. Nobody asked it. This is 2.1's missing arrow, arriving as working software — do not say that out loud; let the slide from 2.1 do it.",
          "`--assess` answers PROCEED, REVIEW or FIX_FILE, and with no prompt configured it speaks the Rule's own intent back. The sentence the agent says is one I wrote and already stand behind.",
          'Say that the instant is supplied. `--now 2026-12-01T00:00:00Z` — "I\'m telling it to pretend it\'s December." That is why `--check` can stay clock-free, and it makes the demo reproducible by anyone in the room afterwards.',
        ],
        visual: 'Live terminal. Show interaction, not architecture.',
        aside:
          'Purpose: establish yourself as a person working on the problem. Adoption is a welcome side effect, not the goal — which frees you to be candid about limits, and candour reads as expertise.',
        diagram: 'demoFlow',
      },
    ],
  },
  {
    id: 'summary',
    number: '4',
    title: 'Summary',
    minutes: 4,
    subsections: [
      {
        id: 'relocated',
        number: '4',
        title: 'Summary',
        thesis:
          'The human work was relocated, not eliminated — out of drafting, into verification and curation.',
        seconds: 240,
        beats: [
          'The four modes, re-scored: one solved, one holding, one split, one amplified.',
          'Put a number on the cost of not doing it. When a documentation reference goes stale, it stays wrong for 4.7 years on average.',
          'Then the number that says why. Of the stale references that eventually got fixed, only 39.1% were fixed by someone updating the documentation. 47.6% resolved because the source code changed again and happened to reintroduce what the docs described. Documentation does not get repaired. It gets accidentally re-aligned.',
          'That is the whole argument in one statistic: if verification is nobody\'s job, it does not happen — the corpus just drifts back into being right occasionally, by luck.',
          'Close on the status note: this is the frontier my team and certain projects are experimenting with, and more will follow.',
          'Soft ask: if you want to try it on a repo, tell me what breaks.',
        ],
        evidence: [
          {
            claim:
              'Average 4.7 years (top1000) and 4.2 years (Google dataset) to fix; 73.6% eventually resolved, of which 47.6% by code returning, 39.1% by documentation edits, 13.3% by deletion',
            source: 'doc-cost',
          },
        ],
        visual: 'The two numbers, large, with attribution.',
        aside:
          'One caveat, if challenged. The study counts only exact-string code-element references appearing in a README or wiki. That is narrow — and the narrowness is what makes it defensible rather than a survey of opinions.',
        diagram: 'staleFate',
      },
    ],
  },
];
