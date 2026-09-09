---
type: presentation
title: Maintaining High Value Knowledge Bases
description: All-hands talk scoring four pre-AI knowledge-base failure modes against what AI actually changed — one solved, one holding, one split, maintenance amplified.
tags: [presentation, all-hands, knowledge-management, knowledge-bases, markdown-harness, okf, ai-enablement]
sources:
  - id: doc-cost
    resource: docs/llm-wiki/references/aikb-documentation-cost.md
    title: The measured cost of documentation rot
  - id: doc-drift
    resource: docs/llm-wiki/references/aikb-documentation-drift.md
    title: Established names for documentation drift
  - id: knowledge-moats
    resource: docs/llm-wiki/references/aikb-knowledge-moats.md
    title: Do AI knowledge moats track training-data density
  - id: okf-knowledge-bases
    resource: docs/llm-wiki/references/aikb-knowledge-bases.md
    title: Knowledge bases in Open Knowledge Format
  - id: rag
    resource: docs/llm-wiki/references/aikb-retrieval-augmented-generation.md
    title: Retrieval-augmented generation
  - id: docs-standards
    resource: docs/llm-wiki/references/aikb-structured-docs-standards.md
    title: Is machine-readable documentation standardised
  - id: token-economy-talk
    resource: https://www.youtube.com/watch?v=S0Nx4faEebY
    title: AI Token Economy — Why you treat AI as a Freelancer (recording)
  - id: harness-readme
    resource: https://github.com/hancrafted/markdown-harness#readme
    title: markdown-harness — README, v0.0.4
generated: { by: claude-code/opus-5, at: 2026-09-09T21:40:00Z }
status: draft
stale_after: 2026-09-16T00:00:00Z
---

# Maintaining High Value Knowledge Bases

**AI all-hands · Tue 2026-09-15 · 20-minute slot, 20–30 tolerated**

_Final content definition. Each section carries its **thesis** — the sentence a renderer lifts verbatim — then beats, evidence, a visual note and a time budget. Visual design is #38; trimming is after, not now._

