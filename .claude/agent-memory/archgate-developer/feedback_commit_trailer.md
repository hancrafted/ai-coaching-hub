---
name: feedback-commit-trailer
description: Do not add the Co-Authored-By Claude trailer to commit messages in this repo
metadata:
  type: feedback
---

Do not auto-include a "Co-Authored-By: Claude ..." trailer in git commit messages for this project.

**Why:** User explicitly said "don't autoinclude yourself in the commit" when the first commit was being made in this repo.

**How to apply:** When drafting commit messages here (via the standard commit workflow or ad-hoc `git commit`), omit the Co-Authored-By trailer entirely. Just use a plain, concise commit message. This overrides the default commit-message template for this repo.
