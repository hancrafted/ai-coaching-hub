// THROWAWAY PROTOTYPE. Mermaid sources for the talk's visuals.
//
// Colour discipline: verdict classes set a coloured `stroke` plus a low-alpha
// `fill` and never a text colour, so the same definition stays legible when
// Starlight flips between its dark and light themes (mermaid is re-initialised
// and re-rendered on that flip — see components/Mermaid.astro).

const VERDICT_CLASSES = `
  classDef solved stroke:#16a34a,stroke-width:2px,fill:#16a34a22
  classDef holding stroke:#d97706,stroke-width:2px,fill:#d9770622
  classDef split stroke:#2563eb,stroke-width:2px,fill:#2563eb22
  classDef amplified stroke:#dc2626,stroke-width:2px,fill:#dc262622
  classDef ghost stroke:#94a3b8,stroke-width:1px,stroke-dasharray: 6 4,fill:none
`;

/** §1.1 — four jobs, the fourth unfilled. */
export const fourJobs = `
flowchart LR
  C["Capture"] --> Cu["Curate"] --> R["Retrieve"] --> T["Trust"]
${VERDICT_CLASSES}
  classDef budgeted stroke:#2563eb,stroke-width:2px,fill:#2563eb22
  class C,Cu,R budgeted
  class T ghost
`;

/** §1.3 — the scoring rubric, before any AI verdict lands on it. */
export const failureModes = `
flowchart TB
  KB["A knowledge base<br/>that nobody trusts"]
  KB --> M1["1 · Individual protectionism<br/><small>knowledge as personal USP</small>"]
  KB --> M2["2 · Non-paid work for domain champions<br/><small>writing is nobody's job</small>"]
  KB --> M3["3 · Low discoverability,<br/>no verification of trust"]
  KB --> M4["4 · Low initial cost, high maintenance cost<br/><small>the living-document problem</small>"]
${VERDICT_CLASSES}
  class M1,M2,M3,M4 ghost
`;

/** §2.1 — the single most important image in the talk. The agent panel has no arrow back.
 *
 *  Two things here are load-bearing and easy to break:
 *  1. The panels must be SIDE BY SIDE with the human on the left, because the
 *     script's whole point is "the absence in the right-hand panel". Dropping
 *     the per-subgraph `direction` and adding an invisible `~~~` link between
 *     the two subgraphs is what pins that ordering — without it dagre has no
 *     constraint between them and stacks them vertically, in arbitrary order.
 *  2. Both panels must carry the same node count, so the difference reads as a
 *     missing *arrow* rather than as a smaller box. */
export const missingArrow = `
flowchart LR
  subgraph HUMAN["Human freelancer"]
    HB["Brief<br/><small>it's in the manual on Confluence</small>"] --> HW["Does the work"]
    HW -- "this page is wrong" --> HB
  end
  subgraph AGENT["Agent — whose first day is every day"]
    AB["Same brief,<br/>same stale page"] --> AW["Does the work"]
  end
  HUMAN ~~~ AGENT
${VERDICT_CLASSES}
  class HB,HW split
  class AB,AW amplified
`;

/** §2.2 — the triage. Row 3 is the hinge: one row, two opposite verdicts. */
export const triage = `
flowchart LR
  M2["2 · Champion tax<br/><small>unpaid work nobody had time for</small>"] --> V2["Solved<br/><small>drafting is nearly free</small>"]
  M1["1 · Protectionism<br/><small>the undocumented system was security</small>"] --> V1["Holding<br/><small>density predicts snippet skill,<br/>not engineering</small>"]
  M3["3 · Discoverability + trust<br/><small>couldn't find the page</small>"] --> V3A["Discoverability · Solved<br/><small>retrieval finds it</small>"]
  M3 --> V3B["Verification of trust · Amplified<br/><small>nothing says if it's true</small>"]
  M4["4 · Maintenance cost<br/><small>docs rotted, updating was manual</small>"] --> V4["Amplified<br/><small>generation outpaces verification</small>"]
${VERDICT_CLASSES}
  class V2,V3A solved
  class V1 holding
  class M3 split
  class V3B,V4 amplified
`;

/** §2.2 — the moat inversion. Ordered by corpus size, descending. */
export const moatInversion = `
xychart-beta
  title "Best-represented languages, worst resolution rates"
  x-axis ["JavaScript · 486 GB", "Python · 191 GB", "TypeScript · 131 GB"]
  y-axis "Multi-SWE-bench issues resolved (%)" 0 --> 50
  bar [4.78, 45.8, 11.16]
`;

/** §2.3 — the hot-swap experiment. One fixed model; only the index era changes. */
export const ragHotSwap = `
xychart-beta
  title "One fixed model, 82 world leaders, index era swapped"
  x-axis ["Right era (1)", "Right era (2)", "Wrong era (1)", "Wrong era (2)"]
  y-axis "Accuracy (%)" 0 --> 80
  bar [70, 68, 12, 4]
`;

