# ai-coaching-hub

Publicly available coaching content from Han: a governed knowledge bundle in `docs/llm-wiki/`, and the compositions assembled out of it in `docs/presentations/`.

This file is the glossary and nothing else. Conventions for writing in the bundle live in [`docs/llm-wiki/schema.md`](docs/llm-wiki/schema.md); the harness's own vocabulary — Host harness, Operator, Contributor, Rule, Governed file — lives in its README and is not restated here.

## Language

### Documentation decay

**Link rot**:
A citation whose target no longer exists. Borrowed from the scholarly-citation literature, where it is one half of _reference rot_.
_Avoid_: dead link, broken reference

**Content drift**:
A citation whose target still resolves but no longer says what was cited. The other half of _reference rot_.
_Avoid_: citation drift, staleness

**Structure drift**:
A governed document's own frontmatter or conformant shape eroding over time. Our coinage — no literature names it, so we say that out loud rather than implying borrowed provenance.

**Citation drift**:
Not ours to use. The name is already claimed, in this same AI space, for models fabricating references during extended interactions. Never use it for documentation decay.

### The standards landscape

**Format**:
A frontmatter vocabulary, such as OKF. Chosen over _standard_, which implies a named owner and a ratification process that nothing in this space has yet.
_Avoid_: standard, spec

**Converging**:
The true state of machine-readable documentation conventions — visible agreement on shape, with nothing having crossed into standardisation.
_Avoid_: standardised, established, mature

**Preset**:
A shipped config carrying no privileged status, which can be adopted, amended or deleted without changing how the tool behaves. The OKF Preset is not shipped as of `0.0.4`, so a hand-written config is what demonstrates the claim.

### Trust

**Promotion**:
Han reading a draft and vouching for it: `status: stable`, a `verified` block naming `human:han`, and a lengthened `stale_after`. Agents draft, only Han promotes, and the horizon is earned rather than granted.
_Avoid_: approval, review, sign-off

**Holding**:
The triage verdict for a failure mode AI has not meaningfully changed. Distinct from **Collapsing**, which the 2026-09-15 talk carried until the moat research refuted it.
