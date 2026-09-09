---
type: reference
title: Retrieval-augmented generation
description: >-
  How chunking, embedding, and top-K similarity search work in the original
  RAG paper, and why nothing in that scoring step reads a chunk's age,
  source, or verification state by default.
tags: [retrieval-augmented-generation, embeddings, vector-search, provenance, ai-enablement]
resource: https://arxiv.org/abs/2005.11401
sources:
  - id: rag-paper
    resource: https://arxiv.org/abs/2005.11401
    title: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020)
  - id: rag-survey
    resource: https://arxiv.org/abs/2312.10997
    title: 'Retrieval-Augmented Generation for Large Language Models: A Survey (Gao et al., 2023)'
  - id: pinecone-metadata
    resource: https://docs.pinecone.io/guides/search/filter-by-metadata
    title: Filter by metadata — Pinecone Docs
generated: { by: claude-code/sonnet-5, at: 2026-09-09T17:15:26Z }
status: draft
stale_after: 2026-09-23T17:15:26Z
---

# Retrieval-augmented generation

A restatement of what the paper that named retrieval-augmented generation, and the literature that followed it, establish about how the mechanism actually works. The claims below are the sources', not mine.

---

## Indexing turns a corpus into chunks and vectors before any query exists

Before a RAG system answers anything, its corpus is cut into fixed-size chunks and each chunk is embedded into a vector, independent of what will later be asked.[^rag-survey] The original implementation split every Wikipedia article into disjoint 100-word chunks and encoded each one with a BERT-based document encoder, producing roughly 21 million document vectors held in a single index.[^rag-paper] Later systems commonly chunk on a fixed token count instead — 100, 256, or 512 tokens are typical — trading a larger chunk's extra context against the noise and cost it adds.[^rag-survey] Either way, indexing happens once, up front, with no visibility into any future question.

---

## Retrieval scores each chunk by one number: how close its vector sits to the query's

At query time the same kind of encoder turns the query into a vector, and the retriever ranks chunks by the inner product between the query vector and each chunk's vector — nothing else enters the score.[^rag-paper] The original paper defines the retriever as pη(z|x) ∝ exp(d(z)ᵀq(x)), where d(z) and q(x) are both produced by BERT-based bi-encoders, and finding the top-K highest-scoring chunks is a Maximum Inner Product Search (MIPS) problem solved approximately over the index.[^rag-paper] The survey literature describes the same step at pipeline level: compute a similarity score between the query vector and every indexed chunk, then keep the top K.[^rag-survey] The score is a geometric distance between two embeddings — that is its complete definition.

---

## The retrieved chunks are concatenated straight into the generator's prompt

Once the top-K chunks are chosen, they are combined with the original query into one input and handed to the generator, becoming its context. The original paper states this plainly for its own architecture: to combine the query with the retrieved content, the two are simply concatenated before generation.[^rag-paper] The survey describes the same step at the pipeline level — the posed query and the selected chunks are synthesized into one prompt, which the model then answers, drawing on the injected text and, depending on the task, its own parametric knowledge as well.[^rag-survey] Nothing happens between retrieval and generation beyond this assembly: no independent check of what got retrieved.

---

## Nothing in that scoring step reads recency, provenance, or verification state

The retriever's entire account of a passage is the vector d(z) — the output of a document encoder trained to place semantically similar text nearby in vector space, computed from the passage's text and nothing else.[^rag-paper] The score pη(z|x) is a function of exactly two embeddings; there is no third term for when the passage was written, where it came from, or whether anyone has confirmed it still holds. A chunk written yesterday and a chunk written five years ago compete on identical footing if their text sits equally close to the query, because the mechanism has no dimension along which to tell them apart — that was never part of what it measures.

---

## The paper's own hot-swap experiment shows exactly what that buys, and what it doesn't

The authors demonstrate that RAG's knowledge can be updated by replacing its index wholesale, and their own numbers show that this is the only lever the mechanism has for currency. They built one index from a December 2016 Wikipedia dump and another from December 2018, then queried a single fixed RAG model about 82 world leaders whose positions had changed between the two dates.[^rag-paper] Matched to the right-era index, the model answered correctly 70% and 68% of the time for 2016 and 2018 leaders respectively; matched to the wrong-era index, accuracy fell to 12% and 4%.[^rag-paper] The authors' own conclusion is that world knowledge is updated by simply replacing the non-parametric memory[^rag-paper] — an operation performed on the index from outside, not a judgment the retrieval step makes on its own. Nothing in the model noticed its index was out of date; a person had to know that and swap it.

---

## Metadata filtering and timestamp weighting exist, but as named additions to this pipeline, not as part of it

Later work names two techniques that address exactly the gap above, and frames both explicitly as enhancements layered onto the pipeline described here, not as features of it. Chunks can be enriched at indexing time with metadata such as timestamp, author, or category; retrieval can then be filtered against that metadata, and assigning different weights to document timestamps during retrieval is what this literature calls time-aware RAG, built specifically to keep knowledge fresh and avoid outdated information.[^rag-survey] A production vector store bears this out operationally: a metadata filter narrows the candidate set before similarity scoring runs at all, and a numeric field such as a stored year can be filtered with ordinary comparison operators — but results are still ordered by semantic similarity, and no recency- or date-based ordering ships as a default part of the search.[^pinecone-metadata] Every one of these is something a system builder adds on top; none of it is emitted by chunking, embedding, and top-K similarity search on their own.

[^rag-paper]: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020).

[^rag-survey]: Retrieval-Augmented Generation for Large Language Models: A Survey (Gao et al., 2023).

[^pinecone-metadata]: Filter by metadata — Pinecone Docs.
