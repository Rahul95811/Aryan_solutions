# Aryan Software Solutions — Complete Site Roadmap

> **Current Score: 6.5 / 10**
> **Target Score: 9.5 / 10**
> Last updated: 2026-07-16

---

## 🔴 Critical Bugs to Fix

These will break real user experience right now.

### BUG-1: `og-image.svg` Missing Real Content
- **File:** `assets/images/og-image.svg`
- **Problem:** All 6 pages point to this as their social share preview image. The file exists but is likely a blank/generic SVG — when anyone shares a link on WhatsApp, LinkedIn, Twitter, nothing meaningful shows.
- **Fix:** Replace with a 1200×630 px PNG/JPG showing the logo + tagline on a brand-blue background. Save as `assets/images/og-social.png` and update all 6 HTML `og:image` tags.

### BUG-2: Domain Mismatch — `aryansoftware.com` vs Actual Vercel URL
- **Problem:** Every HTML file has `canonical`, `og:url`, `og:image`, and Schema.org JSON-LD pointing to `https://aryansoftware.com` — which is not where the site lives (it's on Vercel). This confuses Google and breaks SEO indexing.
- **Files affected:** All 6 HTML files + `sitemap.xml`
- **Fix:** Either:
  - (A) Register `aryansoftware.com` and point it to Vercel — then canonical URLs are correct, **or**
  - (B) Replace all `aryansoftware.com` with your real Vercel domain (`aryan-solutions.vercel.app`) until a custom domain is ready.

### BUG-3: No 404 Page
- **Problem:** If a user types a wrong URL, Vercel shows a default ugly error. No branded fallback.
- **Fix:** Create `404.html` with the site header/footer and a friendly "Page Not Found" message + link back home.

### BUG-4: About Page Right Panel is Plain Text
- **File:** `about.html`, line 93-100
- **Problem:** The right panel in the "Company Story" section still shows raw text fallback ("Building the Future of Enterprise Software") with no SVG or visual — unlike the homepage overview panel which got the dashboard SVG.
- **Fix:** Add the same SVG dashboard visual (or a different company timeline/milestone graphic) to this panel.

### BUG-5: `sitemap.xml` Has Wrong URLs
- **Problem:** Sitemap references `aryansoftware.com` — Google will index the wrong domain.
- **Fix:** Update all URLs in `sitemap.xml` to match the real domain (Vercel or custom).

### BUG-6: Email Address is Placeholder
- **Problem:** `contact@aryansoftware.com` appears across all pages and in Schema.org — if this email doesn't actually work, contact attempts from the site go nowhere.
- **Fix:** Replace with the real working email address across all HTML files.

### BUG-7: `manifest.json` Icon Points to PNG Not Square
- **Problem:** `logo-v4.png` is likely a wide landscape logo. PWA specs require square icons (192×192 and 512×512). Non-square icons break Android homescreen installs.
- **Fix:** Create a square version of the logo as `logo-icon-192.png` and `logo-icon-512.png`. Update `manifest.json`.

---

## 🟠 High Priority Improvements

These are the ones that make the site feel "AI template" — fixing them bumps score from 6.5 → 8.5.

### VISUAL-1: Hero Section — Device Mockup with Real Screenshot
- **Current:** Animated text + SVG slides in the hero
- **Problem:** Zero real product imagery. Looks like a template.
- **What to add:** A laptop/browser frame containing a real screenshot from one of your projects (e.g., the Kirana dashboard). Float it beside the headline text, add a subtle tilt and drop shadow.
- **Implementation:**
  - Use `kirana-management.png` (already exists!) inside a CSS-styled laptop frame SVG
  - Position it in the hero right column
  - Animate it with `translateY` + `opacity` on load
- **Files:** `index.html`, `main.css`

### VISUAL-2: "Trusted By" Client Logo Strip
- **Current:** Nothing between hero and technologies section
- **Problem:** No social proof above the fold. Every serious agency site has this.
- **What to add:** A simple horizontal strip of 4-6 client/partner logos in muted grayscale (desaturated in light mode, slightly lightened in dark mode)
- **Implementation:**
  - Add a `<section class="client-logos">` after hero in `index.html`
  - Use PNG logos with CSS `filter: grayscale(1) opacity(0.5)` — hover restores color
  - On scroll — animate in with stagger
- **Files:** `index.html`, `main.css`

### VISUAL-3: Team / Leadership Section on About Page
- **Current:** About page has Company Story, Mission/Vision, and Timeline — no human faces.
- **Problem:** Nobody knows who's behind this company. Kills trust.
- **What to add:** 3-4 team cards with:
  - Real photo (or professional-looking avatar/illustration)
  - Name + role
  - LinkedIn icon link
  - Brief 1-line bio
- **Files:** `about.html`, `main.css`

### VISUAL-4: Project Case Study Pages (Individual)
- **Current:** Projects are only accessible via modal popup on `projects.html`
- **Problem:** No dedicated URLs, not indexable by Google, can't share individual projects
- **What to add:** Individual HTML files: `projects/kirana-management.html`, `projects/blood-bank-college.html` etc.
  - Full-width hero screenshot
  - Problem → Solution narrative
  - Architecture diagram (SVG)
  - Results metrics with charts
  - Tech stack table
  - Next/Prev project navigation
- **Files:** New `projects/` directory, update `projects.html` links

### VISUAL-5: Testimonials Section
- **Current:** No testimonials on any page
- **Problem:** Huge trust signal missing
- **What to add:** 3-column testimonials section on homepage with:
  - Quote text
  - Client name + company + photo
  - Star rating (5 stars)
  - Subtle card with brand accent
- **Files:** `index.html`, `main.css`

### VISUAL-6: Services Page — Visual "Before/After" or Process Diagrams
- **Current:** Services listed as cards with text + icon
- **Problem:** Looks like a bullet point list — no visual differentiation
- **What to add:** For top 2-3 services, add a mini visual (e.g., architecture diagram, before/after screenshot, or animated stat)
- **Files:** `services.html`

---

## 🟡 Medium Priority — Polish & UX

These push from 8.5 → 9.5.

### POLISH-1: Pricing / Engagement Models Section
- **Missing:** No pricing or engagement model information anywhere
- **Why it matters:** Clients want to know if they can afford you before calling
- **What to add:** A "How We Engage" section on Services page with 3 cards:
  - Fixed Price (small projects)
  - Time & Materials (ongoing)
  - Dedicated Team (enterprise)
- No exact prices needed — just the model and what's included

### POLISH-2: FAQ Section
- **Missing:** No FAQ on any page
- **Add to:** `services.html` or a dedicated `faq.html`
- **Questions to cover:** Turnaround time, tech stack choices, NDA/IP, post-launch support, location

### POLISH-3: Privacy Policy + Terms of Service Pages
- **Missing:** No legal pages
- **Why it matters:** Required for GDPR/privacy compliance if collecting form data via Formspree. Required for App Store / Play Store submissions too.
- **Fix:** Create `privacy.html` and `terms.html`, link from footer

### POLISH-4: Blog / Insights Section
- **Missing:** No content marketing
- **Why it matters:** SEO juice, thought leadership, builds trust
- **What to add:** Even 3-4 articles on `blog.html`:
  - "How we built a Blood Bank Management System"
  - "AI in CCTV surveillance — a technical overview"
  - "Choosing between IoT protocols for smart parking"

### POLISH-5: Mobile Navigation Audit
- **Issue:** Mobile nav uses a slide-in drawer — needs testing at 375px (iPhone SE) and 390px (iPhone 14)
- **Check:** Does the hamburger menu work? Are all nav links visible without horizontal scroll?

### POLISH-6: Loading Performance
- **Issue:** Large PNG images (`kirana-management.png` = 1.7MB, `smartparking.png` = 1.8MB, `ai cctv.png` = 1.9MB) — very heavy
- **Fix:** Convert to `.webp` format (typically 60-80% smaller):
  ```bash
  cwebp kirana-management.png -o kirana-management.webp -q 85
  ```
  Update `<img src="...">` tags to use `.webp` with `.png` fallback

### POLISH-7: Cookie / GDPR Banner
- **Missing:** No cookie consent notice
- **Why it matters:** Required for EU/UK visitors; Formspree stores submission data
- **Fix:** A simple bottom banner on first visit: "This site uses cookies for analytics. [Accept] [Decline]"

### POLISH-8: Analytics Integration
- **Missing:** No visitor tracking
- **Fix:** Add Google Analytics 4 or Plausible (privacy-friendly):
  ```html
  <!-- In <head> of all pages -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  ```

### POLISH-9: Social Media Links in Footer + Header
- **Missing:** No LinkedIn, GitHub, Twitter/X links
- **Why it matters:** Clients click to verify legitimacy
- **Fix:** Add social icon row to footer. Link to company LinkedIn at minimum.

### POLISH-10: Open Graph Image Per Page
- **Current:** All pages share one generic `og-image.svg`
- **Better:** Each page has its own preview image so LinkedIn/WhatsApp shares look different:
  - Services page → shows service icons grid
  - Projects page → shows project mockups
  - About page → shows team photo

---

## 🟢 Low Priority — Nice to Have

### EXTRA-1: Dark Mode Image Adaptation
- **Issue:** Project card images (`kirana-management.png` etc.) look fine in light but may look too bright in dark mode
- **Fix:** Add CSS `filter: brightness(0.85)` on images inside `[data-theme="dark"]`

### EXTRA-2: Keyboard Accessibility Audit
- **Check:** Can users navigate the entire site with Tab key only?
- **Focus styles:** Ensure all interactive elements have visible focus outlines in both modes

### EXTRA-3: Print Stylesheet
- **Missing:** No `@media print` CSS
- **Why:** Clients sometimes print the services page to share internally
- **Fix:** Simple print CSS that hides nav, footer, animations and shows clean text

### EXTRA-4: Careers Page — Real Openings
- **Current:** Generic "Apply" form with no specific openings listed
- **What to add:** Actual current roles with:
  - Role title + location (Remote/Hybrid/On-site)
  - Key responsibilities (3-5 bullets)
  - Requirements
  - Salary range or "competitive"

### EXTRA-5: Back to Top Button
- **Missing:** On long pages (index, projects), there's no way to jump back to top
- **Fix:** Fixed floating button (bottom right), appears after scrolling 400px, smooth scroll to top

---

## Implementation Priority Order

```
Week 1 — Bugs (non-negotiable)
  ├── BUG-2: Fix domain/canonical URLs + sitemap
  ├── BUG-6: Fix email address
  ├── BUG-1: Create proper og-social.png
  ├── BUG-4: Fix About page right panel
  └── BUG-3: Create 404.html

Week 2 — Visuals (biggest score jump)
  ├── VISUAL-1: Hero device mockup
  ├── VISUAL-2: Client logo strip
  ├── VISUAL-3: Team section on About
  └── VISUAL-5: Testimonials on homepage

Week 3 — Content & Trust
  ├── VISUAL-4: Individual case study pages
  ├── POLISH-1: Engagement models
  ├── POLISH-3: Privacy Policy + Terms
  └── POLISH-9: Social links

Week 4 — SEO & Performance
  ├── POLISH-6: Convert images to .webp
  ├── POLISH-8: Google Analytics
  ├── POLISH-4: 3-4 Blog articles
  └── POLISH-2: FAQ section
```

---

## Score Projection

| Milestone | Score | What gets unlocked |
|-----------|-------|--------------------|
| Right now | 6.5/10 | Functional, dark mode works |
| After Week 1 bugs | 7.0/10 | SEO-clean, no broken meta |
| After Week 2 visuals | 8.5/10 | Looks like a real agency, not a template |
| After Week 3 content | 9.0/10 | Full trust signals, shareable case studies |
| After Week 4 SEO | 9.5/10 | Production-grade, Googleable, fast |
