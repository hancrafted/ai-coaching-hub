# Schema

How this wiki is structured, and the conventions to follow when reading or writing a document in it. This is the file to read before touching the corpus.

## Boundary

`docs/llm-wiki/` is **one portable OKF v0.2 knowledge bundle**, and it is a **corpus, not a site**. Nothing here is rendered. Anything the repository grows into is a downstream consumer of these documents, which is what lets the knowledge base outlive any decision about static-site generators.

The corpus is English. Output language is a parameter of generation, not a property of knowledge.

## Document kinds

Documents are split by **provenance** — whose knowledge it is — because that determines what a document owes its reader. One directory per kind, because the harness Rule selector matches on paths alone, so per-kind requirements are otherwise inexpressible.

| directory         | `type`          | means                                         | `sources`                                   |
| ----------------- | --------------- | --------------------------------------------- | ------------------------------------------- |
| `content-blocks/` | `content-block` | my own synthesis, built on source material    | optional today, intended to become required |
| `references/`     | `reference`     | someone else's knowledge, faithfully restated | required                                    |
| `stories/`        | `story`         | my lived experience                           | **forbidden**                               |

`assets/` holds artifacts owned outright — past decks, transcripts. The harness only walks markdown, so anything binary there is ungoverned.

The discriminator between a `reference` and a `content-block` is **whose argument it is**, not whether it cites anything. A reference restates someone else's thinking; a content-block is my argument standing on sources. Both cite. Only a `story` cannot.

## Naming

`<category>-<slug>.md`, flat inside the kind directory, all lowercase.

**Categories** are a closed set. Adding one means editing this file:

| category | covers                                                                |
| -------- | --------------------------------------------------------------------- |
| `aikb`   | AI Knowledge Bases — LLM wikis, knowledge bases, knowledge management |

**Slug** is kebab-case, named after the document's theme, and capped around 50 characters so a flat listing stays scannable. No numeric or date prefixes: a number reads as teaching sequence, and sequence is pedagogy this corpus deliberately does not store.

Directories stay **flat** until roughly thirty files. Navigability at this scale comes from good filenames, not depth — and a subfolder forces one primary topic, which is the problem `tags` exists to solve.

**Topic lives in `tags`, never in the tree.** Directories carry the one dimension the selector can see; tags carry the cross-cutting dimensions it cannot. A block about governance aimed at a sales audience is tagged, not filed twice.

## Frontmatter floor

Required on every governed document: `type`, `title`, `description` (max 200), `tags` (min 1), `generated.by` (actor), `generated.at` (datetime), `status` (`draft`/`stable`/`deprecated`), `stale_after` (datetime).

`verified.by` is **optional in presence but pinned to `human:han`** when present. Optionality is expressed by _omitting_ the `presence` key — writing `presence: optional` parses fine and does nothing, because only `required` and `forbidden` are ever read.

`verified` must use the bare-mapping form `verified: { by, at }`. OKF permits a list, but the address `verified.by` resolves only a mapping.

## Body structure

**One `## H2` is one section, and one section is one point.** Sections are separated by `---`, which is a plain horizontal rule in markdown and a slide divider in Marp, so a deck preview costs nothing extra.

**The first sentence of a section states its point plainly.** A renderer or generator lifts that sentence verbatim as the slide's thesis; everything after it is supporting material. Write the point as a claim, not as a topic label.

A document **groups sections thematically** and typically carries **three to ten**. It is not one section per slide's worth of content — the document is the theme, the section is the point. `aikb-llm-wiki.md` covering history, why it exists, how it differs from RAG, setup and quirks is right; splitting those into five documents is too granular.

Content here is the **raw description**. Visualisation is a translation step performed at generation time, so no slide ordering, duration or exercise framing is stored on a document.

## Trust model

Agents draft; humans promote. This inverts the usual arrangement deliberately, because this content is published under my name.

1. An agent writes a document with `generated.by`, `generated.at` and `status: draft`, and no `verified` block.
2. I read it, and on promoting it set `status: stable` and `verified: { by: human:han, at: <instant> }`.
3. A generator may compose **only** documents that are both `status: stable` and carry `verified`.

`stale_after` is the instant after which I stop trusting a document unread. It starts short — one to two weeks — and lengthens each time I verify, so a longer horizon is earned rather than granted.

## What is enforced, and what is not

`markdown-harness` is the **sole** frontmatter authority here, configured by `markdown-harness.config.yaml` at the repository root and run inside `npm run verify`. Archgate governs code and ADRs and deliberately says nothing about these files: two systems asserting on the same keys is the drift this arrangement exists to prevent.

**Enforced:** the frontmatter floor, per kind, including formats and closed value sets. Every constraint carries an `intent`, so a violation explains why the rule exists rather than only that a check fired.

**Convention only, held by discipline:** the naming scheme, the section template, and the three-to-ten section guidance. The harness governs frontmatter fields, not filenames or bodies — a Rule selector cannot express kebab-case, and glob matching is case-insensitive.

**Deliberately not enforced:** freshness. `mh --check` validates form and never consults a clock, so a document long past its `stale_after` still passes and keeps the build green. That is the intent — the signal lives in the file where retrieval finds it, not in a report nobody runs.

## Workflows

**Write.** Pick the kind by provenance, name the file `<category>-<slug>.md`, fill the floor, leave `status: draft` and no `verified`. Run `mh --query <path>` before writing to see what the path owes — it answers for files that do not exist yet.

**Retrieve.** `grep` plus a frontmatter scan. Check `status`, `verified` and `stale_after` before reusing anything, and treat a stale or unverified document as a lead rather than a fact.

**Verify.** `npm run verify` runs the check. `mh --audit` shows how every Rule fared, so a Rule governing nothing is visible rather than silently dormant.

## What does not live here

- **Pedagogy** — duration, sequencing, exercise framing. Supplied at generation, not stored. A block hardcoding "20 minutes, module 3" can only be used once.
- **Mirrored third-party material.** This repository is public: cite by URL, quote under fair use inside a `reference`.
- **A `log.md`.** `git log` is the log.
- **A hand-written `index.md`.** See `index.md` for why.
