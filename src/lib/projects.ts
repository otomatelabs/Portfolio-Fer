import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

// Drafts render only in `astro dev`, so the pipeline can preview a case before Gate 3.
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.filter((p) => p.data.format === 'legacy' || !p.data.draft || import.meta.env.DEV);
}

// Home grid: newest pipeline cases first (by date), then the legacy cases in their original order.
export function sortForGrid(projects: Project[]): Project[] {
  const listed = projects.filter((p) => p.data.listed && (p.data.format === 'v2' || p.data.card));
  const rank = (p: Project) => (p.data.format === 'v2' ? -p.data.date.getTime() : p.data.card!.order);
  const v2 = listed.filter((p) => p.data.format === 'v2').sort((a, b) => rank(a) - rank(b));
  const legacy = listed.filter((p) => p.data.format === 'legacy').sort((a, b) => rank(a) - rank(b));
  return [...v2, ...legacy];
}

export function projectUrl(slug: string): string {
  return `/projects/${slug}/`;
}

// "data-animate=\"fade-up\" data-duration=\"900\"" -> { 'data-animate': 'fade-up', ... }
export function parseAttrs(raw: string): Record<string, string> {
  return Object.fromEntries([...raw.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
}
