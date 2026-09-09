---
type: reference
title: Reference rot already names citation and source drift
description: Reference rot already names two of the slide's three drift modes — link rot and content drift — while structure drift matches no literature checked here.
tags:
  [reference-rot, link-rot, content-drift, citation-drift, code-comment-inconsistency, schema-drift, knowledge-bases]
resource: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0115253
sources:
  - id: klein-2014
    resource: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0115253
    title: 'Scholarly Context Not Found: One in Five Articles Suffers from Reference Rot'
  - id: jones-2016
    resource: https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0167475
    title: 'Scholarly Context Adrift: Three out of Four URI References Lead to Changed Content'
  - id: seetharam-2025
    resource: https://aclanthology.org/2025.wasp-main.20/
    title: 'Citation Drift: Measuring Reference Stability in Multi-Turn LLM Conversations'
  - id: wen-2019
    resource: https://doi.org/10.1109/ICPC.2019.00019
    title: A Large-Scale Empirical Study on Code-Comment Inconsistencies
  - id: adf-schema-drift
    resource: https://learn.microsoft.com/en-us/azure/data-factory/concepts-data-flow-schema-drift
    title: Schema drift in mapping data flow — Azure Data Factory & Azure Synapse
  - id: bontempelli-2021
    resource: https://arxiv.org/abs/2103.14874
    title: Human-in-the-loop Handling of Knowledge Drift
generated: { by: claude-code/sonnet-5, at: 2026-09-09T17:27:22Z }
status: draft
stale_after: 2026-09-23T17:27:22Z
---

# Reference rot already names citation and source drift

A check of whether "citation drift, structure drift, source drift" are recognised terms or a coinage. Two of the three already have names in the literature; the third does not.

---

## Reference rot is the umbrella term the slide's citation and source drift are both reaching for

Klein et al. coined **reference rot** in 2014 for the Hiberlink project as "the combination of link rot and content drift" affecting URI references in scholarly articles.[^klein-2014]

The paper is not a passing mention of the idea — it is the founding measurement of it: over one million web-at-large references drawn from more than 3.5 million STM articles published 1997–2012, across arXiv, Elsevier and PubMed Central. The headline finding is that "one out of five" articles suffers from reference rot overall, rising to "seven out of ten" once the sample is restricted to articles that cite a web resource at all. Reference rot is deliberately named as a _combination_ of two distinct mechanisms, which is the detail that matters for the slide: the two mechanisms already have their own names, below.

---

## Link rot is the established name for a citation whose target is simply gone

Link rot is defined in the same paper as the case where "the resource identified by a URI may cease to exist," so the reference "will no longer provide access to referenced content."[^klein-2014]

This is the failure mode a reader meets as a dead link — the resource has vanished outright, not merely changed. Read plainly, this is what "citation drift" is pointing at on the slide: a citation that stops delivering what it once promised. It already has a name, and that name is not "drift" — the word "rot" is doing the work precisely because the resource is gone, not evolving.

---

## Content drift is the established name for a citation whose target quietly changes underneath it

Content drift is the second half of reference rot: "the resource identified by a URI may change over time," to the point that its content "ceases to be representative of what was originally referenced."[^klein-2014]

The follow-up study on the same corpus quantified how large this effect is: of the URI references with both an archived snapshot and retrievable live content, only 23.65% had "not been subject to content drift" — meaning drift affected just over three-quarters of them, stated directly as "for over 75% of references the content has drifted away from what it was when referenced."[^jones-2016] This is what "source drift" is pointing at on the slide: the source a claim leans on is still reachable, but it no longer says what it said when it was cited. It already has a name, and it is "content drift," not "source drift."

---

## "Citation drift" is already claimed for a different phenomenon, in the same AI space this talk is about

A 2025 workshop paper defines citation drift as "the phenomenon where references mutate, disappear, or get fabricated during extended LLM interactions" — reference instability inside a live, multi-turn conversation with a model, not a static document decaying on disk.[^seetharam-2025]

