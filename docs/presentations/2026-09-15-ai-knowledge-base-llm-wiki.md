---
type: presentation
title: AI knowledge bases and the LLM wiki
description: Twenty-minute all-hands talk arguing that AI accelerates the rot that has always killed knowledge bases, so governance has to arrive with the knowledge base rather than after it.
tags: [presentation, all-hands, llm-wiki, knowledge-management, context-engineering, governance, ai-enablement]
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
  - id: token-economy-page
    resource: https://github.com/hancrafted/coaching-content/blob/main/ai-token-economy-101/index.html
    title: The AI Token Economy — tower page
generated: { by: claude-code/opus-5, at: 2026-09-09T16:08:48Z }
status: draft
stale_after: 2026-09-16T00:00:00Z
---

# AI knowledge bases and the LLM wiki

**AI all-hands · Tue 2026-09-15 · 20 minutes**

A script, not a deck. It carries the narrative, the timings, what is on screen, and — for every factual beat — the source the claim has to trace to. The rendered artifact is [#18](https://github.com/hancrafted/ai-coaching-hub/issues/18); the rendering format does not change anything below.

Governed by the `presentation` Rule in `markdown-harness.config.yaml`, which is why `sources` above is not decoration: it is the manifest of everything this talk is assembled from, and the trust model only lets a composition draw on documents that are `stable` and `verified`. Two of the four are not yet. This file is `status: draft` and unverified until read — see [Open](#open).

## Core message

> **AI is an accelerator, not a solution.** Acceleration never removes work — it transfers pressure somewhere else. In knowledge work the pressure lands on **context**: where it comes from, and whether you can still trust it.
>
> And here is the part nobody wants to hear: **a knowledge base you build for AI will rot exactly like every knowledge base before AI did.** It goes stale, people get burned by it, they stop trusting it, and once they stop trusting it they stop maintaining it. That spiral predates AI entirely. AI just runs it faster — at both ends.

Sequel to **The AI Token Economy — Why you should treat AI as a Freelancer** [`token-economy-talk`]. That talk asked _how much context can you afford_. This one asks _where does it come from, and can you trust it_.

## Movements

| #   | movement                                 | min      | on screen                 | rests on                      |
| --- | ---------------------------------------- | -------- | ------------------------- | ----------------------------- |
| 1   | The freelancer who remembers nothing     | 1.5      | previous tower page, live | `token-economy-page`          |
| 2   | Context: from "how much" to "where from" | 2.5      | title + one diagram       | —                             |
| 3   | An accelerator, not a solution           | 2.0      | thesis slide              | —                             |
| 4   | Where context comes from                 | 2.5      | options, one per row      | **pending:** [#27], [#29]     |
| 5   | The LLM wiki, as Karpathy proposed it    | 2.5      | quote + the loop          | **pending:** [#28]            |
| 6   | **Knowledge bases have always rotted**   | 3.0      | the spiral                | —                             |
| 7   | So what would you have to enforce?       | 2.5      | three requirements        | `okf-knowledge-bases` (draft) |
| 8   | The harness, prepared                    | 3.0      | recorded terminal         | the repo itself               |
| 9   | A frontier, not a result                 | 1.5      | close                     | —                             |
|     | **total**                                | **21.0** |                           |                               |

One minute over on purpose — see [Cut list](#cut-list).

Three of the nine movements do not yet have a source they can trace to. That is the honest state of the manifest, and it is the same gap `mh --audit` reports about the `story` Rule in movement 8.

---

## 1 · The freelancer who remembers nothing — 1.5 min

**On screen:** the token-economy tower page [`token-economy-page`], live in a browser. Two sections: the freelancer characteristics, and the closing "Start building the context." No slide of my own.

Last time I described a freelancer who is fast, well-read, tireless, accepts any task, asks no questions, and is eager to bill. And who **remembers nothing**.

I closed that talk by telling you to start building the context. Nobody asked me the obvious follow-up: _where do I put it?_

> Showing the old page rather than rebuilding a recap slide is deliberate — it costs no build work, and it proves the previous talk is a durable artifact rather than an event.

---

## 2 · Context: from "how much" to "where from" — 2.5 min

**On screen:** the bridge. One diagram: a context window as a container, with an arrow coming _into_ it from off-frame, and a question mark on the arrow.

The last talk was entirely about the _container_ — how big the window is, what it costs to fill, how the model loses the plot past halfway, when to compact and hand off.

It said almost nothing about what goes **in** it. That arrow is this talk. Context is not a budget you spend; it is **material someone has to produce, and keep true.**

> Do not re-teach the context window. That ground is covered and re-covering it is the specific repetition this talk must avoid.

---

## 3 · An accelerator, not a solution — 2.0 min

**On screen:** the thesis, stated plainly.

AI is an **accelerator, not a solution**. Acceleration does not remove work — it moves the pressure somewhere else.

Speed up writing, and the bottleneck becomes reviewing. Speed up producing knowledge, and the bottleneck becomes **trusting** it. You have not eliminated the work; you have relocated it, usually onto whoever has to decide whether the output is true.

This is the frame for everything that follows. If you take one thing from this talk, take this one.

---

## 4 · Where context comes from — 2.5 min

**On screen:** the options, one per row. Not a comparison matrix — a list of answers people actually reach for.

Four answers in common use: **stuff it in the prompt**, **retrieve it per question (RAG)**, **fine-tune it into the weights**, **maintain a knowledge base**.

RAG is the one worth dwelling on, because it is the default answer and its failure is structural rather than a quality problem: **it re-derives the answer from scratch every time.** Nothing accumulates. No synthesis survives the session that produced it. Ask a related question tomorrow and the work happens again, at full price, with no memory that it was ever done.

**Factual claims — no source in the manifest yet:**

- What context engineering is as a discipline, and what techniques it contains → [#27]
- What RAG is, mechanically, and the compounding limitation → [#29]

Both must land in `docs/llm-wiki/references/`, be promoted, and be added to `sources` above before this movement is deliverable.

---

## 5 · The LLM wiki, as Karpathy proposed it — 2.5 min

**On screen:** the proposal, in his words, then the loop it replaces.

Karpathy's proposal: instead of retrieving fragments per question, have the model **build and maintain a persistent wiki** between your raw sources and your questions. Knowledge gets compiled **once** and kept current, rather than re-derived per query.

The difference is **compounding**, not accuracy. Cross-references, contradictions and synthesis are already written down by the time the question arrives.

**Factual claim — no source in the manifest yet:**

- What Karpathy actually proposed, restated faithfully and cited → [#28]

> Kind boundary: Karpathy's proposal restated is a `reference`, because it is his thinking. My argument built on top of it is a `content-block`. `llm-wiki-block` is the latter and is currently a skeleton.

---

## 6 · Knowledge bases have always rotted — 3.0 min

**On screen:** the spiral. Five nodes in a loop, drawn as a cycle rather than a funnel.

This is the heart of the talk, and it is the part that is not about AI at all.

Every one of you has been in a wiki nobody trusts. A Confluence space where the top result is three years old and confidently wrong. That happened **without AI**, and it happened through a mechanism worth naming:

1. A document is written and it is true.
2. The world moves. The document does not.
3. It keeps asserting the old thing, with exactly the same confidence it had when it was right.
4. Someone acts on it and gets burned.
5. They stop trusting the system. **And once they stop trusting it, they stop maintaining it** — because maintaining something nobody reads is unpaid work.

Then it rots faster, which burns the next person sooner. **It is a spiral, not a decline.**

Now add AI to it. AI accelerates **both ends at once**: far more documents produced far faster, and the rot arriving sooner because there is more surface to go stale. And generated prose is **uniformly confident regardless of whether it is correct** — so the single signal humans used to rely on, "this reads like someone who knew what they were talking about", stops carrying information.

**A knowledge base you cannot trust is worse than none, because you will act on it.**

> This is why I am building `markdown-harness`. Say that here, once, plainly, and then move on — it lands better as a motive than as a pitch.

---

## 7 · So what would you have to enforce? — 2.5 min

**On screen:** three requirements, derived. Not a tool, not a product — three questions any document must answer.

Do not start from a tool. Start from the spiral and ask what would have to be true to break it. Three things:

1. **Provenance** — who produced this, and when? A document with no author is one nobody can judge in three months.
2. **A trust tier** — did a _human_ stand behind this, or did a model write it and nobody check? These are not the same document and they must not look the same.
3. **An expiry** — when do I stop believing this without re-reading it? Not "is it old", but "has the author's own confidence run out".

Those three are exactly what the **Open Knowledge Format** puts in frontmatter, so this is not my invention — it is an existing specification, and the corpus behind this talk conforms to it [`okf-knowledge-bases`].

The subtle one is expiry. The signal lives **in the file**, where anyone opening it meets it — not in a report someone has to remember to run.

> `okf-knowledge-bases` is still `draft` and unverified. It must be promoted before Tuesday — [#26](https://github.com/hancrafted/ai-coaching-hub/issues/26).

---

## 8 · The harness, prepared — 3.0 min

**On screen:** recorded terminal, narrated live. Prepared, not typed in the room.

Four beats, in this order. Each is real and reproducible today.

1. **It answers before the file exists.** `mh --query docs/llm-wiki/stories/anything.md` returns the governing Rule and every requirement _for a file that has never been written_. An agent can ask what is expected of a path instead of being corrected afterwards.
2. **A violation prints your own reasoning back at you.** Remove a required field and the failure carries the Rule's `intent` and the field's `intent` — _why_ the constraint exists, in my words, not just which check fired.
3. **It refuses to let experience wear citations.** The `story` kind **forbids** `sources`. Lived experience can never be dressed up as sourced research, because the corpus rejects it.
4. **It is honest about where it is thin.** `mh --audit` reports the `story` Rule governing **zero** documents — because I do not have that story yet. The tool tells me where my own knowledge base is empty.

Then the point that ties it back: **staleness never fails the build.** A document nine months past its expiry produces zero violations. That is deliberate. The harness validates _form_; the freshness signal is for the reader, in the file. A tool that failed the build on an expired document would just teach everyone to bump the date.

> Beat 4 is the strongest and least expected. A governance demo that admits a gap is more credible than one that shows everything green.
>
> The optional fifth beat, if it survives rehearsal: this script is governed by the same harness, and it is `status: draft` — the talk cannot claim to be verified until I have read it. Only use it if beat 4 landed and there is time.

---

## 9 · A frontier, not a result — 1.5 min

**On screen:** the close. No call to action.

I am not standing here with a solved problem. This is a frontier my team and certain projects are actively experimenting with.

What I am reasonably confident about is the shape of the failure: knowledge bases rot, trust collapses, maintenance stops — and AI accelerates all three. So whatever we build, the governance has to arrive **with** the knowledge base rather than after it.

We will keep you updated.

---

## Cut list

Twenty-one minutes of material for a twenty-minute slot, cut in this order if running long:

1. **Movement 4**, drop fine-tuning and prompt-stuffing, keep only RAG. _(−45s)_
2. **Movement 8**, drop beat 3, the forbidden-sources demo. _(−40s)_
3. **Movement 2**, drop the diagram and say the bridge in one sentence. _(−45s)_

Never cut **movement 6**. It is the talk.

## Open

- **Promotion of this script.** It is `status: draft` with no `verified` block, because promotion is defined as Han's act alone: read it, set `status: stable`, add `verified: { by: human:han, at: <instant> }`. An agent drafting a script and also certifying that a human read it would be the one failure movement 6 exists to warn about — [#26](https://github.com/hancrafted/ai-coaching-hub/issues/26).
- **Two manifest entries are unpromoted drafts.** `okf-knowledge-bases` and `llm-wiki-block` are both `draft` and unverified, and the trust model does not let a composition lean on them — [#26](https://github.com/hancrafted/ai-coaching-hub/issues/26).
- **Three `reference` documents missing from the manifest** — [#27], [#29], [#28]. Movements 4 and 5 are not deliverable until they exist, are promoted, and are added to `sources`.
- **Artifact and recording** — [#18](https://github.com/hancrafted/ai-coaching-hub/issues/18). Marp, tower page, or Astro/Starlight; whether Tuesday's delivery and the YouTube cut are the same artifact.

[#18]: https://github.com/hancrafted/ai-coaching-hub/issues/18
[#26]: https://github.com/hancrafted/ai-coaching-hub/issues/26
[#27]: https://github.com/hancrafted/ai-coaching-hub/issues/27
[#28]: https://github.com/hancrafted/ai-coaching-hub/issues/28
[#29]: https://github.com/hancrafted/ai-coaching-hub/issues/29
