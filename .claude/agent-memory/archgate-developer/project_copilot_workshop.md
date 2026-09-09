---
name: copilot-workshop
description: 2026-07-28 Copilot workshop — port the grill-with-docs flow to a single Copilot agent backed by OneDrive/SharePoint folders
metadata:
  type: project
---

> ⚠️ **Reconstructed 2026-09-09 from conversation context after the original file was lost.** Dates and shape are as recorded; detail may be thin. Correct it when next relevant.

A Copilot workshop dated **2026-07-28** required porting this repo's `grill-with-docs` flow to a **single GitHub Copilot agent**, with its context supplied by **OneDrive/SharePoint folders** instead of a git repository.

**Why:** The target audience works in the Microsoft stack, where multi-skill agent orchestration and repo-based context are unavailable — so a flow built from several composable skills had to collapse into one agent with folder-backed context.

**How to apply:** Treat it as the reference case for what has to be given up when a flow leaves this repo: no skill composition, no governance, no `verify`. Deliver plain copy-paste content per [[offrepo-governance]]. Distinct from the [[llm-wiki-deadlines]] workshop on 2026-09-10, which is repo-based and does use the harness.
