# ai-coaching-hub — Agent Guide

This repo contains publically available coaching content from Han.

## Rules

1. Do not auto-include yourself in the commit message.

## Commits

1. **Commits** Make atomic commits using Conventional Commits v1.1.0 format `[feat, fix, docs, refactor, chore](scope): <short summary in present tense>`
2. **Commit Body** Use the optional commit body to explain the why and how of the change (not the what)by using the Keep a Changelog v1.1.0 categories (Added, Changed, Deprecated, Removed, Fixed, Security) to clearly group the impacts.
3. **Commit Scope** Keep changes scoped to the domain you are working on.
4. **Commit Trail** Use `Source: [URL to Github Issue] | [Prompt causing commit]` at the end of commit body, to make tracing back easy.

Example

```
doc(README): align root README.md with the agent skills documentation

## Changed
- Update `README.md` to align with the agent skills documentation.
```

## Agent skills

### Issue tracker

Issues and PRDs are tracked in this repo's **GitHub Issues** via the `gh` CLI. External PRs are **not** treated as a triage request surface. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role triage vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

**Single-context** repo: `CONTEXT.md` at the root, with design decisions under `docs/design-decision/` (Archgate owns its own ADRs under `.archgate/adrs/`). See `docs/agents/domain.md`.
