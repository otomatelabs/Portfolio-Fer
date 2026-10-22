// Old URLs (/project-<slug>.html) keep working on GitHub Pages, which has no server-side redirects.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getProjects, projectUrl } from '../lib/projects';

export const getStaticPaths = (async () => {
  const projects = await getProjects();
  return projects.map((p) => ({ params: { legacy: `project-${p.data.slug}` }, props: { to: projectUrl(p.data.slug) } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) => {
  const to = new URL(props.to as string, site).href;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Otomate Labs</title>
<link rel="canonical" href="${to}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(props.to)} + location.hash);</script>
</head>
<body><a href="${to}">${to}</a></body>
</html>
`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};
