---
name: tracker-dependency-edges
description: GitHub native issue-dependency and sub-issue writes can silently no-op and their summary field lags — always read edges back from the dependencies endpoint
metadata:
  type: reference
---

Writing blocking edges and sub-issue links to this repo's GitHub tracker can silently fail. Verify every write by reading it back.

**Why:** On 2026-09-09, working ticket #11 under map #10, all six `blocked_by` edges and all nine sub-issue links from the previous charting session turned out never to have landed. The edges existed only as `## Blocked by` body text, so the board looked correctly sequenced while the tracker UI showed nine unblocked, takeable tickets with no gating at all. Re-running the same `gh api` POSTs by hand worked first try, so the calls were never issued rather than rejected.

**How to apply:** After writing dependency or sub-issue relationships, read them back — `gh api repos/OWNER/REPO/issues/N/dependencies/blocked_by` and `.../issues/MAP/sub_issues`. Both endpoints work on this repo, so an empty result means the write didn't happen, not that the feature is unavailable. Body-text `Blocked by:` lines are the documented fallback but are invisible to the frontier query in `docs/agents/issue-tracker.md`; treat them as commentary, never as the edge. Note `gh api ... -F issue_id=` needs the numeric **database** id from `gh api .../issues/N --jq .id`, not the `#number`. Also: a `for` loop using `set -- $pair` to split id pairs mis-split arguments in this shell — issue the calls individually.

**Refinement (2026-09-09):** `issue_dependencies_summary.blocked_by` **lags** the real edges. Immediately after a successful POST it read `0` while `GET .../dependencies/blocked_by` already listed both blockers; it caught up moments later. So verify against the **`/dependencies/blocked_by` endpoint**, never the summary field — and note the frontier query reads the summary, so a freshly-wired ticket can briefly look takeable when it is not. A re-POST of an existing edge returns `Validation failed: Target issue has already been taken`, which is a useful idempotency probe: that error means the edge is present.
