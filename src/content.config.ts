import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Bilingual string. The LinkedIn pipeline always writes both languages.
const L = z.object({ es: z.string().min(1), en: z.string().min(1) });
const keyed = z.object({ key: z.string().nullable(), text: z.string() }).nullable();

// Pre-Astro case studies: card fields are structured, page body is the original HTML (translated by i18n.js keys).
const legacy = z.object({
  slug: z.string(),
  format: z.literal('legacy'),
  listed: z.boolean(),
  pageTitle: z.string(),
  title: z.string(),
  subtitle: z.string().nullable().optional(),
  tags: z.array(z.string()),
  card: z
    .object({
      order: z.number(),
      icon: z.string(),
      tags: z.array(z.string()),
      title: keyed,
      desc: keyed,
      metric: keyed,
      tech: keyed,
      cta: keyed,
    })
    .nullable(),
  legacy: z.object({
    heroAttrs: z.string(),
    heroHtml: z.string(),
    mainHtml: z.string(),
    sidebarHtml: z.string(),
    bodyAttrs: z.string(),
  }),
});

// Pipeline-generated case studies. Every field is data; the template owns all markup.
const evidence = z.object({
  claim: L,
  source: z.string(),
  url: z.url(),
  date: z.string(),
  type: z.enum(['oficial', 'despacho', 'prensa', 'publicacion', 'gremio']),
});
const step = z.object({ text: L, minutes: z.number().nullable(), assumption: z.boolean().default(false) });
const media = z.object({ src: z.string(), alt: L, caption: L.optional() });

const v2 = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  format: z.literal('v2'),
  listed: z.boolean().default(true),
  draft: z.boolean().default(false),
  date: z.coerce.date(),
  niche: z.string(),
  title: L,
  subtitle: L,
  tags: z.array(z.string()).min(1).max(4),
  demoUrl: z.url(),
  repoUrl: z.url().nullable().default(null),
  video: z.object({ src: z.string(), poster: z.string() }).nullable().default(null),
  gallery: z.array(media).default([]),
  card: z.object({ icon: z.string(), desc: L, metric: L, tech: z.string() }),
  problem: z.object({ statement: z.array(L).min(1), evidence: z.array(evidence).min(1) }),
  process: z.object({ before: z.array(step).min(1), after: z.array(step).min(1) }),
  built: z.object({ summary: L, bullets: z.array(L).min(1) }),
  notAutomated: z.array(L).min(1),
  risks: z.array(L).default([]),
  nextFeatures: z.array(L).default([]),
  sidebar: z.object({
    client: L,
    duration: L,
    role: L,
    metric: z.object({ value: z.string(), label: L }),
    stack: z.array(z.string()).min(1),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: z.discriminatedUnion('format', [legacy, v2]),
});

export const collections = { projects };
