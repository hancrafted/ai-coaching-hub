---
okf_version: 0.2
---

# LLM wiki

A knowledge bundle for coaching content, in the [Open Knowledge Format](https://github.com/google/open-knowledge-format) v0.2. This directory is the whole bundle; `okf_version` above is what marks it as one.

This is a **corpus, not a site.** Nothing here is rendered. Whatever the repository grows into is a downstream consumer of these documents, which is what lets the knowledge base outlive any decision about static-site generators.

## What lives here

Documents are split by **provenance** — who owns the knowledge — because that is what determines what a document owes the reader:

| directory         | type            | means                                | sources   |
| ----------------- | --------------- | ------------------------------------ | --------- |
| `content-blocks/` | `content-block` | my own synthesis of one scoped topic | optional  |
| `references/`     | `reference`     | someone else's knowledge, restated   | required  |
| `stories/`        | `story`         | my lived experience                  | forbidden |

`assets/` holds artifacts I own outright — past decks, transcripts. The harness only walks markdown, so anything binary there is invisible to governance.

**Topic is carried by `tags`, never by the directory tree.** Directories carry the one dimension the harness Rule selector can see, since it matches on paths alone; tags carry the cross-cutting dimensions it cannot. A block about governance for a sales audience is tagged, not filed twice.

Third-party material is **cited by URL and never mirrored** into this public repository. Quote under fair use inside a `reference`, with attribution keyed to `sources[].id`.

## What does not live here

**Pedagogy.** Duration, sequencing and exercise framing are supplied when a workshop is generated, not stored on the document. A block that hardcodes "20 minutes, module 3" is a block that can only ever be used once.

**A second language.** The corpus is English. Output language is a parameter of generation, not a property of knowledge — a bilingual corpus would duplicate every `verified` and `stale_after` and let the copies drift apart.

**A maintained document index.** There is no list of documents in this file, deliberately. A hand-maintained index is a cache, and a stale cache is worse than none, because an agent trusts it and stops looking. Retrieval is grep plus a frontmatter scan; deterministic index generation is the intended end state and the corpus must work without it.

**A `log.md`.** `git log` is the log.

## Governance

Frontmatter is enforced by [`@hancrafted/markdown-harness`](https://github.com/hancrafted/markdown-harness) via `markdown-harness.config.yaml` at the repository root, and runs inside `npm run verify`. It is the sole authority on frontmatter here; archgate governs code and ADRs and deliberately says nothing about these files.

Every document carries its own trust state — who drafted it, whether I have verified it, and the instant after which I stop trusting it unread. **`mh --check` validates form, never freshness:** a document long past its `stale_after` is still well-formed and keeps the build green. That is the intent. The signal lives in the file, where a reader and an agent both find it, rather than in a report nobody runs.
