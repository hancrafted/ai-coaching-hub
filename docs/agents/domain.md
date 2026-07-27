# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

This is a **single-context** repo.

## Before exploring, read

- **`CONTEXT.md`** at the repo root — the domain glossary / ubiquitous language.
- **`docs/design-decision/`** — read the design decisions that touch the area you're about to work in.

> Note: This repo also uses **Archgate**, which governs its own Architecture Decision Records under `.archgate/adrs/`. Those are the authoritative, enforced architectural rules. The `docs/design-decision/` folder here is for the lighter-weight design decisions captured by the `/domain-modeling` skill — keep the two distinct.

If any of these files don't exist, **proceed silently**. Don't flag their absence and don't suggest creating them upfront. The `/domain-modeling` skill (reached via `/grill-with-docs` or `/improve-codebase-architecture`) creates them lazily, as terms and decisions actually get resolved.

## File structure

Single-context repo (this repo):

```
/
├── CONTEXT.md
├── docs/design-decision/
│   ├── 0001-example-decision.md
│   └── 0002-another-decision.md
└── src/
```

If this ever grows into a multi-context repo, introduce a `CONTEXT-MAP.md` at the root that points to one `CONTEXT.md` per context, and add context-scoped decisions under `src/<context>/docs/design-decision/`.

## Use the glossary's vocabulary

When output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term defined in `CONTEXT.md`. Don't drift into synonyms the glossary explicitly avoids.

If a concept you need isn't in the glossary yet, add it via `/domain-modeling`.

## Referencing a design decision

When a change contradicts or supersedes an existing decision, reference it by file (e.g. _"Contradicts docs/design-decision/0007-..."_) so the trail stays discoverable.
