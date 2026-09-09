---
type: agents-md
title: AI Coaching Hub Agent Guide
---

# ai-coaching-hub — Agent Guide

This repo contains publically available coaching content from Han.

## Rules

1. Do not auto-include yourself in the commit message.

## Commits

1. **Commits** Make atomic commits using Conventional Commits v1.1.0 format `[feat, fix, docs, refactor, chore](scope): <short summary in present tense>`
2. **Commit Body** Use the optional commit body to explain the why and how of the change (not the what)by using the Keep a Changelog v1.1.0 categories (Added, Changed, Deprecated, Removed, Fixed, Security) to clearly group the impacts.
3. **Commit Scope** Keep changes scoped to the domain you are working on.
4. **Commit Trail** Use `Source: [URL to Github Issue] | [Prompt causing commit]` at the end of commit body, to make tracing back easy.
5. **Commit Identity** The repo's configured git identity is already correct — commit without overriding `user.name` / `user.email` or passing `--author`. This is a public, personal repo, so the work email carried in the global agent context is not this repo's identity.

Example

```
doc(README): align root README.md with the agent skills documentation

## Changed
- Update `README.md` to align with the agent skills documentation.
```

## Branches

1. **Map branch** An epic gets one integration branch, `map/<issue>-<slug>` (e.g. `map/10-llm-wiki`), cut from `origin/main`. It opens a single PR to `main` once the epic completes, so `main` sees the epic as one reviewable unit instead of a trickle of ticket commits.
2. **Ticket branch** Each sub-ticket branches off the map as `<wayfinder-type>/<issue>-<slug>` (e.g. `task/12-tracer-content-block`), matching its `wayfinder:<type>` label, and merges back into the map. Open it with `gh pr create --base <map-branch>` — the default base is wrong here.
3. **Guardrail** `main` takes no direct commits. After cutting a map branch run `git branch --unset-upstream` if git auto-tracked `origin/main`, or a stray `git push` lands on `main`.
4. **Recovery** When a commit has already landed on an unpushed `main`, move it rather than revert it: `git branch <ticket-branch> <sha>` so the commit stays referenced, then `git reset --hard origin/main`. No revert commit, nothing lost.

## Agent skills

### Issue tracker

Issues and PRDs are tracked in this repo's **GitHub Issues** via the `gh` CLI. External PRs are **not** treated as a triage request surface. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role triage vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Grilling rounds

Every grilling round — `/grill-me`, `/grill-with-docs`, or the grilling Wayfinder runs while charting a map or resolving a `wayfinder:grilling` ticket — uses this repo's round format, which overrides the grilling skill's own. See `docs/agents/grilling-format.md`.

### Domain docs

**Single-context** repo: `CONTEXT.md` at the root, with design decisions under `docs/design-decision/`. See `docs/agents/domain.md`.
