# AI knowledge bases and the LLM wiki

**AI all-hands · Tue 2026-09-15 · 20 minutes**

A script, not a deck. It carries the narrative, the timings, what is on screen, and — for every factual beat — the `reference` document the claim has to trace to. The rendered artifact is [#18](https://github.com/hancrafted/ai-coaching-hub/issues/18); the rendering format does not change anything below.

## Core message

> **AI is an accelerator, not a solution.** Acceleration never removes work — it transfers pressure somewhere else. In knowledge work the pressure lands on **context**: where it comes from, and whether you can still trust it.
>
> And here is the part nobody wants to hear: **a knowledge base you build for AI will rot exactly like every knowledge base before AI did.** It goes stale, people get burned by it, they stop trusting it, and once they stop trusting it they stop maintaining it. That spiral predates AI entirely. AI just runs it faster — at both ends.

Sequel to **The AI Token Economy — Why you should treat AI as a Freelancer**. That talk asked _how much context can you afford_. This one asks _where does it come from, and can you trust it_.

## Movements

| #   | movement                                 | min      | on screen                 | rests on                           |
| --- | ---------------------------------------- | -------- | ------------------------- | ---------------------------------- |
| 1   | The freelancer who remembers nothing     | 1.5      | previous tower page, live | —                                  |
| 2   | Context: from "how much" to "where from" | 2.5      | title + one diagram       | —                                  |
| 3   | An accelerator, not a solution           | 2.0      | thesis slide              | —                                  |
| 4   | Where context comes from                 | 2.5      | options, one per row      | **new:** context engineering · RAG |
| 5   | The LLM wiki, as Karpathy proposed it    | 2.5      | quote + the loop          | **new:** Karpathy's proposal       |
| 6   | **Knowledge bases have always rotted**   | 3.0      | the spiral                | —                                  |
| 7   | So what would you have to enforce?       | 2.5      | three requirements        | `aikb-knowledge-bases.md` ✅       |
| 8   | The harness, prepared                    | 3.0      | recorded terminal         | the repo itself                    |
| 9   | A frontier, not a result                 | 1.5      | close                     | —                                  |
|     | **total**                                | **21.0** |                           |                                    |

One minute over on purpose — see [Cut list](#cut-list).

---

## 1 · The freelancer who remembers nothing — 1.5 min

**On screen:** the token-economy tower page, live in a browser. Two sections: the freelancer characteristics, and the closing "Start building the context." No slide of my own.

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

**Factual claims — each needs a `reference` document:**

- What context engineering is as a discipline, and what techniques it contains → **new reference needed**
- What RAG is, mechanically, and the compounding limitation → **new reference needed**

---

## 5 · The LLM wiki, as Karpathy proposed it — 2.5 min

**On screen:** the proposal, in his words, then the loop it replaces.

Karpathy's proposal: instead of retrieving fragments per question, have the model **build and maintain a persistent wiki** between your raw sources and your questions. Knowledge gets compiled **once** and kept current, rather than re-derived per query.

The difference is **compounding**, not accuracy. Cross-references, contradictions and synthesis are already written down by the time the question arrives.

**Factual claim — needs a `reference` document:**

- What Karpathy actually proposed, restated faithfully and cited → **new reference needed**

> Kind boundary: Karpathy's proposal restated is a `reference`, because it is his thinking. My argument built on top of it is a `content-block`. `content-blocks/aikb-llm-wiki.md` is the latter and is currently a skeleton.

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

Those three are exactly what the **Open Knowledge Format** puts in frontmatter, so this is not my invention — it is an existing specification, and the corpus behind this talk conforms to it.

The subtle one is expiry. The signal lives **in the file**, where anyone opening it meets it — not in a report someone has to remember to run.

**Factual claims — reference document already exists:** `references/aikb-knowledge-bases.md` (OKF v0.2, sourced and traceable). **Must be promoted to `stable` before Tuesday** — [#26](https://github.com/hancrafted/ai-coaching-hub/issues/26).

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

- **Artifact and recording** — [#18](https://github.com/hancrafted/ai-coaching-hub/issues/18). Marp, tower page, or Astro/Starlight; whether Tuesday's delivery and the YouTube cut are the same artifact.
- **Three `reference` documents** still to be written, one per factual beat in movements 4 and 5.
- **Promotion** — [#26](https://github.com/hancrafted/ai-coaching-hub/issues/26). Nothing the deck leans on may be an unpromoted draft.
