# otomatelabs.com

Sitio de Otomate Labs en [Astro](https://astro.build), publicado en GitHub Pages con `.github/workflows/deploy.yml`.

## Estructura
| Ruta | Qué es |
|---|---|
| `src/content/projects/*.json` | Un caso de estudio por archivo. `format: "legacy"` = casos migrados (HTML original); `format: "v2"` = casos del pipeline (datos ES/EN) |
| `src/content.config.ts` | Esquema validado de ambos formatos |
| `src/components/CaseStudyV2.astro` | Plantilla de los casos v2 |
| `src/legacy/*.html` | Fragmentos verbatim del sitio estático original (nav, footer, secciones del home) |
| `src/pages/[legacy].html.ts` | Redirects de `/project-<slug>.html` a `/projects/<slug>/` |
| `public/` | CSS, JS e imágenes originales + `case-v2.css` |

## Comandos
```bash
npm run dev            # http://localhost:4321 (muestra también los casos con draft: true)
npm run build          # dist/
node scripts/visual-diff.mjs <carpeta_sitio_anterior> [reporte]   # regresión visual
```

## Agregar un caso
Crear `src/content/projects/<slug>.json` con `format: "v2"` (ver `ejemplo-v2.json`). `draft: true` lo muestra solo en dev.
El build falla si el JSON no cumple el esquema.