The study measured 240 conversations across four LLaMA models discussing 36 scientific papers, reporting "significant citation instability" and, for one model, a fabrication rate as high as 85.6% of its citations. This is a real, named, peer-reviewed-venue use of the exact phrase the slide reuses — and it names something else: a model inventing or losing citations mid-conversation, not a governed document's citations rotting between reads. Reusing "citation drift" for the reference-rot meaning does not invent a term into empty space; it collides with one that already means something adjacent but different, in exactly the domain this talk is pitched to. That is a second, independent reason to prefer "link rot" on the slide over "citation drift."

---

## Code-comment inconsistency is software engineering's version of the same content-drift shape, independently

Code comments decay the same way citations do: the largest empirical study to date defines **code-comment inconsistencies** as "comments that are not kept in sync with the code they document," built from 1.3 billion AST-level changes mined across 1,500 systems' full histories.[^wen-2019]

This is not the slide's vocabulary and is not being proposed as a replacement for it — it is corroboration. Two unrelated fields, digital-library science and software engineering, independently studied the same general failure — a restatement falling out of sync with the thing it restates — and gave it two different domain-specific names decades apart. That convergence is evidence the "source drift" phenomenon is a recognised, well-studied class of problem, not a novel observation needing a novel name.

---

## Structure drift, as the slide uses it, matches none of the three closest literatures checked

No literature found here names the specific referent the slide seems to intend by "structure drift": a governed document's own frontmatter or schema-conformant shape eroding over time, independent of whether its content or citations are accurate.

Three candidates were checked and each misses:

- **Schema drift**, the closest-sounding term, is a data-engineering concept scoped to ETL pipelines: "your sources often change metadata. Fields, columns, and types can be added, removed, or changed on the fly," breaking transformations built against fixed column names.[^adf-schema-drift] It is the right _shape_ of idea — a container's structure diverging from what a downstream consumer expects — but every definition found is about tabular or semi-structured pipeline data, never about markdown frontmatter or document schemas.
- **Knowledge drift**, from a 2021 machine-learning paper, names structural change too — but structural change to a hierarchical classifier's concept hierarchy, decomposed into "concept addition, concept removal, relation addition, and relation removal" in a DAG of is-a relations.[^bontempelli-2021] This is a taxonomy of ML training labels drifting, not a document's own field structure.
- **Code-comment inconsistency**, covered above, is about content syncing between a description and what it describes — the same genus as content drift, already claimed for "source drift" — not about the shape of the description itself.

None of the three names "the schema of a governed document decaying over time." That referent, if the slide keeps it, is Han's own framing rather than a term this search found established anywhere.

[^klein-2014]: Klein M, Van de Sompel H, Sanderson R, Shankar H, Balakireva L, Zhou K, Tobin R (2014) "Scholarly Context Not Found: One in Five Articles Suffers from Reference Rot." PLOS ONE 9(12): e115253.

[^jones-2016]: Jones SM, Van de Sompel H, Shankar H, Klein M, Tobin R, Grover C (2016) "Scholarly Context Adrift: Three out of Four URI References Lead to Changed Content." PLOS ONE 11(12): e0167475.

[^seetharam-2025]: Seetha Ram GS (2025) "Citation Drift: Measuring Reference Stability in Multi-Turn LLM Conversations." Third Workshop for AI for Scientific Publications (WASP), ACL Anthology 2025.wasp-main.20.

[^wen-2019]: Wen F, Nagy C, Bavota G, Lanza M (2019) "A Large-Scale Empirical Study on Code-Comment Inconsistencies." IEEE/ACM ICPC 2019.

[^adf-schema-drift]: Microsoft, "Schema drift in mapping data flow — Azure Data Factory & Azure Synapse," Microsoft Learn.

[^bontempelli-2021]: Bontempelli A, Giunchiglia F, Passerini A, Teso S (2021) "Human-in-the-loop Handling of Knowledge Drift." arXiv:2103.14874.