4 + 11 + 7 + 4 = **26 minutes**, inside the tolerated envelope and above the 20–23 aim. Cut points are marked per section under [Trim order](#trim-order-if-long) rather than applied.

Governed by the `presentation` Rule in `markdown-harness.config.yaml`. `sources` above is cited-only: every document listed is cited somewhere below, and every claim below traces to one. `status: draft` until read — see [Promotion checklist](#promotion-checklist).

---

## 1. What is a knowledge base — recap (~4 min)

### 1.1 Knowledge management in one pass

**Thesis.** A knowledge base has four jobs — capture, curate, retrieve, trust — and only the first three ever get budgeted.

**Beats**

- Name the four. Move fast; this is orientation, not content.
- Trust is the one nobody staffs, and it is the only one this talk is about.

**Visual** — four labels, the fourth unfilled.

**Time** — ~40s

### 1.2 The pre-AI situation

**Thesis.** Everyone in this room has abandoned a wiki, and none of us thought that was our fault.

**Beats**

- Wikis, Confluence graveyards, tribal knowledge.
- Ask for hands. Name it out loud — the shared failure is the permission to be blunt for the next twenty minutes.

**Visual** — none. This beat is spoken.

**Time** — ~50s

### 1.3 Why it was always hard — four failure modes

**Thesis.** Documentation rot is not folklore about bad teams: 82.3% of the top thousand open-source projects have carried outdated documentation at some point in their history.

**Beats**

1. **Individual protectionism** — knowledge as personal USP
2. **Non-paid work for domain champions** — writing is nobody's job
3. **Low discoverability, and no verification of trust**
4. **Low initial cost, high maintenance cost** — the living-document problem

- These four are the scoring rubric. Section 2 re-scores them in this exact order.
- Land the number here so the rubric arrives as measurement rather than opinion.

**Evidence** — 82.3% (658/800) of top-1000 GitHub projects contained at least one outdated code-element reference at some point in their history [`doc-cost`]

**Visual** — the four modes on one slide, numbered. The 82.3% figure beside them with its attribution line.

**Time** — ~2m30

---

## 2. What has changed with AI (~11 min)

### 2.1 The amnesiac freelancer _(ease-in, no jargon)_

**Thesis.** You have hired a brilliant freelancer whose first day is every day.

**Beats**

- The metaphor, carried over from the token-economy talk [`token-economy-talk`].
- To do any work they need tools and context. "It's in the manual on Confluence" is you directing retrieval.
- **Two side-by-side panels.** Human freelancer and agent, same context arrow in. The human panel has a second arrow coming back — _"this page is wrong."_ The agent panel does not.

> _Plant the missing arrow and say nothing about it. No forward reference. It gets picked up in 3.4 by people who were paying attention, and that is worth more than signposting._

**Visual** — **the single most important image in the talk.** The absence in the right-hand panel must read as absence, not as less ink — the eye should go looking for the arrow and fail to find it. Spec is #38.

**Time** — ~2m

### 2.2 The triage — walking the four failure modes in order

**Thesis.** Of the four, AI solved one outright, left one standing, split one down the middle, and made the last one worse.

| Failure mode            | Before                                       | With AI                                              | Verdict       |
| ----------------------- | -------------------------------------------- | ---------------------------------------------------- | ------------- |
| Protectionism           | Knowing the undocumented system was security | Data density predicts snippet skill, not engineering | **Holding**   |
| Champion tax            | Unpaid work nobody had time for              | Drafting is nearly free                              | **Solved**    |
| Discoverability + trust | Couldn't find the page                       | Retrieval finds it; nothing says if it's true        | **Split**     |
| Maintenance cost        | Docs rotted, updating was manual             | Generation outpaces verification                     | **Amplified** |

**Beats**

- _Champion tax — take the clean win first._ Drafting is nearly free. Say it plainly; it buys credibility for the three that follow.
- _Protectionism — the contrarian one._ The intuitive story is that AI dissolves moats wherever it has training data. That story is wrong, and the data says so in both directions.
  - COBOL confirms it: absent from The Stack's 30-language table entirely, and GPT-4 manages 15.75 pass@1 on COBOLEval. No data, no capability, moat holds.
  - JavaScript and TypeScript refute it: together 617 GB against Python's 191 GB, the best-represented languages in the corpus — and on real repository issues they finish last and second-to-last of seven.
  - The researchers do not attribute that to data scarcity. They reserve that explanation for C/C++ and attribute the JS/TS result to language and tooling properties. **The mechanism is not the one the moat story assumes.**
  - So: density predicts how well a model writes a snippet. It does not predict whether it can resolve an issue in your repository. Your moat is not where the training data isn't — it's where the work is repo-shaped.
- _Discoverability + trust — the split._ Discoverability: solved. Verification of trust: amplified. One row, two opposite verdicts, and that is the hinge of the whole talk.
- _Maintenance — the expensive one._ More volume, rotting faster. Everything in section 3 exists for this row.

**Evidence**

- COBOL absent from The Stack's per-language table; GPT-4 at 15.75 and GPT-4o at 16.40 pass@1 on COBOLEval [`knowledge-moats`]
- JS 486 GB + TS 131 GB vs Python 191 GB in The Stack [`knowledge-moats`]
- Multi-SWE-bench, 1,632 human-validated GitHub issues across seven languages, Claude-3.7-Sonnet: Python 45.80%, Java 23.44%, TypeScript 11.16%, JavaScript 4.78%. The paper's own words: _"TS and JS consistently yield the lowest resolved rates."_ [`knowledge-moats`]

**Visual** — two assets. The triage table built up one row at a time, with the Holding row weighted rather than given an equal quarter. Plus a chart of the moat inversion: corpus size against issue-resolution rate, so the two data-richest languages are visibly at the bottom. Spec is #38, now three assets rather than two.

**Time** — ~5m30

> _Retired here as refuted: "AI doesn't dissolve knowledge moats, it dissolves the ones there's training data for", and "COBOL and legacy mainframe still defensible; full-stack web already gone." The COBOL half stands. The web half runs backwards._

### 2.3 State of the art

**Thesis.** Retrieval got solved, structure is converging, and neither of them tells you whether what you just read is still true.

**Beats**

- **RAG** — semantic search over chunks, fragments into the prompt. Buys discoverability outright. Buys no judgment about currency or truth, and this is not an opinion about implementations: the scoring step is an inner product between two embeddings, and there is no third term for age, origin or verification.
  - The RAG paper's own hot-swap experiment measures exactly what that costs. One fixed model, 82 world leaders whose posts changed between 2016 and 2018. Matched to the right-era index: 70% and 68%. Matched to the wrong-era index: **12% and 4%.** Nothing in the model noticed its index was stale. A person had to know, and swap it.
- **LLM wiki** — documents structured for machine reading from the start: frontmatter, explicit sources, navigable shape. **Converging, not standardised** — and the distinction matters because I am about to show you a tool built on one of these.
  - Say the age out loud. Open Knowledge Format is 29 days old, six commits, one contributor, no releases, and its own spec says there is "no schema registry, no central authority, and no required tooling."
  - llms.txt still calls itself a proposal after two years. MCP has a named owner under the Linux Foundation and is still not a ratified standard. AGENTS.md has the widest adoption — 60,000+ repositories — and makes the smallest standardisation claim of any of them.
  - What actually crossing that line looks like: Dublin Core went 1995 workshop → RFC 2413 in 1998 → ANSI/NISO Z39.85 → ISO 15836. Years, under a named body.
  - So the honest word is **converging on a shape**. I bet on OKF anyway, and section 3 says why that bet is cheap.
- **Name the drift modes, and get the names right.**
  - **Link rot** and **content drift** are the two halves of _reference rot_, named in the scholarly-citation literature in 2014. The target is gone; or the target quietly changed underneath you.
  - **Structure drift** — a governed document's own frontmatter eroding over time — is my term. No literature names it. I am flagging that rather than smuggling it.
  - I am _not_ calling any of this "citation drift": that name is already taken, in this exact AI space, for LLMs fabricating references mid-conversation.

**Evidence**

- Lewis et al. 2020 hot-swap: 70%/68% right-era, 12%/4% wrong-era, 82 world leaders [`rag`]
- OKF repo created 2026-08-11, six commits, one contributor, no releases; spec text on no central authority [`docs-standards`]
- Dublin Core 1995 → RFC 2413 → Z39.85 → ISO 15836 [`docs-standards`]
- Reference rot, link rot and content drift as defined by Klein et al. 2014; "citation drift" claimed by a 2025 workshop paper for LLM reference fabrication [`doc-drift`]

**Visual** — one number slide for the hot-swap figures. The rest is spoken.

**Time** — ~3m30

> _Purpose: the room should leave section 2 believing exactly one thing is still open, and that it's the expensive one. Beats 3 and 4 of the triage hand straight into section 3 — no transition needed._

---

## 3. How to address the failure modes (~7 min)

### 3.1 The requirement, derived — not "here's my tool"

**Thesis.** Structure is mechanically checkable and meaning is not, so you need both in one pass and nothing runs in CI today.

**Beats**

- Derive the requirement from section 2's open row before naming anything you built. The tool has to look like the answer to a question the room already has.

**Visual** — none.

**Time** — ~40s

### 3.2 What the harness is

**Thesis.** It is a config-based linter for frontmatter, and it does not know what OKF is.

**Beats**

- Per path glob, declare which frontmatter fields must exist and what constrains them — allowed value sets, length limits, formats.
- **Nothing in the config language privileges OKF.** It expresses any frontmatter vocabulary you want. My config happens to be OKF-shaped because I wrote it that way, and that hand-written config is the proof of the claim.
- Every field constraint carries an **intent string**. When a check fails, the failure is a signal an agent can act on, in my words, not a rule number.

**Evidence** — OKF's own field set: `type`, `sources`, `status`, `stale_after`, `verified` [`okf-knowledge-bases`]; config contract and command surface [`harness-readme`]

**Visual** — one config excerpt, four lines, with an `intent` string visible.

**Time** — ~1m20

> _Retired here: "built on the Google OKF standard." The word `standard` is wrong twice over — OKF is a format, not a standard, and the harness is not built on it._

### 3.3 What it does not do — state this plainly

**Thesis.** It does not judge truth, and no deterministic check can, so it does not try.

**Beats**

- What it does instead: enforces that trust metadata **exists and is well-formed**, which makes unverified-ness visible.
- `stale_after`, `verified.by` and `status` become trustable signals precisely because the harness guarantees they are present and pinned rather than optional freeform.
- **The harness is not in the read path, and that is the design.** An agent that opens a governed file in December sees `stale_after` has passed without running anything at all. Keeping those fields present and true is the job; being in the read path is not [`harness-readme`].
- `--assess` amplifies that signal at run time — **it is never the only way to reach it.** Both halves are true and the second does not weaken the first.
- **Freshness deliberately never fails the build.** `--check` is clock-free so a corpus cannot go red overnight on a tree nobody touched. A tool that failed CI on an expired document would only teach everyone to bump the date.
- **Verification remains a human job.** AI can pre-judge it and make it cheaper. It cannot own it.
- This also answers "who writes the semantic rules?" — nobody does. You write field constraints and intent strings. There are no semantic graders to author or maintain.

**Visual** — none. This section is you talking straight at the room.

**Time** — ~2m

### 3.4 The demo

**Thesis.** The agent makes the argument for me.

**Beats**

1. **A/B first.** Same query, twice: against a governed file and an ungoverned one — _not_ "harness on / harness off". Ungoverned, the agent answers a stale fact with full confidence. Governed, `stale_after` and `verified.by` are guaranteed present, so the agent reads the file's own trust state and says the document is past its date.
2. **Then the hook, as the payoff.** It runs `--assess` after every file the agent reads and hands back the sentence when the file is past its date. Nobody asked it. **This is 2.1's missing arrow, arriving as working software** — do not say that out loud; let the slide from 2.1 do it.
3. `--assess` answers `PROCEED`, `REVIEW` or `FIX_FILE`, and with no prompt configured it speaks the Rule's own `intent` back. The sentence the agent says is one I wrote and already stand behind.
4. **Say that the instant is supplied.** `--now 2026-12-01T00:00:00Z` — "I'm telling it to pretend it's December." That is why `--check` can stay clock-free, and it makes the demo reproducible by anyone in the room afterwards.

**Demo material** — `aikb-llm-wiki.md` carries `stale_after: 2026-09-14`, so it is genuinely expired on the day with no flag passed. That is not staged: the file says of itself that it is a skeleton awaiting real content, and it is the one corpus document this talk deliberately does **not** cite. Then `--now` against a fresh reference shows the instant is a parameter rather than a clock.

**Visual** — live terminal. Show interaction, not architecture.

**Time** — ~3m

> _Purpose: establish yourself as a person working on the problem. Adoption is a welcome side effect, not the goal — which frees you to be candid about limits, and candour reads as expertise._

---

## 4. Summary (~4 min)

**Thesis.** The human work was relocated, not eliminated — out of drafting, into verification and curation.

**Beats**

- The four modes, re-scored: **one solved, one holding, one split, one amplified.**
- Put a number on the cost of not doing it. When a documentation reference goes stale, it stays wrong for **4.7 years on average.**
- Then the number that says why. Of the stale references that eventually got fixed, only 39.1% were fixed by someone updating the documentation. **47.6% resolved because the source code changed again and happened to reintroduce what the docs described.** Documentation does not get repaired. It gets accidentally re-aligned.
- That is the whole argument in one statistic: if verification is nobody's job, it does not happen — the corpus just drifts back into being right occasionally, by luck.
- Close on the status note: this is the frontier my team and certain projects are experimenting with, and more will follow.
- Soft ask: if you want to try it on a repo, tell me what breaks.

**Evidence** — average 4.7 years (top1000) and 4.2 years (Google dataset) to fix; 73.6% eventually resolved, of which 47.6% by code returning, 39.1% by documentation edits, 13.3% by deletion [`doc-cost`]

**One caveat, if challenged.** The study counts only exact-string code-element references appearing in a README or wiki. That is narrow — and the narrowness is what makes it defensible rather than a survey of opinions.

**Visual** — the two numbers, large, with attribution.

**Time** — ~4m

---

## Trim order if long

Content is finalised at 26 minutes against a 20–30 envelope. Cut points, in order, if the room needs 20:

1. **2.3, the standards landscape** → drop llms.txt, MCP and Dublin Core; keep "converging, not standardised" and the OKF age. Saves ~60s.
2. **1.3** → four modes read off one slide, 82.3% spoken without dwelling. Saves ~45s.
3. **2.3, RAG** → drop the mechanism explanation, keep the hot-swap numbers. Saves ~40s.
4. **3.4** → A/B only, hook described rather than run. Saves ~60s. **Last resort** — this is the section that converts.

**Never cut:** 2.1 (the ease-in the audience needs), 2.2 (the argument), 3.4's hook if it is still in (the proof).

## Held for Q&A

- Full harness internals — a separate session
- Which internal domains sit in holding vs collapsed — invites speculation you don't need on stage
- Why not JSON Schema, Astro collections, remark-lint — answer exists, costs three minutes
- The OKF Preset — it is not shipped; the config is hand-written. See [markdown-harness#84](https://github.com/hancrafted/markdown-harness/issues/84)

## Promotion checklist

`status: draft` on any document below means the deck leans on something unread. Promotion is Han's act alone: read it, set `status: stable`, add `verified: { by: human:han, at: <instant> }`, and lengthen `stale_after` as the horizon is earned.

| document                                            | needed for      |
| --------------------------------------------------- | --------------- |
| `references/aikb-documentation-cost.md`             | §1.3, §4        |
| `references/aikb-knowledge-moats.md`                | §2.2            |
| `references/aikb-retrieval-augmented-generation.md` | §2.3            |
| `references/aikb-structured-docs-standards.md`      | §2.3            |
| `references/aikb-documentation-drift.md`            | §2.3            |
| `references/aikb-knowledge-bases.md`                | §3.2            |
| this script                                         | delivered aloud |

`content-blocks/aikb-llm-wiki.md` is **deliberately excluded.** It is a skeleton, it stays `draft`, it is cited nowhere, and it is the 3.4 demo file.

## Claims with no source yet

**None.** Every claim in this script traces to a document in `sources`. The four questions this section carried on 2026-09-09 — the moat claim, RAG mechanics, the three drift modes, and the standardisation claim — were answered by #34, #29, #35 and #36 respectively. Two came back refuted and are recorded under corrections below.

## Open gaps

- **Demo fallback** — 3.4 is a live Claude Code session and there is no recorded run behind it. A stale-fact demo that silently works is worse than no demo. Needs a rehearsal slot, not a to-do.
- **Rehearsal against the clock** — 26 minutes is estimated, not measured.

## Corrections applied to the posted agenda

Each entry is stamped with the version it was checked against, because one of them has already been overtaken.

1. **"Assess mode evaluates them at read time" — removed, then reinstated.** _(true at `0.0.1`, false from `0.0.3`.)_ No such mode existed in `@hancrafted/markdown-harness@0.0.1`; the CLI was `--check`, `--query`, `--audit`, `--help`. As of `0.0.4` there are four commands and `--assess` is one of them. 3.3 now carries both halves: the signal lives in the file, and `--assess` amplifies it at run time.
2. **`verified_by` → `verified.by`.** _(`0.0.1`, still true at `0.0.4`.)_ The field is a mapping, `verified: { by, at }`. The underscore form does not resolve.
3. **"Built on the Google OKF standard" — removed.** _(`0.0.4`.)_ Wrong twice: OKF is a format rather than a standard, and nothing in the config language privileges it. Replaced in 3.2 with the format-agnostic claim, evidenced by the hand-written config.
4. **"Standardised now, not experimental" → "converging."** _(`0.0.4`, per #36.)_ Nothing in the landscape has crossed the line into standardisation, including OKF.
5. **"COBOL still defensible; full-stack web already gone" — half refuted.** _(per #34.)_ The COBOL half holds. The web half inverts, and the mechanism the claim assumed is not the mechanism the researchers found.
6. **"Citation drift" — dropped.** _(per #35.)_ The name is already claimed for LLM reference fabrication. Link rot and content drift are the established terms; structure drift is flagged as my own.
