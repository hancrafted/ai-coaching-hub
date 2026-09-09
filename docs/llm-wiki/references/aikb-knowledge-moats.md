---
type: reference
title: Training-data density and code capability
description: What per-language code benchmarks and training-corpus composition studies show about training-data density, code-generation capability, and where the pattern breaks down.
tags: [code-generation, benchmarks, training-data, low-resource-languages, ai-enablement]
resource: https://arxiv.org/abs/2208.08227
sources:
  - id: multipl-e
    resource: https://arxiv.org/abs/2208.08227
    title: 'MultiPL-E: A Scalable and Polyglot Approach to Benchmarking Neural Code Generation'
  - id: the-stack
    resource: https://arxiv.org/abs/2211.15533
    title: 'The Stack: 3 TB of permissively licensed source code'
  - id: multipl-t
    resource: https://arxiv.org/abs/2308.09895
    title: Knowledge Transfer from High-Resource to Low-Resource Programming Languages for Code LLMs
  - id: cobol-coder
    resource: https://arxiv.org/abs/2604.03986
    title: 'COBOL-Coder: Domain-Adapted Large Language Models for COBOL Code Generation and Translation'
  - id: multi-swe-bench
    resource: https://arxiv.org/abs/2504.02605
    title: 'Multi-SWE-bench: A Multilingual Benchmark for Issue Resolving'
generated: { by: claude-code/sonnet-5, at: 2026-09-09T17:27:58Z }
status: draft
stale_after: 2026-09-23T17:27:58Z
---

# Training-data density and code capability

A restatement of what per-language code-generation benchmarks and open training-corpus documentation say about whether AI capability tracks training-data density. The claims here are the cited papers', not mine.

---

## Public code-training corpora are wildly uneven across languages, and COBOL is functionally absent from the largest one

The Stack — the 3 TB permissively-licensed corpus behind StarCoder — documents this directly: its per-language table lists 30 languages by data volume, and COBOL is not one of them.[^the-stack] The closest legacy comparator it does track, FORTRAN, survives deduplication at only 1.77 GB, next to HTML's 746 GB, JavaScript's 486 GB, Java's 271 GB and Python's 191 GB.[^the-stack] The paper names the skew as a limitation in its own words: "widely adopted programming languages like C and Javascript are overrepresented compared to niche programming languages like Julia and Scala," and its four largest languages — HTML, JavaScript, Java and C — consume more than 55% of the entire dataset's size.[^the-stack]

---

## Benchmarked code-generation capability tracks that representation, but loosely rather than deterministically

MultiPL-E, the benchmark that established per-language pass@1 comparison by translating HumanEval and MBPP into 18 further languages, states its own finding plainly: "Code generation performance is correlated with language popularity, but some niche languages perform as well as more popular languages."[^multipl-e] Its results carry the exception inside the headline: Lua ranks 9th of 19 languages on Codex pass@1 despite appearing in only 0.2% of measured GitHub activity and sitting outside TIOBE's top 20.[^multipl-e] Follow-on work that treats Julia, Lua, OCaml, R and Racket as a deliberate low-resource set opens from the same premise, stating that code LLMs "produce impressive results on programming languages that are well represented in their training data (e.g., Java, Python, or JavaScript)" but "struggle with low-resource languages that have limited training data available."[^multipl-t]

---

## COBOL is the sharpest confirming case: near-absent training data produces near-zero capability, and the researchers say so outright

A 2026 domain-adaptation study reports general-purpose models solving a bare fraction of COBOLEval's HumanEval-derived problems at pass@1 — GPT-4 at 15.75, GPT-4o at 16.40 — while StarCoder2, CodeGemma, CodeLlama-7B and DeepSeek-R1-Distill-Qwen all score 0.[^cobol-coder] The same paper attributes the gap to scarcity rather than task difficulty: "COBOL suffers from severe data scarcity in modern code corpora," its public volume is "orders of magnitude smaller than that of modern programming languages such as Java and Python," and their own curated COBOL training set — after filtering — totals roughly 38 million tokens against the multi-trillion-token pretraining corpora of mainstream code models such as StarCoder2 (3.3–4.3 trillion tokens) and DeepSeek-Coder (about 2 trillion tokens).[^cobol-coder] Fine-tuning on that curated data alone lifts pass@1 on the same benchmark to 49.33 — roughly three times GPT-4o's score — which is itself evidence that the ceiling is a data problem rather than a limit on what a similarly-sized model can do.[^cobol-coder]

---

## Web languages are among the best-represented in public code, and at the task MultiPL-E measures, JavaScript already matches Python

JavaScript and TypeScript combined (486 GB + 131 GB) outweigh Python's entire share of The Stack (191 GB), and HTML alone is nearly four times Python's size.[^the-stack] That abundance shows up in capability at the level MultiPL-E tests: Codex's JavaScript pass@1 exceeds its Python pass@1 by 2.3 percentage points (roughly 48.2% versus 45.9%), a gap the authors call "not significant" only because JavaScript is already at parity, not behind.[^multipl-e] At the level of translating a self-contained function from a docstring, the moat claim's premise holds — this is exactly the domain where training-data density is highest and capability follows it.

---

## But at the task that actually defines full-stack engineering — resolving real repository issues — JavaScript and TypeScript are the weakest languages measured, despite that same abundance

Multi-SWE-bench evaluates issue-resolution on 1,632 human-validated GitHub issues across seven languages, and the ranking inverts what corpus size would predict.[^multi-swe-bench] With Claude-3.7-Sonnet, the best-scoring agent scaffold resolves 45.80% of Python issues and 23.44% of Java issues, but only 11.16% of TypeScript issues and 4.78% of JavaScript issues — the two most data-rich languages in the entire corpus finish last or second-to-last among the seven languages tested.[^multi-swe-bench] The paper's own words are blunt about it: "TS and JS consistently yield the lowest resolved rates."[^multi-swe-bench]

---

## The researchers trace that weakness to language and tooling properties, not to data scarcity — the opposite mechanism the moat claim assumes

Multi-SWE-bench reserves a data-scarcity explanation for a different pair of languages, attributing C/C++'s difficulty to "limited exposure to low-level language features, such as memory management and pointer manipulation."[^multi-swe-bench] For JavaScript and TypeScript it gives a different account entirely: "dynamic typing, asynchronous execution, and diverse runtime behaviors," compounded by concrete tooling failures the paper documents directly — Tree-sitter unable to parse arrow-function syntax reliably, TypeScript repository listings that overrun a model's context window before fault localization can even start, and agent scaffolds that were tuned for Python first and carry that "method optimization bias" into every other language.[^multi-swe-bench] The paper also finds that a repository's language entropy predicts its resolved rate better than its raw size does, which is why large, standardized Java codebases score well while sprawling JavaScript ones do not.[^multi-swe-bench] None of that is a training-data story: it is evidence that a language can be saturated with public code and still be hard for today's agents to work in professionally.

[^multipl-e]: MultiPL-E: A Scalable and Polyglot Approach to Benchmarking Neural Code Generation.

[^the-stack]: The Stack: 3 TB of permissively licensed source code.

[^multipl-t]: Knowledge Transfer from High-Resource to Low-Resource Programming Languages for Code LLMs.

[^cobol-coder]: COBOL-Coder: Domain-Adapted Large Language Models for COBOL Code Generation and Translation.

[^multi-swe-bench]: Multi-SWE-bench: A Multilingual Benchmark for Issue Resolving.
