---
name: branching-workflow
description: Never commit to main — epics get one map branch, each sub-ticket a sub-branch merging into the map via PR
metadata:
  type: feedback
---

Never commit directly to `main`. An epic/map gets **one integration branch**; each sub-ticket gets its own branch off that, and merges back **into the map branch via PR**. The map branch opens a single PR to `main` when the epic completes.

**Why:** Han corrected this on 2026-09-09 after I committed the #12 tracer straight to `main`. `main` should see an epic as one reviewable unit rather than a trickle of individual ticket commits, and each sub-ticket still gets its own PR-sized review surface.

**How to apply:** Branch naming follows the repo's existing `<type>/<slug>` shape, with the issue number for traceability — `map/10-llm-wiki` for the map, `task/12-tracer-content-block` / `research/<name>` / `grilling/<name>` for children, matching the `wayfinder:<type>` label. Create the map branch off `origin/main` and **unset its upstream if git auto-tracks `origin/main`** (`git branch --unset-upstream`), or a stray `git push` lands on `main`. Open sub-ticket PRs with `--base <map-branch>`, never the default. If work is already wrongly committed to an unpushed `main`, **move it rather than revert it**: `git branch <ticket-branch> <sha>` first so the commit is referenced, then `git reset --hard origin/main` — no revert commit, nothing lost. See [[tracker-dependency-edges]] for the related tracker wiring.
