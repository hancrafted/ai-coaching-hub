---
name: offrepo-governance
description: Work delivered outside this repo (Copilot, SharePoint, OneDrive) gets no repo governance — hand over plain copy-paste content
metadata:
  type: feedback
---

> ⚠️ **Reconstructed 2026-09-09 from conversation context after the original file was lost.** The substance is right; the wording is not Han's. Correct or replace it rather than trusting the phrasing.

Deliverables that live outside this repository — GitHub Copilot, SharePoint, OneDrive — are **not** governed by this repo's tooling. Hand them over as plain, copy-pasteable content.

**Why:** Those environments have no `markdown-harness`, no `archgate`, no `npm run verify`. Governance that cannot run is decoration, and frontmatter a target platform ignores is noise that makes the artifact harder for a human to paste and use.

**How to apply:** When output is destined for an off-repo surface, drop the frontmatter, drop the governance scaffolding, and optimise for someone pasting it into a foreign tool. Don't propose harness rules, ADRs, or `verify` wiring for it. See [[copilot-workshop]] for the concrete instance that prompted this.
