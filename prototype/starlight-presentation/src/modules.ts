// The two learning modules, expressed through the kit's LearningModule shape.
// This is the first real test of that container: module 1 is a timed talk
// script loaded from governed markdown, module 2 is an 18-beat scroll tower
// authored in code. See /findings for whether one shape actually held both.
import type { LearningModule } from './kit/module';
import { TOKEN_101_SOURCES } from './kit/tower/sources';
import { SOURCES, TALK } from './talk';

export const TALK_MODULE: LearningModule = {
  slug: 'talk',
  kind: 'presentation',
  title: TALK.title,
  description: TALK.description,
  blurb:
    'The 2026-09-15 all-hands talk, rendered three ways on one route — read it as a script, drive it as a run of show, or trace every claim to its source.',
  duration: `${TALK.totalMinutes} min`,
  status: 'live',
  sources: Object.entries(SOURCES).map(([id, s]) => ({
    id,
    title: s.title,
    resource: s.resource,
  })),
  origin: {
    repo: 'hancrafted/ai-coaching-hub',
    path: TALK.sourcePath,
    branch: 'map/10-llm-wiki',
  },
};

export const TOKEN_101_MODULE: LearningModule = {
  slug: 'token-101',
  kind: 'tower',
  title: 'The AI Token Economy',
  description:
    "AI can give you and the people you lead super powers, but it comes with hidden managing responsibilities you didn't sign up for.",
  blurb:
    'An 18-beat scroll tower: what a token is, why the meter is hidden, how context windows fill, and what one bug fix actually costs across four models.',
  duration: '~25 min',
  status: 'live',
  sources: TOKEN_101_SOURCES,
  origin: { repo: 'hancrafted/coaching-content', path: 'ai-token-economy-101/index.html' },
};

// Two-tier hub pattern, harvested from coaching-content/index.html: one
// featured live row, then deliberately non-clickable placeholders.
export const COMING_SOON: LearningModule[] = [
  {
    slug: 'loop-engineering-101',
    kind: 'tower',
    title: 'Loop Engineering 101',
    description: 'Autonomous agents in a self-improving loop.',
    blurb:
      "Exists as a third page in the harvested repo, deliberately left out of this prototype's scope. The discipline's name isn't settled yet either — see S2.3.",
    status: 'coming-soon',
    origin: { repo: 'hancrafted/coaching-content', path: 'loop-engineering-101/index.html' },
  },
  {
    slug: 'prompt-engineering-101',
    kind: 'presentation',
    title: 'Prompt Engineering 101',
    description: 'How to talk to the AI — phrasing, examples, and the right ask.',
    blurb: 'The 2022–23 discipline, still the one most teams skip straight past.',
    status: 'coming-soon',
    origin: {},
  },
];

export const MODULES: LearningModule[] = [TALK_MODULE, TOKEN_101_MODULE, ...COMING_SOON];
