# Aryan Software Solutions — Corporate Website

<div align="center">

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![Pages](https://img.shields.io/badge/pages-6-blue)
![Dark%20Mode](https://img.shields.io/badge/dark%20mode-✓-blueviolet)
![Formspree](https://img.shields.io/badge/forms-Formspree-orange)
![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)

**Enterprise software development, AI, cybersecurity, cloud & IoT solutions.**

[🌐 Live Site](https://aryan-solutions.vercel.app) · [📋 Roadmap](./ROADMAP.md) · [📬 Contact](mailto:sriaryan.dev@gmail.com)

</div>

---

## Overview

A production-grade, multi-page corporate website built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build step. Features a full dark/light mode system, Formspree-wired contact forms, an interactive project case study modal, an infinite-scroll tech marquee, and smooth scroll animations throughout.

> **Tagline:** Innovate. Develop. Secure.

---

## Pages

| Page | File | Description |
|------|------|-------------|
|  Home | `index.html` | Hero + CTAs, tech marquee, company overview, services, featured projects, stats, process steps, CTA |
|  About | `about.html` | Company story, mission/vision cards, leadership timeline |
|  Services | `services.html` | 8 detailed service offerings with tech tags and inquiry links |
|  Projects | `projects.html` | 7 case studies with filter bar, KPI bars, and interactive dashboard modal |
|  Careers | `careers.html` | Culture, benefits, open roles, internship program, and application form |
|  Contact | `contact.html` | Contact form (Formspree), business info, social links |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Structure** | Semantic HTML5 |
| **Styling** | Vanilla CSS with BEM methodology + CSS Custom Properties |
| **Interactivity** | Vanilla JavaScript (ES6+) |
| **Icons** | [Lucide Icons](https://lucide.dev) (CDN) |
| **Fonts** | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) |
| **Forms** | [Formspree](https://formspree.io) (`xpqvqqww`) |
| **Utilities** | Tailwind CSS CDN (services + projects pages only) |
| **Deployment** | [Vercel](https://vercel.com) |

---

## Key Features

###  Design System
- Full **dark / light mode** toggle — persists via `localStorage`, respects `prefers-color-scheme`
- Anti-flash inline script prevents theme flicker on page reload
- CSS Custom Property tokens for colors, spacing, shadows, and radii
- Smooth 250ms theme transitions on all key surfaces
- Custom themed scrollbars for both modes

###  Interactions
- Infinite-scroll **dual-row tech marquee** (rows scroll in opposite directions) with edge fade masks
- **IntersectionObserver** scroll-triggered fade/slide animations on all sections
- Animated statistics counters (count-up on scroll)
- Interactive **Project Dashboard Modal** — tab navigation (Overview · Features · Architecture · Results), animated KPI metrics, live terminal log simulation
- Category **filter bar** on projects page (AI/ML · Cybersecurity · IoT · Web)
- KPI progress bars that animate in on scroll

###  Forms
- Real-time field validation with inline error messages
- Async Formspree submission — no page reload
- Button loading state ("Sending…") during submission
- Auto-dismiss success banner after 6 seconds
- Form auto-resets after successful submission

###  Layout & Responsive
- Fully responsive across mobile (375px), tablet (768px), and desktop (1280px+)
- Sticky glassmorphism header with scroll shadow
- Mobile slide-in drawer navigation
- CSS Grid + Flexbox layouts throughout
- `loading="lazy"` on all images

### ♿ Accessibility
- Semantic HTML5 (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`)
- Skip-to-content link on every page
- `aria-label`, `aria-current`, `aria-expanded`, `role` attributes throughout
- Focus-visible states on all interactive elements
- Screen-reader-only text where needed

### 🔍 SEO
- Unique `<title>` and `<meta description>` per page
- Open Graph + Twitter Card tags on all pages
- JSON-LD Schema.org structured data (Organization, ContactPage, Service, AboutPage)
- `sitemap.xml` + `robots.txt`
- Canonical URLs on all pages
- PWA manifest + `apple-touch-icon` + `theme-color`

---

## Folder Structure

```
/
├── index.html              # Homepage
├── about.html              # About Us
├── services.html           # Services
├── projects.html           # Project Portfolio
├── careers.html            # Careers
├── contact.html            # Contact
├── manifest.json           # PWA manifest
├── sitemap.xml             # Search engine sitemap
├── robots.txt              # Crawler directives
├── ROADMAP.md              # Planned improvements + known bugs
├── logo-v4.png             # Primary logo
└── assets/
    ├── css/
    │   ├── main.css        # Primary stylesheet (v17) — all styles + dark mode
    │   ├── variables.css   # CSS custom property tokens
    │   ├── components.css  # Reusable component styles
    │   └── pages.css       # Page-specific overrides
    ├── js/
    │   ├── main.js         # Core JS — theme toggle, forms, animations, slider
    │   └── network.js      # Canvas network background animation
    ├── images/
    │   ├── projects/       # Project mockup screenshots (PNG)
    │   │   ├── kirana-management.png
    │   │   ├── ai-cctv.png
    │   │   └── smart-parking.png
    │   └── og-image.svg    # Social share preview image
    ├── icons/
    │   └── favicon.svg     # Browser tab icon
    └── videos/             # Reserved for future video content
```

---

## Local Development

No build step required. Open any HTML file directly in a browser, or use a local server for accurate behaviour:

```bash
# Option 1 — Python (built-in)
python -m http.server 8080

# Option 2 — Node.js
npx serve .

# Option 3 — VS Code
# Install "Live Server" extension → right-click index.html → "Open with Live Server"
```

Then visit: **`http://localhost:8080`**

> ⚠️ **Important:** Formspree form submissions will be blocked when running from `file://` — only works from `http://` or `https://`. Use a local server or the Vercel deployment for real form testing.

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#2563EB` | Buttons, links, accents |
| `--color-secondary` | `#1E293B` | Headings, dark surfaces |
| `--color-accent` | `#0EA5E9` | Sky blue highlights |
| `--color-bg` | `#FFFFFF` / `#0F172A` | Page background (light/dark) |
| `--color-bg-light` | `#F8FAFC` / `#1E293B` | Section alt background |
| `--color-text` | `#1E293B` / `#F1F5F9` | Body text |
| `--color-text-muted` | `#64748B` / `#94A3B8` | Secondary text |
| `--color-border` | `#E2E8F0` / `#334155` | Borders, dividers |

---

## CSS Architecture

The site uses a **multi-file CSS setup** where `main.css` is the primary compiled sheet (imported by all HTML pages). A separate Tailwind CSS CDN is loaded only on `services.html` and `projects.html` for utility classes — dark mode overrides for those pages are handled via inline `<style>` blocks with `!important` to beat the Tailwind cascade.

The CSS cache-buster version is currently **`?v=17`** on all HTML pages.

---

## Deployment

The site is deployed on **Vercel** via GitHub integration. Every push to `main` triggers an automatic redeploy.

### Before Going Live on a Custom Domain

1. **Update domain** — replace `aryansoftware.com` with your real domain across `sitemap.xml`, `robots.txt`, and all canonical/OG meta tags in every HTML file
2. **Update email** — replace `contact@aryansoftware.com` with a real working email
3. **Create a square logo** — `logo-icon-192.png` and `logo-icon-512.png` for PWA manifest
4. **Create `og-social.png`** — 1200×630px social share image (logo + tagline on brand blue)
5. **Create `404.html`** — branded not-found page
6. **Convert images to WebP** — reduce the ~1.8MB PNGs:
   ```bash
   cwebp kirana-management.png -o kirana-management.webp -q 85
   ```
7. **Minify assets** for maximum performance:
   ```bash
   npx csso assets/css/main.css -o assets/css/main.min.css
   npx terser assets/js/main.js -o assets/js/main.min.js -c -m
   ```
8. **Add Google Analytics 4** tracking ID
9. **Run Lighthouse** — target 95+ on Performance, Accessibility, SEO

> 📋 See [ROADMAP.md](./ROADMAP.md) for a complete list of planned improvements and known bugs.

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome (latest) | ✅ Full |
| Firefox (latest) | ✅ Full |
| Safari (latest) | ✅ Full |
| Edge (latest) | ✅ Full |
| IE 11 | ❌ Not supported |

---

## License

© 2026 Aryan Software Solutions. All rights reserved.

Unauthorized reproduction, redistribution, or commercial use of this codebase is prohibited without explicit written permission from Aryan Software Solutions.
