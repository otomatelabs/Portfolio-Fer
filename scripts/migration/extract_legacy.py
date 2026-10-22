"""One-time migration: static HTML site -> Astro content + verbatim fragments.

Reads the legacy pages from a directory (default: repo root at the pre-Astro commit) and writes:
  src/legacy/home.head.html, home.top.html, home.bottom.html   index.html split around the work grid
  src/legacy/project.head.html, project.top.html, project.footer.html   shared case-page chrome
  src/content/projects/<slug>.json   one entry per project-*.html (card fields + verbatim page HTML)

Usage: python3 scripts/migration/extract_legacy.py <legacy_dir>
"""
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LEGACY = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT


def rewrite_paths(s: str) -> str:
    """Relative URLs -> absolute, legacy project pages -> /projects/<slug>/."""

    def fix(m: re.Match) -> str:
        attr, quote, url = m.group(1), m.group(2), m.group(3)
        if re.match(r"^(https?:|mailto:|tel:|#|/|data:)", url):
            return m.group(0)
        if pm := re.match(r"^project-([a-z0-9-]+)\.html(#.*)?$", url):
            url = f"/projects/{pm.group(1)}/{pm.group(2) or ''}"
        elif url.startswith("index.html"):
            url = "/" + url[len("index.html"):]
        else:
            url = "/" + url
        return f"{attr}={quote}{url}{quote}"

    return re.sub(r'\b(href|src)=(["\'])([^"\']*)\2', fix, s)


def balanced(s: str, start: int, tag: str) -> int:
    """Index just past the closing tag that matches the opening <tag at `start`."""
    depth, i = 0, start
    pattern = re.compile(rf"<(/?){tag}\b[^>]*>", re.I)
    for m in pattern.finditer(s, start):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return m.end()
        i = m.end()
    raise ValueError(f"unbalanced <{tag}> from {start}")


def inner(s: str, open_re: str, tag: str) -> str:
    m = re.search(open_re, s)
    if not m:
        raise ValueError(f"not found: {open_re}")
    end = balanced(s, m.start(), tag)
    close = s.rfind(f"</{tag}>", m.end(), end)
    return s[m.end():close]


def text(fragment: str) -> str:
    return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", fragment))).strip()


def keyed(block: str, cls: str) -> dict | None:
    m = re.search(rf'<(\w+) class="{cls}"(?: data-i18n="([^"]+)")?[^>]*>(.*?)</\1>', block, re.S)
    if not m:
        return None
    return {"key": m.group(2), "text": text(m.group(3))}


def parse_cards(index_html: str) -> dict:
    cards = {}
    for order, m in enumerate(re.finditer(r'<a href="project-([a-z0-9-]+)\.html" class="work-card-link"', index_html)):
        block = index_html[m.start():balanced(index_html, m.start(), "a")]
        icon = re.search(r'<div class="work-card-icon">\s*(<svg.*?</svg>)\s*</div>', block, re.S).group(1)
        cards[m.group(1)] = {
            "order": order,
            "icon": icon,
            "tags": re.findall(r'<span class="work-card-tag">(.*?)</span>', block),
            "title": keyed(block, "work-card-title"),
            "desc": keyed(block, "work-card-desc"),
            "metric": keyed(block, "work-card-metric"),
            "tech": keyed(block, "work-card-tech"),
            "cta": keyed(block, "work-card-arrow"),
        }
    return cards


def body_between(s: str, start_marker: str, end_marker: str) -> str:
    a = s.index(start_marker)
    b = s.index(end_marker, a)
    return s[a:b]


def main() -> None:
    out_legacy = ROOT / "src/legacy"
    out_content = ROOT / "src/content/projects"
    out_legacy.mkdir(parents=True, exist_ok=True)
    out_content.mkdir(parents=True, exist_ok=True)

    index_html = (LEGACY / "index.html").read_text()
    head = inner(index_html, r"<head>", "head")
    grid_open = re.search(r'<div class="work-grid"[^>]*>', index_html)
    grid_close = balanced(index_html, grid_open.start(), "div")
    body_start = index_html.index(">", index_html.index("<body")) + 1
    scripts = index_html.index('<script src="i18n.js">')
    (out_legacy / "home.head.html").write_text(rewrite_paths(head))
    (out_legacy / "home.top.html").write_text(rewrite_paths(index_html[body_start:grid_open.end()]))
    (out_legacy / "home.bottom.html").write_text(rewrite_paths(index_html[grid_close - len("</div>"):scripts]))
    cards = parse_cards(index_html)

    pages = sorted(LEGACY.glob("project-*.html"))
    sample = (LEGACY / "project-huawei.html").read_text()
    p_head = inner(sample, r"<head>", "head")
    p_head = re.sub(r"\s*<title>.*?</title>", "", p_head, flags=re.S)
    (out_legacy / "project.head.html").write_text(rewrite_paths(p_head))
    p_body_start = sample.index(">", sample.index("<body")) + 1
    (out_legacy / "project.top.html").write_text(rewrite_paths(sample[p_body_start:sample.index('<header class="project-hero">')]))
    (out_legacy / "project.footer.html").write_text(
        rewrite_paths(body_between(sample, '<footer class="footer">', '<script src="i18n.js">'))
    )

    for page in pages:
        slug = page.stem.removeprefix("project-")
        s = page.read_text()
        hero = inner(s, r'<div class="project-hero-content"[^>]*>', "div")
        hero_attrs = re.search(r'<div class="project-hero-content"([^>]*)>', s).group(1)
        entry = {
            "slug": slug,
            "format": "legacy",
            "listed": slug in cards,
            "pageTitle": html.unescape(re.search(r"<title>(.*?)</title>", s, re.S).group(1)),
            "title": keyed(hero, "project-title")["text"],
            "subtitle": (keyed(hero, "project-subtitle") or {}).get("text"),
            "tags": re.findall(r'<span class="project-tag">(.*?)</span>', hero),
            "card": cards.get(slug),
            "legacy": {
                "heroAttrs": hero_attrs,
                "heroHtml": rewrite_paths(hero),
                "mainHtml": rewrite_paths(inner(s, r'<div class="project-main">', "div")),
                "sidebarHtml": rewrite_paths(inner(s, r'<aside class="project-sidebar">', "aside")),
                "bodyAttrs": re.search(r'<div class="project-body-inner"([^>]*)>', s).group(1),
            },
        }
        (out_content / f"{slug}.json").write_text(json.dumps(entry, ensure_ascii=False, indent=2) + "\n")
        print(f"{slug:14} listed={entry['listed']!s:5} order={(entry['card'] or {}).get('order')}")


if __name__ == "__main__":
    main()
