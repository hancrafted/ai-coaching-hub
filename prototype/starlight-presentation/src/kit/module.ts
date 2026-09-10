// KIT — the smallest honest container for "a learning module".
//
// prototype 1's talk.ts:8 conceded that parsing prose into structure "would be
// the real feature", so there was no container type at all: talk.ts/sections.ts/
// diagrams.ts were hand-authored for exactly one talk. Prototype 2 has two
// modules of genuinely different shape (a timed talk script vs an 18-beat
// scroll tower), which is the first real test of whether ONE shape holds both.
//
// Deliberately NOT modelled: the body. `kind` discriminates and each renderer
// owns its own content type. Forcing a common body type is where this would stop
// being honest — recorded as a finding on /findings.

export interface Source {
  id: string;
  title: string;
  resource: string;
}

export interface LearningModule {
  slug: string;
  kind: 'presentation' | 'tower';
  title: string;
  /** One line — hub card and page description. */
  description: string;
  /** Hub-card supporting copy; longer than `description`. */
  blurb?: string;
  /** Reading / delivery time as shown on the hub. */
  duration?: string;
  status: 'live' | 'coming-soon';
  sources?: Source[];
  origin: { repo?: string; path?: string; branch?: string };
}
