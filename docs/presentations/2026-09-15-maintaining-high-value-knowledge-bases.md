---
type: presentation
title: Maintaining High Value Knowledge Bases
description: All-hands talk scoring four pre-AI knowledge-base failure modes against what AI actually changed — one solved, one collapsing, one split, and maintenance amplified.
tags: [presentation, all-hands, knowledge-management, knowledge-bases, markdown-harness, okf, ai-enablement]
sources:
  - id: okf-knowledge-bases
    resource: docs/llm-wiki/references/aikb-knowledge-bases.md
    title: Knowledge bases in the Open Knowledge Format
  - id: llm-wiki-block
    resource: docs/llm-wiki/content-blocks/aikb-llm-wiki.md
    title: LLM wiki
  - id: token-economy-talk
    resource: https://www.youtube.com/watch?v=S0Nx4faEebY
    title: The AI Token Economy — Why you should treat AI as a Freelancer (recording)
  - id: harness-readme
    resource: https://github.com/hancrafted/markdown-harness#readme
    title: markdown-harness — README, v0.0.1
generated: { by: claude-code/opus-5, at: 2026-09-09T16:08:48Z }
status: draft
stale_after: 2026-09-16T00:00:00Z
---

# Maintaining High Value Knowledge Bases

**AI all-hands · Tue 2026-09-15 · 20-minute slot**

_Content-first agenda. Times indicative. Intro slide handled separately._

