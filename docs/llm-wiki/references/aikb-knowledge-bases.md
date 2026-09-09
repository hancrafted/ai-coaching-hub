---
type: reference
title: Knowledge bases in the Open Knowledge Format
description: What OKF v0.2 says a knowledge base is — a directory of single-purpose markdown concepts that each carry their own provenance, trust and freshness in frontmatter.
tags: [knowledge-bases, okf, knowledge-management, provenance, ai-enablement]
resource: https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md
sources:
  - id: okf-spec
    resource: https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md
    title: Open Knowledge Format v0.2 specification
    last_modified: 2026-08-21T19:31:43Z
  - id: okf-repo
    resource: https://github.com/GoogleCloudPlatform/open-knowledge-format
    title: Open Knowledge Format — repository overview and reference agent
    last_modified: 2026-08-21T20:08:36Z
generated: { by: claude-code/opus-5, at: 2026-09-09T10:53:37Z }
status: draft
stale_after: 2026-09-23T10:53:37Z
---

# Knowledge bases in the Open Knowledge Format

A restatement of what Google's Open Knowledge Format v0.2 asserts about knowledge bases. The claims here are the specification's, not mine.

---

## A knowledge base is a directory of markdown files, not a database

OKF defines a knowledge base as a **bundle**: a directory tree of markdown files where each file is one **concept**, and the directory layout is deliberately left to the producer rather than fixed by the format.[^okf-spec]

Two filenames are reserved at every level and must not be used for concepts — `index.md` for a directory listing and `log.md` for update history. Every other `.md` file is a concept document. A bundle may be shipped as a git repository, as an archive, or as a subdirectory inside a larger repository, which is what lets a knowledge base live beside the code it describes instead of in a separate system.

---

## `type` is the only field OKF ever requires

A concept carrying nothing but `type` is fully conformant, and everything else in the format is recommended or optional.[^okf-spec]

`title`, `description`, `resource` and `tags` are the recommended set. Type values are **not registered centrally**: producers pick descriptive strings and consumers must tolerate unfamiliar ones rather than reject them. The effect is that adopting OKF costs almost nothing up front, and any strictness beyond `type` is something the adopter chooses to impose.

---

## Provenance lives in frontmatter, so a claim travels with its origin

OKF moves provenance out of the body and into a `sources` list in frontmatter, explicitly superseding the older convention of a `# Citations` section.[^okf-spec]

Each entry requires a `resource` — an address a reader can follow, or else a scope descriptor for a population that has no single address, such as _all queries in a given project_. An optional `id` turns an entry into a citation target: a markdown footnote whose label is a `sources[].id` attributes one specific claim to one specific source. The specification is pointed about why labels are keyed rather than positional — agents constantly rewrite these documents, and a positional index such as `sources[0]` misattributes silently the moment the list is reordered.

---

## Who wrote a concept and who confirmed it are separate fields

`generated` records how the current content was produced and `verified` records who has confirmed it, kept apart because the writer need not be the confirmer.[^okf-spec]

`verified` is canonically a **list** of verification events, each with `by` and `at`, so a human sign-off and a nightly automated check can both be recorded; a single verifier may be written as a bare `{ by, at }` mapping, which consumers must treat as a one-element list. From `verified` a consumer derives a **trust tier**: absent means unverified, non-human actors only means machine-confirmed, and a `human:<id>` actor means human-reviewed. Trust classification keys off that `human:` prefix, which is why the specification requires it for hand-authored or human-confirmed content.

---

## Freshness is a date in the file, not a calculation a tool performs

`stale_after` stores an absolute instant, and a concept is stale precisely when `now >= stale_after`.[^okf-spec]

OKF chooses an absolute instant over a relative time-to-live so that judging staleness stays a plain comparison needing no reference to when the document was read or written. The consequence worth noticing is that the signal sits in the document itself, where anything opening the file will meet it, rather than in a report that someone has to remember to run.

---

## Credibility is inferred from signals, never stored as a score

OKF records objective per-source signals — `author`, `usage_count` and `last_modified` — and deliberately stores no credibility score.[^okf-spec]

The stated reasoning is that a score is subjective, does not port between consumers, and goes stale; credibility is therefore inferred from the signals the way trust tiers are inferred from `verified`. `usage_count` is framed as a coarse measure, comparable at the alive-versus-dead and order-of-magnitude level and against a source's own history, but not as a precise ranking across kinds — a scheduled query's executions and a person's deliberate dashboard views do not carry equal weight.

---

## Consumers must not reject a bundle for what it leaves out

Conformance asks only that every non-reserved file parse, carry a non-empty `type`, and that reserved filenames follow their defined structure.[^okf-spec]

Beyond that, consumers must **not** reject a bundle for missing optional fields, unknown `type` values, unrecognised frontmatter keys, broken cross-links or absent `index.md` files, and should treat other constraints as soft guidance. That permissiveness is the format's deliberate posture: OKF supplies the vocabulary for trust and leaves enforcement to whoever adopts it. Anything that fails a build over a missing field is a policy layered on top of OKF, not OKF itself — and the reference agent in the project's repository is presented as one proof-of-concept producer rather than the required way to author a bundle.[^okf-repo]

[^okf-spec]: Open Knowledge Format v0.2 specification.

[^okf-repo]: Open Knowledge Format — repository overview and reference agent.
