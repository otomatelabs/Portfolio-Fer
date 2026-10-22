> **Desactualizado (2026-10-21).** Este documento describe la paleta magenta anterior. La referencia vigente
> es el DESIGN.md de [`@otomatelabs/design`](https://github.com/otomatelabs/design), extraído del CSS en producción.

# Design System

## Overview

A dark-themed, committed-color portfolio for a cloud/automation/BI engineer. The surface is a deep violet-tinted dark base with solid coral, magenta, and violet brand accents matching the Logo.png palette. Typography pairs Sora (thin-weight display, geometric and straight) with Work Sans (body, clean and professional). No gradients — solid color blocks, thin section dividers, and generous whitespace create contrast. Built with bilingual EN/ES support, scroll-triggered animations, and a mobile hamburger menu.

## Theme

**Dark mode** (default) with **light/cream toggle**. The primary scene: a recruiter or prospective client opening their laptop in a coffee shop, scanning quickly for credibility signals (dark). Daytime office review switches to a warm cream palette. The theme toggle persists via localStorage and respects `prefers-color-scheme` on first visit.

**Scene (dark)**: Recruiter scanning at 9pm on a laptop in a dim room. The dark surface reduces eye strain.

**Scene (light)**: Client reviewing the portfolio mid-afternoon in a bright office. The cream palette feels like premium letterhead — warm, approachable, professional.

## Color

### Strategy: Full Palette, Dual Theme

Three brand colors (coral, magenta, violet) used as solid accents. Two complete palettes: dark (deep violet-tinted neutrals at ~8% lightness) and light cream (warm ivory neutrals tinted toward hue 85/90). The theme toggle switches between them seamlessly.

### Palette (OKLCH)

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `oklch(12% 0.02 300)` | Page background |
| `--color-bg-elevated` | `oklch(16% 0.025 300)` | Striped section backgrounds |
| `--color-surface` | `oklch(20% 0.03 300)` | Cards, elevated containers |
| `--color-surface-raised` | `oklch(26% 0.04 300)` | Hover states, active items |
| `--color-surface-hover` | `oklch(30% 0.05 300)` | Strong hover feedback |
| `--color-border` | `oklch(30% 0.06 300)` | Dividers, borders |
| `--color-border-subtle` | `oklch(22% 0.04 300)` | Hairline borders |
| `--color-text-primary` | `oklch(96% 0.01 60)` | Headlines, body text |
| `--color-text-secondary` | `oklch(75% 0.015 60)` | Descriptions, secondary text |
| `--color-text-tertiary` | `oklch(55% 0.02 300)` | Captions, metadata |
| `--color-text-muted` | `oklch(45% 0.02 300)` | Footer, subtle labels |

**Brand gradient colors:**

| Token | Value | Role |
|---|---|---|
| `--color-brand-coral` | `oklch(72% 0.18 30)` | Metrics, highlights, subtle accents |
| `--color-brand-magenta` | `oklch(62% 0.2 330)` | **Primary brand**. CTAs, links, hero label, active states |
| `--color-brand-violet` | `oklch(58% 0.18 280)` | Process numbers, gradient endpoints |
| `--color-brand-light` | `oklch(75% 0.15 330)` | Lighter magenta variant |
| `--color-brand-dark` | `oklch(48% 0.18 330)` | Darker magenta for hover |
| `--color-brand-bg` | `oklch(18% 0.08 330)` | Tinted backgrounds for brand elements |

### Usage Rules

- Never use `#000` or `#fff`. All neutrals tinted toward hue 300 (violet) at low chroma.
- Reduce chroma as lightness approaches 0 or 100.
- **No gradient text.** Gradient clipping via `background-clip: text` is banned. Use solid brand colors (coral, magenta, violet) for emphasis.
- Primary buttons use a magenta→violet gradient background with white text.
- Ghost buttons use an inset border with transparent background.
- Brand accent colors are used purposefully: coral for highlights and metrics, magenta for CTAs, violet for process steps.
- Contrast target: text-primary on bg ~8:1 (well above AA). Brand on bg ~3.5:1 for large text.

## Typography

### Typefaces

| Role | Font | Weights | Fallback |
|---|---|---|---|
| Display / Headlines | **Sora** | 200, 300, 400, 600 | system-ui, sans-serif |
| Body / UI | **Work Sans** | 300, 400, 500 | system-ui, sans-serif |

Sora at ExtraLight (200) creates a striking, premium editorial feel for hero headlines. Work Sans is clean, straight, and highly legible with excellent thin weight support.

### Scale

Base size: `16px` (1rem). Line height: `1.6` for body, `1.1`–`1.2` for headlines.

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `--text-display` | `4rem` (64px) | 700 | 1.1 | Hero headline |
| `--text-h1` | `3.25rem` (52px) | 700 | 1.15 | Project page titles |
| `--text-h2` | `2.25rem` (36px) | 700 | 1.2 | Section headings |
| `--text-h3` | `1.625rem` (26px) | 600 | 1.3 | Subsection headings |
| `--text-h4` | `1.375rem` (22px) | 600 | 1.4 | Card titles, hero subline |
| `--text-body` | `1.0625rem` (17px) | 400 | 1.6 | Paragraphs |
| `--text-body-sm` | `0.9375rem` (15px) | 400 | 1.6 | Secondary descriptions |
| `--text-caption` | `0.8125rem` (13px) | 500 | 1.5 | Tags, badges, meta |

### Hierarchy Rules

- Minimum 1.25x scale ratio between adjacent steps.
- Weight contrast alongside size: headlines 700, body 400, captions 500.
- Cap body line length at ~55ch for readability.
- All-caps reserved for caption-size badges and tags with `letter-spacing: 0.05em`.
- No em dashes in copy.

## Spacing

Base unit: `4px` (`0.25rem`). All values are multiples of this unit.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `0.25rem` (4px) | Icon padding, tight gaps |
| `--space-2` | `0.5rem` (8px) | Inline gaps |
| `--space-3` | `0.75rem` (12px) | Small padding |
| `--space-4` | `1rem` (16px) | Default padding, paragraph gaps |
| `--space-6` | `1.5rem` (24px) | Card padding, section gutters |
| `--space-8` | `2rem` (32px) | Large internal padding |
| `--space-10` | `2.5rem` (40px) | Medium section spacing |
| `--space-12` | `3rem` (48px) | Section gaps |
| `--space-16` | `4rem` (64px) | Large section gaps |
| `--space-20` | `5rem` (80px) | Major section padding |
| `--space-24` | `6rem` (96px) | Major section breaks |

Sections alternate between `--color-bg` and `--color-bg-elevated` backgrounds for visual rhythm. Same padding is avoided: sections use `var(--space-24)` for breathing room, interior elements use tighter spacing.

## Layout

### Grid

- Max content width: `1140px` (`--max-width`).
- Hero and contact sections are narrower (~600-780px) for focused reading.
- Project detail pages use a 1fr + 320px sidebar split with sticky positioning.
- CSS Grid for work cards, services, skills. Flexbox for nav, footer, inline layouts.

### Responsive Breakpoints

| Name | Width | Behavior |
|---|---|---|
| Mobile | < 768px | Single column, hamburger nav, reduced spacing, stacked CTAs |
| Tablet | 769px – 1024px | Single column work/project grids, nav visible, adjusted type scale |
| Desktop | > 1024px | Full multi-column layout, max spacing, sticky sidebar |

### Section Structure

1. **Nav** — Fixed, blurred background, logo left, links center-right, lang toggle right
2. **Hero** — Textured background (organic blobs + noise overlay), centered content, gradient-blob animation
3. **Metrics** — 4-column stat strip across elevated background
4. **Trusted By** — Logo text row
5. **Services** — 3-column card grid with featured middle card
6. **Professional Work** — 4-card grid linking to case study pages, first card emphasized
7. **More Professional** — Compact card for additional work
8. **Academic** — Compact card grid
9. **Skills** — 4-column category grid with color-accented top borders
10. **Process** — 4-column step layout with numbered indicators
11. **Tech Stack** — Centered flex-wrap pill grid
12. **Connect** — Centered social link
13. **Contact** — Centered dual CTA (email + booking)
14. **Footer** — Logo + tagline + links + copyright

## Elevation

No drop shadows as the default. Elevation is communicated through:
- **Color**: `--color-surface` vs `--color-bg` vs `--color-bg-elevated`
- **Border**: `--color-border` or `--color-border-subtle`
- **Spacing**: whitespace and proximity create hierarchy

Hover states use `transform: translateY(-2px)` on service cards, `-4px` to `-6px` on work cards. Work card hover adds a subtle box-shadow for depth.

## Motion

### Philosophy

Settling-in motion. Elements fade up or scale in on scroll with ease-out-quart. Hero animates immediately on load with staggered delays.

### Patterns

| Pattern | Properties | Duration | Easing |
|---|---|---|---|
| Fade up | `opacity`, `translateY(40px→0)` | `600–900ms` | `cubic-bezier(0.25, 1, 0.5, 1)` |
| Fade up small | `opacity`, `translateY(20px→0)` | `600ms` | ease-out-quart |
| Scale in | `opacity`, `scale(0.95→1)` | `600–700ms` | ease-out-quart |
| Slide right | `opacity`, `translateX(-30px→0)` | `600ms` | ease-out-quart |
| Stagger children | Same as parent | `600ms` + `stagger` delay | ease-out-quart |
| Hover lift | `translateY(-2px to -6px)` | `200ms` | ease-out-quart |
| Link underline | `scaleX(0→1)` on `::after` | `300ms` | ease-out-quart |
| Counter animate | Numeric count-up | `2000ms` | ease-out-quart |
| Blob float | `translate + scale` | `10–15s` | ease-in-out infinite |
| Hamburger → X | `rotate + translate + opacity` | `300ms` | ease-out-quart |

### Rules

- No animating CSS layout properties (`width`, `height`, `top`, `left`, `margin`). Use `transform` and `opacity`.
- Respect `prefers-reduced-motion: reduce`. Disable all scroll animations, blobs, counter animations. Hover effects become instant color changes.
- No bounce, no elastic easing.

## Components

### Buttons

- **Primary**: `background: linear-gradient(135deg, --color-brand-magenta, --color-brand-violet)`. Text: `--color-text-primary`. Border-radius: `0.5rem`. Hover: `translateY(-2px)` + magenta box-shadow. Focus: `2px solid --color-brand-magenta` outline.
- **Ghost**: Transparent background, `box-shadow: inset 0 0 0 1.5px --color-border`. Text: `--color-text-primary`. Hover: `--color-surface` background, `translateY(-2px)`.
- **Large**: `padding: 1rem 2rem`, `font-size: --text-h4`. Used in hero and contact CTAs.

### Navigation

- Fixed top bar with `backdrop-filter: blur(16px)` and `rgba(14, 12, 20, 0.85)` background.
- Links use gradient underline animation (coral→magenta on `::after` pseudo-element).
- **Active link**: Solid coral color with full-width underline. Set by scroll-spy IntersectionObserver.
- **Language toggle**: Small pill button with uppercase text, bordered. Hover highlights border in magenta.
- **Hamburger** (mobile only): Three-line icon animates to X on open. Fullscreen overlay menu with staggered link reveals.
- Mobile menu closes on link click, Escape key, or hamburger toggle. Body scroll locked when open.

### Cards (Work / Case Study)

- **Full work cards**: Gradient visual section (260px tall, 340px for first card), tags overlay, content below. Hover: `translateY(-6px)` + border highlight + shadow.
- **Compact work cards**: No visual section. Tag row + title + description + tech line. Used for academic and additional projects. Hover: `translateY(-4px)`.
- **First work card emphasized**: Taller visual (340px vs 260px), stronger border, more saturation in gradient.
- Background: `--color-surface`. Border: `1px solid --color-border-subtle`. Border-radius: `1rem`. No nested cards.

### Service Cards

- 3-column grid. Featured card (center) has magenta border, gradient background, subtle glow, larger icon with magenta→violet fill.
- Each card: icon circle (gradient background), title, description, rules-list with arrow bullet points.
- Hover: `translateY(-4px)`.

### Skills Categories

- 4-column grid. Each card has a 3px top border in brand colors (coral, magenta, violet, coral rotated).
- Title with bottom border. Skill pills in flex-wrap layout. Pills have hover lift + magenta border highlight.

### Tags / Badges

- Pill-shaped (`border-radius: 9999px`). Uppercase with `letter-spacing: 0.05em`.
- **Work card tags**: Dark semi-transparent background with white text (over gradient visual).
- **Compact card tags**: `--color-brand-bg` background with magenta text.
- **Service badge** ("Most requested"): Positioned absolute top-right, magenta text on brand-bg.

### Project Detail Pages

- **Hero**: Full-width gradient background, back link with arrow icon, tag row, large title, subtitle.
- **Body**: Two-column layout (main content + sticky sidebar). Main has `h2` section headings, prose paragraphs, bullet lists with magenta dot markers, placeholder image blocks.
- **Sidebar**: Sticky card with project details (type, duration, role, team/organization, metric highlight).

### Section Header

Reusable pattern: uppercase tag (coral/brand, `letter-spacing: 0.12em`), `h2` heading (Sora 300), optional subtext (max-width: 52ch). Can be left-aligned or centered.

## Bilingual Support (i18n)

- All text content uses `data-i18n` attributes referencing keys in `i18n.js`.
- `i18n.js` contains a JavaScript dictionary with EN and ES translation objects (~400+ keys).
- Language toggle in nav reads/writes `localStorage.setItem('lang')`. Default: ES.
- `applyLanguage()` walks all `[data-i18n]` elements and sets `textContent` from the dictionary.
- Navigates HTML `lang` attribute for screen readers.
- All 7 HTML pages (index + 6 project pages) load `i18n.js` before their other scripts.

## Accessibility

- WCAG 2.1 AA targeted. Dark theme achieves high contrast ratios (~8:1 for body text).
- All interactive elements have visible focus indicators (`2px solid --color-brand-magenta`, `outline-offset: 2px`).
- `prefers-reduced-motion: reduce` respected globally (disables scroll animations, blobs, counters).
- Hamburger button has `aria-label` and `aria-expanded` attributes.
- Logo images have `alt` text. SVG icons are decorative with `aria-hidden` by default.
- Color is never the sole means of conveying information.
- Keyboard navigation: all links focusable, hamburger closeable via Escape, mobile menu links trap focus.
