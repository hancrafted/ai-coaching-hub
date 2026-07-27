---
name: project-repo-setup
description: ai-coaching-hub GitHub repo was freshly created on 2026-07-27; identity and remote details
metadata:
  type: project
---

The `ai-coaching-hub` project directory was an empty local folder (only `.claude/agent-memory/` existed, no code) until 2026-07-27, when a public GitHub repo was created for it.

- Repo: https://github.com/hancrafted/ai-coaching-hub (public), remote `origin` over SSH: `git@github.com:hancrafted/ai-coaching-hub.git`.
- Default branch `main`, initial commit contains only `README.md` and `.gitignore`.
- Global git identity was not configured on this machine beforehand; user asked to set it globally as `Han Che <code.adjacent@gmail.com>` (note: different from the RIB work email `han.che@rib-software.com` seen in this user's global CLAUDE.md context — this project's commits should use the personal `code.adjacent@gmail.com` identity, not the work email).

**Why:** Needed a valid git identity to create the first commit; user chose to set it globally rather than per-repo, so it now applies to all repos on this machine unless overridden locally.

**How to apply:** No need to re-init git or re-create the GitHub repo for this project going forward — it already exists. If a future session sees "not a git repository" here, something unexpected happened (e.g. wrong directory) — verify before re-running `git init`/`gh repo create`.
