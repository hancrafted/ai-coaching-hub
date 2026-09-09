---
type: content-block
title: LLM wiki
description: A persistent, LLM-maintained wiki that sits between raw sources and questions, so knowledge is compiled once and kept current rather than re-derived per query.
tags: [llm-wiki, knowledge-management, ai-enablement]
generated: { by: claude-code/opus-5, at: 2026-09-09T09:22:32Z }
status: draft
stale_after: 2026-09-14T00:00:00Z
---

# LLM wiki

Skeleton only — sections are placeholders carrying their point, awaiting real content.

---

## An LLM wiki is a persistent artifact, not a retrieval trick

The wiki is a structured, interlinked set of markdown files that an agent builds and maintains between your raw sources and your questions.

---

## It exists because RAG rediscovers everything on every question

Retrieval-augmented generation re-derives its answer from scratch each time, so nothing accumulates and no synthesis survives the session that produced it.

---

## The difference is compounding, not accuracy

Cross-references, contradictions and synthesis are already present in the wiki when the question arrives, because they were written down when the source was ingested.

---

## Setting one up is three layers and three operations

Raw sources stay immutable, the wiki holds generated pages, and a schema document tells the agent the conventions — with ingest, query and lint as the operations over them.

---

## The quirks are where the pattern actually fails

Volume outruns review, generated prose is uniformly confident regardless of correctness, and a passing lint check gets misread as evidence the content is still true.

---

## Governing one is the part nobody demos

Attribution that separates drafting from vouching, an expiry the author chooses, and agents that draft while humans promote are what arrest decay — and all three are friction by design.
