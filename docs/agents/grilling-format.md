# Grilling Format

How a grilling round is written in this repo. It covers every round: `/grill-me`, `/grill-with-docs`, and the grilling Wayfinder runs while charting a map or resolving a `wayfinder:grilling` ticket.

This **overrides** the grilling skill's "ask the whole frontier in one round". The frontier still decides which questions are askable; the cap below decides how many of them ship this round.

## Round size

- **Five questions at most** in a normal round.
- **Three at most** when the round turns on an architectural decision — one that fixes structure the later work has to sit on: a data shape, a boundary, a file layout, a dependency.

When the frontier is wider than the cap, ask the questions the rest of the frontier hangs on and leave the others for the next round.

## Question shape

Keep the grilling skill's markers (`❓ **Qn**`, `➡️`) and fill each question out with three parts:

1. **Options** as a numbered list, one line each.
2. **An example per option**, showing what the decision looks like once taken — the file it writes, the config it changes, the directory layout it produces. Show the effect; don't describe it.
3. **A recommendation** under the options, naming the option it picks and why it wins.

## Language

Write the question in plain words and keep the technical terms exact. A term is exact when `CONTEXT.md` or the surrounding docs already establish it — reach for that one rather than a synonym.

Coin nothing silently. Where a concept genuinely has no name yet, say so in the question ("no name for this yet, calling it a _lesson bundle_ here"), so a fresh word is never mistaken for established vocabulary.

## Refer by name

No bare id ever reaches the user. Every id-like handle travels with its name or slug:

- `GEN-001-adr`, never `GEN-001`.
- An architectural tenet by its name, never `tenet 4`.
- Maps and tickets by their title, which is the Wayfinder skill's own rule.

The id alone is unreadable; the name carries the meaning while the id keeps the trail.

## A round in this format

❓ **Q1** — **Where per-lesson metadata lives**: every lesson needs a title, a duration, and tags. Two places can hold them.

1. **Frontmatter in the lesson's own `.md`** — metadata sits with the prose.
2. **A sibling `lesson.json`** — metadata sits in its own file.

Option 1 writes:

```markdown
---
title: Framing the problem
duration: 12m
tags: [discovery]
---
```

Option 2 writes:

```
content/lessons/01-framing/
├── lesson.md
└── lesson.json
```

➡️ **Option 1.** One file per lesson keeps a metadata edit and a prose edit in the same place, and `docs/agents/domain.md` already treats the lesson `.md` as the unit.

---

❓ **Q2** — **Where the metadata shape is recorded**: the shape chosen in Q1 outlives this session, so it needs a home.

1. **An ADR under `.archgate/adrs/`**, alongside `GEN-001-adr`, giving it a rules file that fails the build when a lesson drifts.
2. **A design decision under `docs/design-decision/`**, which records the reasoning and enforces nothing.

Option 1 adds a rule that runs in `npm run verify`:

```
.archgate/adrs/CNT-001-lesson-metadata.md
.archgate/adrs/CNT-001-lesson-metadata.rules.ts
```

Option 2 adds prose only:

```
docs/design-decision/0001-lesson-metadata.md
```

➡️ **Option 2.** `GEN-001-adr` reserves ADRs for constraints no future feature can invalidate, and the metadata shape is still moving. Promote it to an ADR once a second content type has to honour it.
