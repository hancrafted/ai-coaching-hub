// THROWAWAY PROTOTYPE.
//
// The finding this file exists to prove: the governed presentation file needs
// *no* copy and no rewriting to render in Starlight. Its OKF frontmatter
// already carries `title` and `description`, which is all Starlight requires;
// the remaining OKF fields just have to be declared so the schema stops
// rejecting them as unknown keys.
//
// So the docs collection is pointed straight at `docs/presentations/` in the
// repo. Edit the real script, reload, see it. No sync step, nothing to drift.
import { i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** The OKF fields the `presentation` Rule in markdown-harness.config.yaml governs. */
const okfPresentationFields = z.object({
  // Optional, not required: <StarlightPage> validates its own frontmatter
  // against this same schema, and the prototype route is not a presentation.
  type: z.literal('presentation').optional(),
  tags: z.array(z.string()).optional(),
  sources: z
    .array(z.object({ id: z.string(), resource: z.string(), title: z.string() }))
    .optional(),
  generated: z.object({ by: z.string(), at: z.coerce.date() }).optional(),
  status: z.enum(['draft', 'stable']).optional(),
  stale_after: z.coerce.date().optional(),
  verified: z.object({ by: z.string(), at: z.coerce.date() }).optional(),
});

export const collections = {
  docs: defineCollection({
    loader: glob({ pattern: '**/*.md', base: '../../docs/presentations' }),
    schema: docsSchema({ extend: okfPresentationFields }),
  }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
