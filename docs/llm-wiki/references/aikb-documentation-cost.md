---
type: reference
title: The measured lifespan of outdated documentation
description: What a peer-reviewed mining study of 3,000+ GitHub repositories found about how often documentation goes stale and how long the errors sit before anyone catches them.
tags:
  [documentation-debt, outdated-documentation, verification-lag, github, empirical-software-engineering, ai-enablement]
resource: https://doi.org/10.1007/s10664-023-10397-6
sources:
  - id: tan2024
    resource: https://doi.org/10.1007/s10664-023-10397-6
    title: Detecting outdated code element references in software repository documentation — Empirical Software Engineering 29:5 (2024)
  - id: tan-preprint
    resource: https://arxiv.org/abs/2212.01479
    title: Detecting Outdated Code Element References in Software Repository Documentation (arXiv preprint, submitted 2 Dec 2022 — full text read for this document)
generated: { by: claude-code/sonnet-5, at: 2026-09-09T17:28:39Z }
status: draft
stale_after: 2026-09-23T17:28:39Z
---

# The measured lifespan of outdated documentation

A restatement of one peer-reviewed measurement study of documentation staleness in open-source GitHub repositories. The numbers here are the study's, not an estimate — and the scope in the last section is what limits what they can be used to claim.

---

## Outdated documentation is common in the most popular open-source projects on GitHub, not an edge case

Tan, Wagner and Treude built an automated tool that scans a repository's README and wiki text for references to code elements — function, class and variable names, and file paths — and flags a reference as outdated if every instance of that element has since been deleted from the source code.[^tan2024] Applied to the 1,000 most-starred public GitHub repositories, it found that **28.9% (265/918) currently contain at least one outdated reference** in their documentation, affecting 19.2% (1,880/9,784) of individual documents and 3.9% (7,910/201,852) of the code-element references extracted.[^tan2024]

The same scan run against all 2,279 public repositories under the Google GitHub organisation found a much lower rate: 5.4% (101/1,879) of projects, 9.7% (287/2,947) of documents, 2.7% (1,283/48,078) of references currently outdated.[^tan2024] The authors offer project size as the likely reason for the gap — the top1000 projects have a median size of 31.7 MiB against 1.47 MiB for the Google projects — rather than anything specific to Google's practices.[^tan2024]

---

## Across a project's lifetime, most well-maintained repositories go through at least one bout of outdated documentation

Mining the full git history (not just the current snapshot) of 800 of the top1000 projects, the study found **82.3% (658/800) had contained at least one outdated code-element reference at some point in their history**, affecting 40.7% (2,878/7,071) of documents and 12.3% (23,588/191,849) of references ever extracted; 1.3% (2,431/191,849) of references went outdated a second time after already being fixed once.[^tan2024]

The same historical analysis on 1,907 of the Google projects found 29.7% (567/1,907) of projects, 30.6% (925/3,018) of documents and 7.1% (4,176/58,805) of references outdated at some point, with 0.4% (210/58,805) recurring after a fix.[^tan2024] The direction is the same as the current-snapshot numbers above; the magnitude confirms this is not a rare, one-off event in a project's life.

---

## Once a reference goes stale, the study measured how long it typically sits wrong — and the answer is years, not days

For references that were still outdated at the time of analysis, the study measured how long they had already been wrong: **on average 4.7 years for the top1000 dataset and 4.2 years for the Google dataset**.[^tan2024] This is the closest figure in the paper to a direct "verification lag" magnitude — a measured gap between when documentation broke and when anyone would have caught it, had they been looking, rather than an assertion that a gap exists.

This number is a snapshot average over references still unfixed at analysis time (right-censored — the true average once every reference is eventually fixed would differ), so it should be read as "how old is currently-unfixed rot," not "how long rot always lasts."

---

## A newly broken reference has roughly a coin-flip's chance of still being wrong a month later

The study ran a survival analysis on time-to-fix across all detected outdated references, plotted on a log scale from minutes to decades.[^tan2024] Reading the curve at the one-month mark: **around a 55% chance an outdated reference in a top1000 project is still unfixed a month after breaking, and around 45% for a Google project.**[^tan2024]

That is the sharpest available number for "generation outpaces verification": a majority (or near-majority) of newly stale documentation is still stale a full month later, with no error, crash or CI signal to surface it in the meantime — the paper's own framing is that documentation goes outdated "silently."[^tan2024]

---

## When outdated documentation does get fixed, the fix is usually the code coming back, not someone rewriting the text

Of the references that ever went outdated in the top1000 history, 73.6% (17,368/23,588) were eventually resolved. Of those resolutions, 47.6% (8,271/17,368) happened because the source code changed again and reintroduced the element, 39.1% (6,783/17,368) because someone updated the documentation, and 13.3% (2,314/17,368) because someone deleted the outdated documentation outright.[^tan2024] The Google dataset shows the same pattern: 55.5% (2,319/4,176) of ever-outdated references were resolved, split 50.2% (1,164/2,319) code change, 43.3% (1,004/2,319) documentation update, 6.5% (151/2,319) deletion.[^tan2024]

Roughly half of what counts as "resolved" in this data is not a human verifying and rewriting a claim — it is the code coincidentally changing back into agreement with what the documentation already said. That narrows further how much of the observed "fixing" is actually the deliberate verification work in question.

---

## The measurement is deliberately narrow, and that narrowness is what makes it defensible

The study only counts one specific, well-defined kind of staleness: an exact-string, case-sensitive code-element name that appears in a README or wiki page and has zero remaining matches anywhere in the current source tree.[^tan2024] It explicitly does not detect documentation that is wrong while the referenced code element still exists, staleness in images or video, or inconsistency in prose that never names a code element — the authors state this as a limitation of their own approach, not a claim about the scope of documentation rot generally.[^tan2024]

The detection method itself was manually validated: two authors independently annotated the same 50 randomly selected code elements from the Google projects and reached a free-marginal kappa of 0.92 on whether each was a true outdated reference.[^tan2024] The authors also filed real GitHub issues against 15 actively-maintained Google projects for 19 flagged instances; at the time of writing, 5 had already been fixed by maintainers and 4 more had responded positively, with 4 disputed as false positives and 7 not yet answered — a small but real check against false positives inflating the headline numbers.[^tan2024]

**Population.** Every figure above is drawn from two datasets: the 1,000 most-starred public repositories on GitHub, and the 2,279 public repositories under Google's GitHub organisation.[^tan2024] Both skew toward large, popular, actively-watched open-source projects with README/wiki documentation in a format GitHub can render. Nothing here is a claim about private, internal or enterprise codebases, about documentation that lives outside the repository, or about documentation quality in any sense broader than "does this specific reference still match the code." Every number in this page was read directly from the study's full text, not a summary of it.[^tan-preprint]

[^tan2024]: Tan, W.S., Wagner, M., Treude, C. "Detecting outdated code element references in software repository documentation." Empirical Software Engineering 29, 5 (2024).

[^tan-preprint]: Same study; full text read via the authors' open-access arXiv preprint because the published Springer page redirects to a login screen even though the article is marked open access.
