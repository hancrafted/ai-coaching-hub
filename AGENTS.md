---
type: agents-md
title: AI Coaching Hub Agent Guide
---

# ai-coaching-hub — Agent Guide

This repo contains publically available coaching content from Han.

## Branches

1. **Map branch** An epic gets one integration branch, `map/<issue>-<slug>` (e.g. `map/10-llm-wiki`), cut from `origin/main`. It opens a single PR to `main` once the epic completes, so `main` sees the epic as one reviewable unit instead of a trickle of ticket commits.
2. **Ticket branch** Each sub-ticket branches off the map as `<wayfinder-type>/<issue>-<slug>` (e.g. `task/12-tracer-content-block`), matching its `wayfinder:<type>` label, and merges back into the map. Open it with `gh pr create --base <map-branch>` — the default base is wrong here.
3. **Closure** Every PR body ends with `Closes #<n>`. Only a merge into `main` fires the keyword, so the map PR closes its epic while a ticket PR merely links its ticket — close that one by hand with `gh issue close <n>` once the PR merges.
4. **Guardrail** `main` takes no direct commits. After cutting a map branch run `git branch --unset-upstream` if git auto-tracked `origin/main`, or a stray `git push` lands on `main`.
5. **Recovery** When a commit has already landed on an unpushed `main`, move it rather than revert it: `git branch <ticket-branch> <sha>` so the commit stays referenced, then `git reset --hard origin/main`. No revert commit, nothing lost.

## Agent skills

### Issue tracker

Issues and PRDs are tracked in this repo's **GitHub Issues** via the `gh` CLI. External PRs are **not** treated as a triage request surface. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role triage vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Grilling rounds

Every grilling round — `/grill-me`, `/grill-with-docs`, or the grilling Wayfinder runs while charting a map or resolving a `wayfinder:grilling` ticket — uses this repo's round format, which overrides the grilling skill's own. See `docs/agents/grilling-format.md`.

### Domain docs

**Single-context** repo: `CONTEXT.md` at the root, with design decisions under `docs/design-decision/`. See `docs/agents/domain.md`.