4 + 10 + 6 + 3 = **23 minutes of content against a 20-minute slot**, before the intro slide. See [Trim order](#trim-order-if-long).

Governed by the `presentation` Rule in `markdown-harness.config.yaml`. `sources` above is the manifest of what this talk is assembled from; `status: draft` and unverified until read. Claims with nothing behind them yet are collected at the [end](#claims-with-no-source-yet).

---

## 1. What is a knowledge base — recap (~4 min)

### 1.1 Knowledge management in one pass

- Capture, curate, retrieve, trust — trust being the one nobody budgets for

### 1.2 The pre-AI situation

- Wikis, Confluence graveyards, tribal knowledge
- Everyone in the room has abandoned a wiki; name it out loud

### 1.3 Why it was always hard — four failure modes

1. **Individual protectionism** — knowledge as personal USP
2. **Non-paid work for domain champions** — writing is nobody's job
3. **Low discoverability and trust verification**
4. **Low initial cost, high maintenance cost** — the living-document problem

> _Purpose: get these four named and agreed. Section 2 re-scores them in this exact order._

---

## 2. What has changed with AI (~10 min)

### 2.1 The amnesiac freelancer _(ease-in, no jargon)_

- It's their first day. Every day is their first day. _(metaphor carried from [`token-economy-talk`])_
- To put them to work they need tools and context. "It's in the manual on Confluence" is you directing them to retrieve.
- **Two side-by-side panels:** human freelancer and agent, same context arrow — but the human panel has a feedback arrow back ("this page is wrong"). The agent panel doesn't.
- The missing arrow is the talk. A real freelancer notices the mess and complains. Yours arrives fresh every time, never complains, never learns page three is stale.

### 2.2 The triage — walking the four failure modes in order

| Failure mode            | Before                                           | With AI                                       | Verdict        |
| ----------------------- | ------------------------------------------------ | --------------------------------------------- | -------------- |
| Protectionism           | Knowing the undocumented system was job security | Moat holds only where training data is thin   | **Collapsing** |
| Champion tax            | Unpaid work nobody had time for                  | Drafting is nearly free                       | **Solved**     |
| Discoverability + trust | Couldn't find the page                           | Retrieval finds it; nothing says if it's true | **Split**      |
| Maintenance cost        | Docs rotted, updating was manual                 | Generation outpaces verification              | **Amplified**  |

- _Protectionism:_ COBOL and legacy mainframe still defensible; full-stack web already gone. **AI doesn't dissolve knowledge moats, it dissolves the ones it has training data for.** The moat has a shelf life.
- _Champion tax:_ the one clean win. Say so — it buys credibility for the rest.
- _Discoverability:_ solved. _Trust verification:_ amplified.
- _Maintenance:_ more volume, rotting faster. The expensive one.

### 2.3 State of the art (compressible)

- **RAG** — semantic search over chunks, fragments into the prompt. Buys discoverability. Buys no judgment about currency or truth.
- **LLM-wiki** — documents structured for machine reading from the start: frontmatter, explicit sources, navigable shape. Standardised now, not experimental. [`llm-wiki-block`], [`okf-knowledge-bases`]
- Name the drift modes: citation drift, structure drift, source drift.

> _Purpose: they should leave believing exactly one thing is still open, and it's the expensive one. Beats 3 and 4 of the triage hand straight into section 3 — no transition needed._

---

## 3. How to address the failure modes (~6 min)

### 3.1 The requirement, derived — not "here's my tool"

- Structure is mechanically checkable. Meaning is not. You need both in one pass or nothing runs in CI.

### 3.2 What the harness is

- A config-based linter. Per path or glob, declare which frontmatter fields must exist and their constraints (allowed lists, limits).
- Built on the Google OKF standard [`okf-knowledge-bases`] — enforces it, and governs fields beyond it.
- Every field constraint carries an **intent string**: when a check fails, the failure is a signal the agent can act on to fix it.

### 3.3 What it does not do — state this plainly

- It does not judge truth. No deterministic check can, and it isn't trying to.
- What it does: enforces that trust metadata **exists and is well-formed**, then makes unverified-ness visible.
- OKF fields like `stale_after`, `verified.by` and `status` become trustable signals — trustable precisely because the harness guarantees they are present and pinned rather than optional and freeform.
- **The harness is not in the read path, and that is the design.** An agent that opens a governed file in December sees that `stale_after` has passed _without running the harness at all_ [`harness-readme`]. Keeping the fields present and true is the job; being in the read path is not. Freshness deliberately never fails the build — a tool that failed CI on an expired document would only teach everyone to bump the date.
- **Verification remains a human job.** AI can pre-judge and ease it, not own it.
- This is also the answer to "who writes the semantic rules?" — nobody. You write field constraints and intent strings. No semantic graders to author or maintain.

### 3.4 The demo

- Prepared repo, one file containing a simple outdated fact.
- Claude Code session, same query, twice: **governed file and ungoverned file** — not "harness on / harness off".
- Ungoverned, the file carries no trust metadata to read, so the agent answers from the stale fact with full confidence. Governed, `stale_after` and `verified.by` are guaranteed present, the agent reads them itself and says the file is stale and offers to revisit.
- The agent makes your argument for you.
- Show the interaction, not the architecture.

> _Purpose: establish yourself as the person working on this problem. Adoption is a welcome side effect, not the goal — which frees you to be candid about limits, and candour reads as expertise._

---

## 4. Summary (~3 min)

- Human work **relocated, not eliminated** — from drafting to verification and curation
- The four failure modes re-scored: one solved, one collapsing, one split, one amplified
- Soft ask: if you want to try it on a repo, tell me what breaks

---

## Trim order if long

1. **2.3 state of the art** → one sentence that the pattern is standardised
2. **Section 1 recap** → four modes read off one slide
3. **RAG** → one line

**Never cut:** 2.1 (the ease-in the audience needs), 2.2 (the argument), 3.4 (the proof).

## Held for Q&A

- Full harness internals — separate session
- Which internal domains sit in collapsing vs protected — invites speculation you don't need on stage

## Open gaps for the implementation session

- **Demo fallback** — 3.4 is a live Claude Code session; needs a recorded run or screenshots. A stale-fact demo that silently works is worse than no demo.
- **Section 4 has no numbers** — if you have a figure on doc rot or verification lag, that's where it earns its place.

## Claims with no source yet

Not blockers, but each is assertable from the stage and nothing in `sources` backs it:

- **2.2, the moat claim** — "COBOL and legacy mainframe still defensible; full-stack web already gone." The most challengeable line in the talk and the one an engineer will push on. Either ground it or soften it to a hypothesis offered as your own read.
- **2.3, RAG mechanics** — [#29](https://github.com/hancrafted/ai-coaching-hub/issues/29).
- **2.3, the three drift modes** — citation, structure, source drift. No ticket exists for these.
- **2.3, "standardised now, not experimental"** — [`okf-knowledge-bases`] carries this, but it is still `draft` and unverified — [#26](https://github.com/hancrafted/ai-coaching-hub/issues/26).

## Corrections applied to the posted agenda

Three factual changes, all in section 3, all checked against the shipped tool rather than assumed:

1. **"Assess mode evaluates them at read time" — removed.** No such mode exists in `@hancrafted/markdown-harness@0.0.1`; the CLI is `--check`, `--query`, `--audit`, `--help`. The README states the opposite position deliberately: the signal lives in the file and the agent reads it _without running the harness_ [`harness-readme`]. 3.3 now says that instead, which is both true and a stronger claim.
2. **`verified_by` → `verified.by`.** The field is a mapping, `verified: { by, at }`. The underscore form would not resolve against this repository's own config.
3. **"existence and freshness of trust metadata" → "exists and is well-formed".** The harness never consults a clock; freshness is deliberately unenforced.
