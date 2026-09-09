---
name: llm-wiki-deadlines
description: Two hard dates for the LLM-wiki work — workshop 2026-09-10, presentation 2026-09-15 — and the throwaway-acceptable scope framing
metadata:
  type: project
---

Two fixed deadlines drive the `docs/llm-wiki` effort (epic #10):

- **2026-09-10 — workshop.** A trainee sets up their own LLM-wiki using `@hancrafted/markdown-harness`. This repository is the rehearsal path they walk, so what matters is that frontmatter governance works end to end; body prose is irrelevant to it.
- **2026-09-15 — presentation.** Topic is knowledge bases, LLM wikis, and how to create and maintain them. Deliverable is a standalone HTML page or a live repository walkthrough, **explicitly not** an Astro/Starlight build.

**Why:** The presentation is career positioning — Han is making an internal case as a principal AI enablement engineer, so the corpus doubles as evidence he knows how internal knowledge bases are governed. Scope is explicitly **throwaway-acceptable**: ideally reusable long-term, but the dates win over durability.

**How to apply:** Prefer a day-one slice that demos on 2026-09-10 over architecture that only works fully populated. When a decision trades correctness-in-general against being demonstrable on these dates, the dates win — and say so rather than quietly gold-plating. Tuesday's artifact is generated _from_ the corpus, so stub bodies mean empty slides. See [[branching-workflow]] for how the work lands.
