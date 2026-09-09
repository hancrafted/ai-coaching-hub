---
okf_version: 0.2
---

# LLM wiki

A knowledge bundle for coaching content, in the Open Knowledge Format v0.2. The `okf_version` above is what marks this directory as one bundle.

**Read [`schema.md`](./schema.md) first.** It carries the conventions, document kinds, naming scheme and section template — everything an agent needs before reading or writing a document here.

## This catalog is not written by hand

There is deliberately no list of documents below. A hand-maintained catalog is a cache, and a stale cache is worse than none because an agent trusts it and stops looking.

This file is intended to be **generated** from the `description` field of every document, so the catalog cannot drift from the corpus it describes. Until that generation exists, retrieval is `grep` plus a frontmatter scan, and the corpus is designed to work with no index at all.
