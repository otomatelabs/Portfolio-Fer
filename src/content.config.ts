import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Bilingual string. The LinkedIn pipeline always writes both languages.
const L = z.object({ es: z.string().min(1), en: z.string().min(1) });
// Home grid: one category per case (drives the filter) and an optional "featured" flag (max 3 on the home).
const category = z.enum(['compliance', 'automation', 'data', 'ai', 'infra', 'custom']);
const keyed = z.object({ key: z.string().nullable(), text: z.string() }).nullable();

// Pre-Astro case studies: card fields are structured, page body is the original HTML (translated by i18n.js keys).
const legacy = z.object({
  slug: z.string(),
  format: z.literal('legacy'),
  listed: z.boolean(),
  category,
  featured: z.boolean().default(false),
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

// Pipeline-generated case studies ("expediente" structure). Every field is data; the template owns all markup.
const sourceType = z.enum(['oficial', 'despacho', 'prensa', 'publicacion', 'gremio', 'proveedor']);
// Numbered list shown at the end; evidence and times point to it by position (1-based), so a claim can never cite a
// source that is not listed.
const source = z.object({
  title: z.string(),
  url: z.url(),
  date: z.string().nullable(),
  type: sourceType,
});
const evidence = z.object({ claim: L, source: z.number().int().min(1) });
// Every time on the page says where it comes from: a working assumption, a measurement of this project, or a source.
const step = z
  .object({
    text: L,
    minutes: z.number().min(0),
    basis: z.enum(['assumption', 'measured', 'source']).default('assumption'),
    ref: z.number().int().min(1).optional(),
  })
  .refine((s) => s.basis !== 'source' || s.ref !== undefined, { message: 'a sourced time needs `ref`' });
const media = z.object({ src: z.string(), alt: L, caption: L.optional() });
const lines = z.array(L).min(1);

const v2 = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    format: z.literal('v2'),
    listed: z.boolean().default(true),
    category,
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    date: z.coerce.date(),
    niche: z.string(),
    title: L,
    subtitle: L,
    // Idea score from the research stage. Optional: shown only when the pipeline (or the author) has a real one.
    score: z
      .object({ value: z.number(), max: z.number(), breakdown: z.array(z.object({ label: L, value: z.number() })).default([]) })
      .optional(),
    tags: z.array(z.string()).min(1).max(4),
    demoUrl: z.url(),
    repoUrl: z.url().nullable().default(null),
    video: z.object({ src: z.string(), poster: z.string() }).nullable().default(null),
    gallery: z.array(media).default([]),
    card: z.object({ icon: z.string(), desc: L, metric: L, tech: z.string() }),
    problem: z.object({ statement: z.object({ who: L, process: L, fails: L, consequence: L }) }),
    evidence: z.array(evidence).min(2),
    process: z.object({
      note: L.optional(),
      noteRef: z.number().int().min(1).optional(),
      before: z.array(step).min(1),
      after: z.array(step).min(1),
    }),
    why: z.object({ reasons: lines, approval: L }),
    notAutomated: lines,
    solution: z.object({
      summary: L,
      inputs: lines,
      rules: lines,
      outputs: lines,
      components: z.array(z.string()).min(1),
      safeguards: lines,
      testData: L,
      decisions: lines,
    }),
    metrics: z
      .array(z.object({ name: L, how: L, baseline: L, target: L, result: L }))
      .min(1),
    metricsNote: L.optional(),
    existing: z.object({
      items: z.array(z.object({ name: z.string(), url: z.url(), what: L })).min(1),
      differentiator: L,
    }),
    risks: z.array(L).default([]),
    nextFeatures: z.array(L).default([]),
    sources: z.array(source).min(3),
    sidebar: z.object({
      client: L,
      duration: L,
      role: L,
      metric: z.object({ value: z.string(), label: L }),
      stack: z.array(z.string()).min(1),
    }),
  })
  .superRefine((c, ctx) => {
    const n = c.sources.length;
    const check = (ref: number | undefined, path: (string | number)[]) => {
      if (ref !== undefined && ref > n) ctx.addIssue({ code: 'custom', path, message: `source ${ref} is not in \`sources\` (${n})` });
    };
    c.evidence.forEach((e, i) => check(e.source, ['evidence', i, 'source']));
    c.process.before.forEach((s, i) => check(s.ref, ['process', 'before', i, 'ref']));
    c.process.after.forEach((s, i) => check(s.ref, ['process', 'after', i, 'ref']));
    check(c.process.noteRef, ['process', 'noteRef']);
  });

const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: z.discriminatedUnion('format', [legacy, v2]),
});

export const collections = { projects };
