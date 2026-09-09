---
type: reference
title: Structured documentation and agent-context standards
description: Version, governance and adoption for OKF, llms.txt, MCP and AGENTS.md, checked against what real standardisation has required elsewhere.
tags: [standards, structured-documentation, agent-context, okf, ai-enablement]
resource: https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md
sources:
  - id: okf-spec
    resource: https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md
    title: Open Knowledge Format v0.2 specification
    last_modified: 2026-08-21T19:31:43Z
  - id: okf-repo
    resource: https://github.com/GoogleCloudPlatform/open-knowledge-format
    title: Open Knowledge Format — repository (commits, contributors, releases)
    last_modified: 2026-08-21T20:08:36Z
  - id: llms-txt-spec
    resource: https://llmstxt.org/
    title: The /llms.txt file, v2
  - id: llms-txt-repo
    resource: https://github.com/AnswerDotAI/llms-txt
    title: llms-txt — repository (commits, contributors, stars)
  - id: mcp-spec
    resource: https://modelcontextprotocol.io/specification/2026-07-28
    title: Model Context Protocol — 2026-07-28 specification
  - id: mcp-versioning
    resource: https://modelcontextprotocol.io/specification/versioning
    title: Model Context Protocol — versioning scheme and revision history
  - id: mcp-governance
    resource: https://modelcontextprotocol.io/community/governance
    title: Model Context Protocol — governance and stewardship
  - id: mcp-repo
    resource: https://github.com/modelcontextprotocol/modelcontextprotocol
    title: Model Context Protocol — specification repository
  - id: agents-md
    resource: https://agents.md/
    title: AGENTS.md — open format for coding agents
  - id: schema-org-about
    resource: https://schema.org/docs/about.html
    title: Schema.org — About
  - id: dublin-core-iso
    resource: https://www.iso.org/standard/71339.html
    title: 'ISO 15836-1:2017 — Information and documentation: the Dublin Core metadata element set'
  - id: robots-rfc
    resource: https://datatracker.ietf.org/doc/html/rfc9309
    title: 'RFC 9309: Robots Exclusion Protocol'
  - id: okf-knowledge-bases
    resource: docs/llm-wiki/references/aikb-knowledge-bases.md
    title: Knowledge bases in the Open Knowledge Format (this bundle's restatement of what OKF v0.2 says)
generated: { by: claude-code/sonnet-5, at: 2026-09-09T17:15:17Z }
status: draft
stale_after: 2026-09-23T17:15:17Z
---

# Structured documentation and agent-context standards

Where the pattern behind "LLM-wiki" actually sits, across every specification that touches it. [`okf-knowledge-bases`] restates what OKF v0.2 says; this restates how mature OKF and its siblings actually are — version, governance, adoption, and distance from any recognised standards body.

---

## OKF v0.2, the spec the claim leans on, is four weeks old with one contributor and zero releases

The Open Knowledge Format repository was created on 2026-08-11 and last pushed on 2026-08-21 — 29 days old as of this writing, with six commits, all from a single contributor, no tags, and no GitHub releases.[^okf-repo]

The specification text itself never claims to be a standard: it carries no "status" section marking itself draft, proposal, or finished, and the word "standardised" appears nowhere in it. The only self-description of maturity is structural — a minor-version bump policy for "backward-compatible additions" and a "Considered and deferred" list of unfinished work, including the full runtime attestation protocol.[^okf-spec] A `status` field does exist in the format, but it classifies individual concept documents (`draft | stable | deprecated`), not the specification that defines it.[^okf-spec]

---

## OKF names no owner and no process for approving a change

The spec states plainly that "there is no schema registry, no central authority, and no required tooling"[^okf-spec] — a design choice about the data shape, but it doubles as an accurate description of the project's own stewardship.

No CONTRIBUTING process, meeting cadence, working group, or decision rule is documented anywhere in the repository or the spec. It sits under the `GoogleCloudPlatform` GitHub organization, and the README frames the shipped reference agent and visualizer explicitly as "a proof of concept" and states "the format itself is the contribution"[^okf-repo] — but no governance structure exists that a second organization could actually join or be outvoted in. Compare that with MCP below, which names one.

---

## llms.txt, the closest sibling pattern, still calls itself a proposal after two years of visible adoption

The specification's own subtitle reads "a proposal to standardise on using an `/llms.txt` file"[^llms-txt-spec] — proposal language it has kept through a v2 revision, roughly two years after Jeremy Howard first published it under Answer.AI on 2024-09-01.[^llms-txt-repo]

In that time it has picked up real usage — Anthropic, Stripe, Cursor, Cloudflare and others reportedly publish one, and the repository shows 2,606 stars and 160 forks[^llms-txt-repo] — but governance is still informal: a GitHub issue tracker and a community Discord, no working group, no standards body, no versioned conformance suite.[^llms-txt-spec] Two years of adoption moved it from proposal to a _revised_ proposal, not to a standard.

---

## Model Context Protocol is the most governed effort in this landscape, and even it is not a ratified standard

MCP is the one specification here with a named owner: it operates as "Model Context Protocol a Series of LF Projects, LLC," under the Linux Foundation, with a documented hierarchy of Lead Maintainers, Core Maintainers, Maintainers and Contributors that together form the MCP Steering Group, and a formal Specification Enhancement Proposal (SEP) process run through Working Groups.[^mcp-governance]

Its spec has gone through six dated revisions since 2024-10-07 — most recently 2026-07-28, the current version — each tagged Draft, Current or Final under an explicit versioning policy.[^mcp-versioning][^mcp-repo] That is real process maturity: a conformance-suite requirement for new features, a twelve-month deprecation window, individual (not corporate) board seats.[^mcp-governance] But it is a runtime protocol for tool- and context-exchange, not a documentation format, and its own governance page never invokes IETF, W3C, ISO or any other standards body — it is a Linux Foundation project governing itself, which is a stronger footing than a single-vendor GitHub repo but still not external ratification.

---

## AGENTS.md has the widest adoption of anything here and makes the smallest standardization claim

Over 60,000 open-source repositories carry an AGENTS.md file, and the convention is implemented by Codex, Jules, Cursor, Copilot, Windsurf, Amp and more than a dozen other tools[^agents-md] — larger real-world uptake than OKF, llms.txt or MCP combined.

Its own page states there is no required schema at all: "just standard Markdown. Use any headings you like."[^agents-md] It carries no version number and no revision history. Stewardship was recently formalized under the Agentic AI Foundation, a Linux Foundation body[^agents-md] — governance, but attached to a format that deliberately declines to define a schema, let alone claim to be a standard. In this landscape, adoption and self-claimed standardization status move in opposite directions.

---

## Where documentation conventions have actually reached standard status, it took years under a named body, not weeks under a GitHub org

Three precedents show what crossing that line has actually required. Dublin Core moved from a 1995 workshop through IETF RFC 2413 (1998) to ANSI/NISO Z39.85 and finally ISO 15836, revised as recently as 2017 — roughly two decades and three standards bodies.[^dublin-core-iso] Schema.org has run continuously since 2011 under a steering group of Google, Microsoft, Yahoo and Yandex plus a W3C Community Group active since 2015, and still stops short of claiming formal W3C Recommendation status for itself.[^schema-org-about] robots.txt functioned as a universal de facto convention for roughly 25 years before Google formally proposed it to the IETF in 2019, and it took a further three years to become RFC 9309 in September 2022.[^robots-rfc]

None of the three bodies that did this work — IETF, W3C, ISO — has anything on record for LLM-facing document frontmatter or knowledge-base bundling. The nearest things to a precedent took decades, not the four weeks OKF has existed.

---

## What is real is convergence on a shape, not standardisation of a spec — "converging" is the defensible word

OKF's frontmatter (`type`, `resource`, `sources`, `status`, `stale_after`, `verified`), llms.txt's curated agent-facing markdown, AGENTS.md's repo-level agent context file, and MCP's typed `Resources` are four uncoordinated efforts landing on the same underlying idea: structured, sourced, machine-parseable text as the unit an agent consumes.[^okf-spec][^llms-txt-spec][^agents-md][^mcp-spec] That convergence is a true and stageable claim.

It is not the same claim as "standardised." Nothing here has a ratified 1.0, a recognised standards-body number, or the multi-year, multi-organization governance record that Dublin Core, schema.org and robots.txt needed to earn that word — and the specific spec the slide cites, OKF v0.2, is the youngest and least governed artefact in the whole set. Section 2.3 should say the pattern is **converging, not standardised**.

[^okf-spec]: Open Knowledge Format v0.2 specification.

[^okf-repo]: Open Knowledge Format — repository (commits, contributors, releases).

[^llms-txt-spec]: The /llms.txt file, v2.

[^llms-txt-repo]: llms-txt — repository (commits, contributors, stars).

[^mcp-spec]: Model Context Protocol — 2026-07-28 specification.

[^mcp-versioning]: Model Context Protocol — versioning scheme and revision history.

[^mcp-governance]: Model Context Protocol — governance and stewardship.

[^mcp-repo]: Model Context Protocol — specification repository.

[^agents-md]: AGENTS.md — open format for coding agents.

[^schema-org-about]: Schema.org — About.

[^dublin-core-iso]: ISO 15836-1:2017 — the Dublin Core metadata element set.

[^robots-rfc]: RFC 9309 — Robots Exclusion Protocol.

[^okf-knowledge-bases]: Knowledge bases in the Open Knowledge Format.
