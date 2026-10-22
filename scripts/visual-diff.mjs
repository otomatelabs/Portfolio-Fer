// Visual regression: legacy static site (baseline) vs Astro build (dist/).
// Usage: node scripts/visual-diff.mjs <baseline_dir> [report_dir]
// Every legacy page is captured in 8 variants (desktop/mobile × dark/light × en/es) with reduced motion,
// so scroll animations and counters are deterministic. Writes an HTML report and exits 1 on any mismatch.
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, readdir } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const baselineDir = resolve(process.argv[2] ?? '');
const reportDir = resolve(process.argv[3] ?? 'visual-report');
const distDir = resolve('dist');
const TOLERANCE = 0.001; // max share of differing pixels (0.1%)

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml' };

function serve(root) {
  const server = createServer(async (req, res) => {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path.endsWith('/')) path += 'index.html';
    try {
      const body = await readFile(join(root, path));
      res.writeHead(200, { 'Content-Type': types[extname(path).toLowerCase()] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  });
  return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok({ server, url: `http://127.0.0.1:${server.address().port}` })));
}

const legacyPages = (await readdir(baselineDir)).filter((f) => /^project-.+\.html$/.test(f)).sort();
const pages = [['home', '/index.html', '/'], ...legacyPages.map((f) => [f.slice(8, -5), `/${f}`, `/projects/${f.slice(8, -5)}/`])];
const variants = [];
for (const [device, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]])
  for (const theme of ['dark', 'light'])
    for (const lang of ['en', 'es']) variants.push({ device, width, height, theme, lang });

async function capture(browser, base, path, v, file) {
  const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
  await ctx.addInitScript(({ theme, lang }) => {
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('lang', lang);
  }, v);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
  await ctx.close();
  return errors;
}

await mkdir(join(reportDir, 'img'), { recursive: true });
const [oldSite, newSite] = await Promise.all([serve(baselineDir), serve(distDir)]);
const browser = await chromium.launch();
const rows = [];

for (const [name, oldPath, newPath] of pages) {
  for (const v of variants) {
    const id = `${name}-${v.device}-${v.theme}-${v.lang}`;
    const [a, b, d] = ['old', 'new', 'diff'].map((k) => join(reportDir, 'img', `${id}.${k}.png`));
    const errors = [
      ...(await capture(browser, oldSite.url, oldPath, v, a)).map((e) => `old: ${e}`),
      ...(await capture(browser, newSite.url, newPath, v, b)).map((e) => `new: ${e}`),
    ];
    const imgA = PNG.sync.read(await readFile(a));
    const imgB = PNG.sync.read(await readFile(b));
    const w = Math.min(imgA.width, imgB.width);
    const h = Math.min(imgA.height, imgB.height);
    const crop = (img) => {
      const out = new PNG({ width: w, height: h });
      PNG.bitblt(img, out, 0, 0, w, h, 0, 0);
      return out;
    };
    const diff = new PNG({ width: w, height: h });
    const pixels = pixelmatch(crop(imgA).data, crop(imgB).data, diff.data, w, h, { threshold: 0.1 });
    await writeFile(d, PNG.sync.write(diff));
    const ratio = pixels / (w * h);
    const sizeMatch = imgA.width === imgB.width && imgA.height === imgB.height;
    const pass = sizeMatch && ratio <= TOLERANCE && errors.length === 0;
    rows.push({ id, ratio, pass, sizeMatch, sizes: `${imgA.width}×${imgA.height} → ${imgB.width}×${imgB.height}`, errors });
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${id.padEnd(40)} ${(ratio * 100).toFixed(3)}%  ${sizeMatch ? '' : rows.at(-1).sizes}${errors.length ? '  ' + errors.join(' | ') : ''}`);
  }
}

await browser.close();
oldSite.server.close();
newSite.server.close();

const failed = rows.filter((r) => !r.pass);
const report = `<!doctype html><html lang="es"><meta charset="utf-8"><title>Visual diff · Astro migration</title>
<style>
body{font:14px/1.5 system-ui;margin:0;background:#16131c;color:#eee}
header{padding:24px;position:sticky;top:0;background:#16131c;border-bottom:1px solid #333;z-index:1}
.pass{color:#5fd38d}.fail{color:#ff7a6b}
details{border-bottom:1px solid #2a2433;padding:8px 24px}
summary{cursor:pointer;display:flex;gap:16px}
.imgs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px}
.imgs img{width:100%;border:1px solid #333}
.imgs span{font-size:12px;color:#aaa}
</style>
<header><h1>Migración a Astro · diff visual</h1>
<p>${rows.length} capturas · <b class="pass">${rows.length - failed.length} iguales</b> · <b class="fail">${failed.length} con diferencias</b> · tolerancia ${TOLERANCE * 100}% de píxeles</p></header>
${rows
  .sort((x, y) => Number(x.pass) - Number(y.pass) || y.ratio - x.ratio)
  .map(
    (r) => `<details ${r.pass ? '' : 'open'}><summary><b class="${r.pass ? 'pass' : 'fail'}">${r.pass ? 'IGUAL' : 'DIFERENTE'}</b><span>${r.id}</span><span>${(r.ratio * 100).toFixed(3)}%</span><span>${r.sizeMatch ? '' : r.sizes}</span><span class="fail">${r.errors.join(' | ')}</span></summary>
<div class="imgs"><div><span>Antes (producción)</span><img loading="lazy" src="img/${r.id}.old.png"></div><div><span>Después (Astro)</span><img loading="lazy" src="img/${r.id}.new.png"></div><div><span>Diferencias (rojo)</span><img loading="lazy" src="img/${r.id}.diff.png"></div></div></details>`,
  )
  .join('\n')}`;
await writeFile(join(reportDir, 'index.html'), report);
console.log(`\n${rows.length - failed.length}/${rows.length} identical. Report: ${join(reportDir, 'index.html')}`);
process.exit(failed.length ? 1 : 0);