/** §2.3 — what crossing the line actually looks like, against what we have. */
export const standardsTimeline = `
timeline
  title Converging is not standardised
  section Dublin Core — under a named body
    1995 : Metadata workshop
    1998 : RFC 2413
    After : ANSI/NISO Z39.85 : ISO 15836
  section Today's formats — none across the line
    2026 : OKF, 29 days old, six commits, one contributor, no releases
         : llms.txt, still calls itself a proposal after two years
         : MCP, named owner under the Linux Foundation, not ratified
         : AGENTS.md, 60,000+ repos, smallest standardisation claim of any
`;

/** §2.3 / §3.2 — get the names right, and flag which one is ours. */
export const driftModes = `
flowchart TB
  RR["Reference rot<br/><small>Klein et al. 2014</small>"]
  RR --> LR["Link rot<br/><small>the target is gone</small>"]
  RR --> CD["Content drift<br/><small>the target still resolves,<br/>but no longer says what you cited</small>"]
  SD["Structure drift<br/><small>a governed document's own frontmatter eroding<br/>— our coinage, said out loud</small>"]
  NO["Citation drift<br/><small>NOT ours — already claimed for<br/>LLMs fabricating references</small>"]
${VERDICT_CLASSES}
  class RR,LR,CD split
  class SD holding
  class NO amplified
`;

/** §3.4 — the demo, as interaction rather than architecture. */
export const demoFlow = `
sequenceDiagram
  autonumber
  actor You
  participant Agent
  participant U as Ungoverned file
  participant G as Governed file
  You->>Agent: One query, asked twice
  Agent->>U: read
  U-->>Agent: a stale fact, no trust metadata
  Agent-->>You: answers with full confidence
  You->>Agent: same query, governed file
  Agent->>G: read
  G-->>Agent: stale_after and verified.by, guaranteed present
  Agent-->>You: this document is past its date
  Note over Agent,G: then the hook, as the payoff — nobody asked it
  Agent->>G: --assess --now 2026-12-01T00:00:00Z
  G-->>Agent: REVIEW, plus the Rule's own intent string
  Agent-->>You: hands back the sentence, unprompted
`;

/** §4 — the statistic the whole argument rests on. */
export const staleFate = `
pie showData
  title How stale references actually got fixed
  "Code changed again and re-introduced what the docs described" : 47.6
  "Someone updated the documentation" : 39.1
  "The reference was deleted" : 13.3
`;

/** Whole-talk time budget. */
export const timeBudget = `
pie showData
  title 26 minutes, by section
  "1 · What is a knowledge base" : 4
  "2 · What has changed with AI" : 11
  "3 · How to address it" : 7
  "4 · Summary" : 4
`;

/** Whole-talk run of show. `crit` marks the two sections the script says never to cut. */
export const runOfShow = `
gantt
  title Run of show — 26 minutes against a 20-30 envelope
  dateFormat HH:mm:ss
  axisFormat %H:%M
  tickInterval 5minute
  section 1 · Recap
    1.1 Four jobs                :s11, 00:00:00, 40s
    1.2 The pre-AI situation     :s12, after s11, 50s
    1.3 Four failure modes       :s13, after s12, 150s
  section 2 · Changed with AI
    2.1 The amnesiac freelancer  :crit, s21, after s13, 120s
    2.2 The triage               :crit, s22, after s21, 330s
    2.3 State of the art         :s23, after s22, 210s
  section 3 · How to address
    3.1 The requirement, derived :s31, after s23, 40s
    3.2 What the harness is      :s32, after s31, 80s
    3.3 What it does not do      :s33, after s32, 120s
    3.4 The demo                 :crit, s34, after s33, 180s
  section 4 · Summary
    4 Relocated, not eliminated  :s41, after s34, 240s
`;

/** Every section traced to the corpus documents it leans on — the "cited-only" claim, drawn. */
export const argumentSpine = `
flowchart LR
  subgraph S["Sections making claims"]
    direction TB
    A13["§1.3"]
    A21["§2.1"]
    A22["§2.2"]
    A23["§2.3"]
    A32["§3.2"]
    A33["§3.3"]
    A4["§4"]
  end
  subgraph D["Corpus documents"]
    direction TB
    DC[("doc-cost")]
    KM[("knowledge-moats")]
    RAG[("rag")]
    DS[("docs-standards")]
    DD[("doc-drift")]
    KB[("okf-knowledge-bases")]
    TE[("token-economy-talk")]
    HR[("harness-readme")]
  end
  A13 --> DC
  A21 --> TE
  A22 --> KM
  A23 --> RAG
  A23 --> DS
  A23 --> DD
  A32 --> KB
  A32 --> HR
  A33 --> HR
  A4 --> DC
${VERDICT_CLASSES}
  class DC,KM,RAG,DS,DD,KB,TE,HR split
`;

export const DIAGRAMS: Record<string, string> = {
  fourJobs,
  failureModes,
  missingArrow,
  triage,
  moatInversion,
  ragHotSwap,
  standardsTimeline,
  driftModes,
  demoFlow,
  staleFate,
  timeBudget,
  runOfShow,
  argumentSpine,
};
