---
type: content-block
title: Why agent-maintained corpora decay
description: Agents write faster than anyone reviews, confidence outlives correctness, and a passing lint check gets mistaken for evidence the content is still true.
tags: [knowledge-management, governance, ai-enablement]
generated: { by: claude-code/opus-5, at: 2026-09-09T08:12:14Z }
status: draft
stale_after: 2026-09-23T08:12:14Z
---

# Why agent-maintained corpora decay

Hand an agent write access to a knowledge base and it will grow. That is the easy part, and it is the part every demo shows. The failure arrives later, and it is not that the agent writes badly — it is that nothing in the system can tell a good page from a page that used to be good.

## Volume outruns review

A person writing documentation is rate-limited by the effort of writing. That limit is doing invisible work: it keeps the corpus roughly the size that one person can still hold in their head and notice when something is off.

Remove the limit and the corpus crosses a threshold where nobody has read all of it recently. Everything after that point is trust in something you have not checked. The corpus is not wrong yet, but it has become unauditable — and unauditable is the state that permits being wrong indefinitely.

## Confidence outlives correctness

Generated prose is uniformly confident. A page written from a deprecated API and a page written from the current one read exactly the same: same structure, same assured tone, same absence of hedging.

Human writing leaks its own uncertainty. People hedge, they date things, they write "as of the 2023 release", they leave a note saying they were not sure. Those leaks are what a later reader uses to decide how hard to check. Generated text has no such texture, so a reader has nothing to go on except the content's own claim to be right.

This is the mechanism that makes decay invisible rather than merely present. A decayed corpus does not look decayed.

## A passing check is not evidence of truth

Once a corpus is governed, a new failure mode appears, and it is the subtle one.

A linter validates **form**: the fields exist, the dates parse, the enum values are spelled correctly. It cannot validate that a claim is still true, and it never consults a clock. So a document can be nine months past the date its own author said to stop trusting it, and the check will pass — correctly.

The danger is that the green check gets read as "the knowledge base is fine". It means something much narrower: every document still declares its trust state in a well-formed way. Conflating the two is worse than having no checks, because a red build at least prompts someone to look.

The fix is not to make the linter fail on staleness. It is to put the trust signal **in the document**, where anyone retrieving it — human or agent — encounters it at the moment of use rather than in a report nobody runs.

## What actually arrests it

Three mechanisms, none of which are "review everything regularly", because that is the thing that already failed:

**Attribution that distinguishes drafting from vouching.** Two separate facts: who produced this, and who has since read it and stood behind it. Collapse them into one "author" field and you lose the ability to ask the only question that matters — has a human actually looked at this?

**An expiry the author chooses.** Not a global freshness policy, which is a guess applied uniformly. A per-document instant, set by whoever wrote it, after which trust lapses until someone renews it. Short at first, lengthened each time the document survives a review, so a horizon is earned rather than granted.

**Agents draft, humans promote.** An agent can write anything; only a person can move a document into the state where it gets reused. This inverts the usual arrangement, where the agent maintains the wiki and the human occasionally audits. It trades throughput for trust, which is the right trade whenever the content goes out under someone's name.

## The uncomfortable part

All three mechanisms are friction, and the friction is the product. A governance model cheap enough to never notice is one that permits exactly the decay it was built to catch.

The honest version of the pitch is not "AI maintains your knowledge base". It is: AI makes writing so cheap that the scarce resource shifts from authorship to **vouching** — and a corpus that does not track vouching separately from authorship has no way to know what it still knows.
