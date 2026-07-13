# Aryan Software Solutions — Corporate Website

Production-ready multi-page corporate website for **Aryan Software Solutions**.

**Tagline:** Innovate. Develop. Secure.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, services overview, projects, stats, process, CTA |
| About | `about.html` | Company story, mission, vision, team, timeline |
| Services | `services.html` | 8 detailed service offerings |
| Projects | `projects.html` | 7 professional case studies |
| Careers | `careers.html` | Culture, benefits, jobs, internship, application form |
| Contact | `contact.html` | Contact form, business info, map placeholder |

## Folder Structure

```
/
├── index.html
├── about.html
├── services.html
├── projects.html
├── careers.html
├── contact.html
├── sitemap.xml
├── robots.txt
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── pages.css
│   │   └── main.css
│   ├── js/
│   │   ├── main.js
│   │   └── network.js
│   ├── images/
│   │   ├── projects/
│   │   └── og-image.svg
│   ├── icons/
│   │   └── favicon.svg
│   └── videos/
└── README.md
```

## Local Development

No build step required. Open any HTML file in a browser, or serve locally:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Visit `http://localhost:8080`

## Design System

- **Primary:** `#2563EB`
- **Secondary:** `#1E293B`
- **Accent:** `#0EA5E9`
- **Typography:** Inter (Google Fonts)
- **Style:** Modern corporate, minimal, enterprise-grade

## Features

- Independent multi-page navigation (not single-page scroll)
- Sticky navbar with scroll shadow
- Subtle hero network animation (Canvas)
- Scroll-triggered fade/slide animations
- Animated statistics counters
- Form validation (contact & careers)
- Fully responsive (mobile, tablet, desktop)
- SEO: meta tags, Open Graph, Twitter Cards, JSON-LD schema
- Accessibility: semantic HTML, skip links, ARIA labels, focus states
- Lazy-loaded images

## Production Deployment

Before going live:

1. **Update domain** in `sitemap.xml`, `robots.txt`, and canonical/OG URLs across all pages
2. **Replace contact details** (email, phone, address) with real business information
3. **Embed Google Maps** on `contact.html` (replace map placeholder)
4. **Connect forms** to a backend service (Formspree, Netlify Forms, custom API)
5. **Replace project SVGs** with real screenshots/photos
6. **Minify assets** for production:

```bash
npx csso assets/css/main.css -o assets/css/main.min.css
npx terser assets/js/main.js -o assets/js/main.min.js -c -m
npx terser assets/js/network.js -o assets/js/network.min.js -c -m
```

7. **Run Lighthouse audit** and target 95+ scores

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 Aryan Software Solutions. All rights reserved.
