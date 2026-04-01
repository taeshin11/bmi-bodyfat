# PRD.md — Accurate BMI & Body Fat Calculator

## Project Overview

| Field | Value |
|---|---|
| **Service Name** | Accurate BMI & Body Fat Calculator |
| **Short Title** | BMI Dashboard |
| **Folder** | `bmi-bodyfat` |
| **Stack** | HTML + CSS + Vanilla JS (single-page, zero-framework) |
| **Hosting** | Vercel (free tier, deployed via CLI) |
| **Domain** | Vercel auto-assigned domain (no GitHub username exposure) |
| **Monetization** | Adsterra (primary), Google AdSense (secondary/future) |
| **Data Collection** | Google Sheets via Apps Script webhook |
| **Cost Target** | $0 — free tiers only, no paid services |

---

## 1. Harness Architecture (Anthropic Method)

This project follows the **Anthropic Harness Design** for autonomous Claude Code development. Four agent roles operate in sequence with three persistent handoff files ensuring continuity across sessions.

### 1.1 Agent Roles

| Agent | Responsibility |
|---|---|
| **Planner** | Expand this PRD into a full feature spec. Focus on *what* to build, not *how*. |
| **Initializer** | First session only — scaffold the project and create the three handoff files. |
| **Builder** | Pick the next incomplete feature, implement it, test it, commit, update progress. |
| **Reviewer** | After each feature: audit code quality, accessibility, SEO, responsive design, and performance. Fix issues before moving on. |

### 1.2 Handoff Files (created by Initializer, used by every subsequent session)

| File | Purpose |
|---|---|
| `feature_list.json` | Array of every feature with `id`, `title`, `status` (`pending` / `in-progress` / `done`), `priority` (1-5), and `description`. |
| `claude-progress.txt` | Human-readable log: what was done, what's next, known blockers. Updated after every commit. |
| `init.sh` | One-command project bootstrap: installs deps, starts local dev server, runs tests. |

### 1.3 Session-Start Routine (every session, no exceptions)

```
1. Read claude-progress.txt → understand current state
2. Read feature_list.json → identify next pending feature
3. Run init.sh → confirm project boots cleanly
4. Run all existing tests → confirm nothing is broken
5. Pick ONE feature → implement → test → commit → update progress
6. Repeat step 5 until session budget is spent
```

---

## 2. Feature Specification

### 2.1 Core Calculator

- **BMI Calculator**
  - Inputs: height (cm or ft/in), weight (kg or lbs)
  - Unit toggle: Metric ↔ Imperial with instant conversion
  - Formula: `weight(kg) / height(m)²`
  - Output: numeric BMI + WHO category (Underweight / Normal / Overweight / Obese I / II / III)

- **US Navy Body Fat Calculator**
  - Inputs: gender (Male / Female), waist circumference, neck circumference, height, hip circumference (female only)
  - Formula (Male): `86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76`
  - Formula (Female): `163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387`
  - Output: body fat percentage + ACE category (Essential / Athletes / Fitness / Average / Obese)

- **Combined Results Dashboard**
  - Display BMI and Body Fat side-by-side
  - Animated **Gauge Charts** for each metric (risk zones: red/yellow/green/blue)
  - Color-coded risk label: Danger / Caution / Normal / Excellent
  - Brief health insight text below each gauge (not medical advice — include disclaimer)

### 2.2 Input Validation & UX

- Real-time validation: highlight invalid fields, show inline error messages
- Debounced auto-calculation (300ms after last keystroke) OR explicit "Calculate" button — implement both, let user toggle in settings
- Smooth scroll to results section after calculation
- "Reset" button to clear all inputs
- Remember last inputs in `localStorage` for returning users

### 2.3 Gauge Chart Component

- Pure SVG + CSS gauge (no external chart library)
- Animated needle sweep on result display
- Segmented color bands:
  - BMI: <18.5 blue | 18.5–24.9 green | 25–29.9 yellow | 30+ red
  - Body Fat: zone boundaries differ by gender — use ACE standards
- Accessible: include `aria-label` with numeric value + category text
- Responsive: gauges must render correctly from 320px to 1440px

### 2.4 Educational Content (SEO)

- "What is BMI?" section with brief explanation
- "What is Body Fat Percentage?" section
- "BMI vs Body Fat: Which Matters More?" comparison
- "US Navy Method Explained" section
- "Limitations of BMI" section
- FAQ section (at least 8 questions) with `<details>` accordion
- All content written in natural English, targeting featured snippets

---

## 3. Design & UI/UX Requirements

### 3.1 Visual Design

- **Background**: Soft gradient — use muted pastel tones (e.g., `#F0F4F8` → `#E8EDF2`). No harsh whites or pure blacks.
- **Color Palette**: Calm, health-oriented — soft blues, greens, light grays. Accent color for CTAs.
- **Typography**: System font stack or Google Fonts (Inter or Nunito). Clear hierarchy: large H1, readable body (16px+).
- **Cards**: Rounded corners (12–16px), subtle shadow, white/near-white card backgrounds.
- **Spacing**: Generous padding and margins. Never cramped.
- **Modern & Comfortable**: Clean layout, no clutter. Feels like a premium health app, not a 2005 calculator.

### 3.2 Responsive Design

- **Mobile-first** approach
- Breakpoints: 320px / 768px / 1024px / 1440px
- Gauges stack vertically on mobile, side-by-side on desktop
- Touch-friendly inputs: minimum 44px tap targets
- Test on Chrome DevTools mobile emulator before marking responsive features as done

### 3.3 Accessibility

- WCAG 2.1 AA compliance target
- All form inputs have visible `<label>` elements
- Gauge charts have `aria-label` and `role="img"`
- Color is never the sole indicator — always pair with text/icon
- Keyboard navigable

---

## 4. SEO & Traffic Maximization

### 4.1 On-Page SEO

- **Title tag**: "Free BMI & Body Fat Calculator — Accurate US Navy Method | BMI Dashboard"
- **Meta description**: compelling, under 155 chars, includes primary keyword
- **H1**: exactly one, includes primary keyword
- **URL structure**: clean, no query params for main page
- **Canonical tag**: self-referencing
- **Open Graph & Twitter Card meta tags** with preview image
- **JSON-LD Structured Data**:
  - `WebApplication` schema
  - `FAQPage` schema for FAQ section
  - `BreadcrumbList` schema
- **Sitemap.xml**: auto-generated, submitted to Google Search Console
- **robots.txt**: allow all crawlers

### 4.2 Technical SEO

- Page speed target: Lighthouse 95+ on all metrics
- Inline critical CSS, defer non-critical
- Minify HTML/CSS/JS in production build
- Preload fonts if using Google Fonts
- `<link rel="preconnect">` for external domains (Adsterra, Google Fonts)
- Lazy-load below-fold content
- Semantic HTML5 elements (`<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`)

### 4.3 Off-Page & Growth

- Generate a `manifest.json` for PWA-like "Add to Home Screen"
- Include share buttons (Twitter, Facebook, WhatsApp) — "Share my results" with pre-filled text
- Create a blog-ready `/about` or info section that can attract backlinks
- Implement a "Print Results" button for users who want to bring results to their doctor

---

## 5. Monetization — Adsterra Integration

### 5.1 Adsterra Setup

- **Primary ad network**: Adsterra (faster approval than AdSense)
- Ad unit placements:
  1. **Banner (728×90)**: below hero section, above calculator (desktop)
  2. **Native Banner**: between results and educational content
  3. **Social Bar / Push notification**: Adsterra Social Bar script in `<head>`
  4. **In-Page Push**: after user scrolls past results
- Ad placement rules:
  - Never obscure calculator inputs or results
  - Never interrupt the calculation flow
  - Minimum 1 screen-height between ad units
  - Mobile: no more than 1 ad visible per viewport
- When Adsterra dashboard provides ad unit keys, embed them in the code immediately

### 5.2 AdSense Readiness (Future)

- Build pages required for AdSense approval:
  - `/about` — About page
  - `/privacy` — Privacy Policy (mention data collection, cookies, third-party ads)
  - `/terms` — Terms of Service
  - `/contact` — Contact page
- Minimum 15 pages of quality content (FAQ answers count as separate content blocks)
- Navigation header with links to all policy pages

---

## 6. Data Collection — Google Sheets Webhook

### 6.1 Architecture

```
[User clicks Calculate] → POST fetch() → Google Apps Script Web App URL → Google Sheet
```

### 6.2 Data Points to Collect (silent, non-intrusive)

| Column | Value |
|---|---|
| timestamp | ISO 8601 |
| gender | male / female |
| height_cm | converted to cm |
| weight_kg | converted to kg |
| waist_cm | waist circumference |
| neck_cm | neck circumference |
| hip_cm | hip (female only, blank for male) |
| bmi_result | calculated BMI |
| bodyfat_result | calculated body fat % |
| bmi_category | WHO category |
| bodyfat_category | ACE category |
| unit_system | metric / imperial |
| user_agent | navigator.userAgent |
| referrer | document.referrer |
| page_url | window.location.href |

### 6.3 Implementation

- Create the Google Apps Script:
  - `doPost(e)` function that parses JSON body and appends row to Sheet
  - Deploy as Web App → "Anyone" access → copy URL
  - **Claude Code must write the Apps Script code and provide step-by-step CLI/automation to deploy it.**
- Frontend: `fetch(WEBHOOK_URL, { method: 'POST', body: JSON.stringify(data) })` — fire-and-forget, do not block UI
- No user-visible indication of data collection
- Fail silently — never show errors to user if webhook fails

---

## 7. Visitor Counter

### 7.1 Requirements

- Display: "Today: X | Total: Y" in the **footer**, small font, muted color
- Must NOT disrupt user experience — subtle, informational only
- Backend: use a free service (e.g., CountAPI, or a simple Vercel serverless function with KV, or Google Sheets as counter store)
- Increment on page load (deduplicate by session using `sessionStorage` flag)
- If CountAPI or external service is unavailable, fall back gracefully (hide counter, no errors)

---

## 8. Feedback & Contact

### 8.1 Feedback Mechanism

- **Floating feedback button** (bottom-right corner, small, muted icon)
- On click: expands a minimal form:
  - Type: "Suggestion" / "Bug Report" / "Other"
  - Message: textarea
  - Submit → sends email to `spinaiceo@gmail.com` via `mailto:` link or free email service (e.g., Formspree free tier, or EmailJS free tier)
- After submit: "Thank you!" toast notification, form closes
- **Does not interrupt** the calculator experience

### 8.2 Business Inquiry

- In the **footer**: "Business Inquiries: spinaiceo@gmail.com" — plain text link with `mailto:`
- Also accessible from `/contact` page

### 8.3 Branding

- **Footer**: "Built by **SPINAI**" — small, styled text with subtle emphasis
- Optional: tiny SPINAI logo/wordmark if available
- Link to SPINAI homepage if one exists, otherwise plain text
- Must not dominate the footer — sits alongside copyright, policy links, visitor counter

---

## 9. Git & Deployment Workflow

### 9.1 Repository Setup

```bash
# CREATE REPO USING gh CLI — do not create manually
cd bmi-bodyfat
git init
gh repo create bmi-bodyfat --public --source=. --remote=origin
git add -A
git commit -m "init: project scaffold with handoff files"
git push -u origin main
```

### 9.2 Milestone-Based Git Pushes

Commit and push at every milestone. **Do not batch commits.**

| Milestone | Commit Message |
|---|---|
| Project scaffold + handoff files | `init: project scaffold with handoff files` |
| BMI calculator working | `feat: BMI calculator with unit toggle` |
| US Navy body fat calculator working | `feat: US Navy body fat calculator` |
| Gauge charts rendering | `feat: animated gauge charts for BMI and body fat` |
| Responsive design complete | `style: responsive layout for all breakpoints` |
| SEO meta tags + structured data | `seo: meta tags, JSON-LD, sitemap, robots.txt` |
| Adsterra ads integrated | `feat: Adsterra ad units integrated` |
| Google Sheets webhook connected | `feat: Google Sheets data collection webhook` |
| Visitor counter working | `feat: visitor counter in footer` |
| Feedback & contact system | `feat: feedback form and contact links` |
| Educational content + FAQ | `content: educational sections and FAQ` |
| Policy pages (Privacy, Terms, About) | `content: policy pages for ad network approval` |
| Final review + performance optimization | `chore: final review, minification, Lighthouse audit` |
| Vercel deployment | `deploy: live on Vercel` |

### 9.3 Vercel Deployment

```bash
# Install Vercel CLI if not present
npm i -g vercel

# Deploy to Vercel (will auto-assign a *.vercel.app domain)
vercel --prod --yes

# The Vercel URL is the PUBLIC link. Never share the GitHub URL directly.
```

- After deployment, **check the live site** and verify:
  - All calculator functions work correctly
  - Gauge charts animate and display correct zones
  - Responsive design works on mobile/tablet/desktop
  - Ads load without blocking content
  - Google Sheets webhook receives data
  - Visitor counter increments
  - Feedback form sends email
  - All links work (nav, footer, policy pages)
  - Lighthouse audit: aim for 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO
  - Identify and fix any areas for improvement

---

## 10. Standing Constraints (apply to every decision)

1. **Zero cost** — free tiers only. No paid APIs, no paid hosting, no paid databases.
2. **CLI automation** — if it can be done via CLI, do it via CLI. Never produce "manual guide" steps when automation is possible.
3. **No GitHub username exposure** — public-facing links use Vercel domain only.
4. **Adsterra first** — integrate Adsterra before considering any other ad network.
5. **SEO priority** — every page, every element should consider search visibility.
6. **Responsive** — mobile-first, tested at 320px minimum.
7. **Soft design** — no harsh colors, no visual clutter. Comfortable and modern.
8. **Non-intrusive data collection** — user should never feel surveilled.
9. **Milestone git pushes** — commit and push at every meaningful checkpoint.
10. **Fail gracefully** — if any external service (ads, counter, webhook) fails, the core calculator must still work perfectly.

---

## 11. File Structure (Expected)

```
bmi-bodyfat/
├── index.html              # Main calculator page
├── about.html              # About page
├── privacy.html            # Privacy Policy
├── terms.html              # Terms of Service
├── contact.html            # Contact page
├── css/
│   └── style.css           # All styles (or inline critical CSS)
├── js/
│   ├── calculator.js       # BMI + Body Fat calculation logic
│   ├── gauge.js            # SVG gauge chart component
│   ├── data-collector.js   # Google Sheets webhook integration
│   ├── counter.js          # Visitor counter logic
│   └── feedback.js         # Feedback form logic
├── assets/
│   ├── og-image.png        # Open Graph preview image (1200×630)
│   └── favicon.ico         # Favicon
├── sitemap.xml
├── robots.txt
├── manifest.json           # PWA manifest
├── feature_list.json       # Harness handoff file
├── claude-progress.txt     # Harness handoff file
├── init.sh                 # Harness handoff file
├── vercel.json             # Vercel config (if needed)
└── README.md               # Project description + live link
```

---

## 12. Definition of Done

A feature is "done" only when ALL of the following are true:

- [ ] Feature works as described in this PRD
- [ ] No console errors
- [ ] Responsive at 320px, 768px, 1024px, 1440px
- [ ] Accessible (keyboard navigable, proper labels, ARIA where needed)
- [ ] Does not break any existing feature (run all tests)
- [ ] Code is clean and commented where non-obvious
- [ ] Committed with descriptive message and pushed to GitHub
- [ ] `claude-progress.txt` updated
- [ ] `feature_list.json` status updated

---

## 13. Launch Checklist

- [ ] All features in `feature_list.json` are status `done`
- [ ] Lighthouse audit: 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO
- [ ] Live site verified on Vercel — all functions working
- [ ] Adsterra ads rendering correctly
- [ ] Google Sheets receiving data on Calculate click
- [ ] Visitor counter incrementing
- [ ] Feedback form operational
- [ ] Policy pages (About, Privacy, Terms, Contact) all accessible
- [ ] Social share buttons working
- [ ] FAQ accordion functional
- [ ] No broken links
- [ ] README.md updated with live Vercel URL
- [ ] `claude-progress.txt` final entry: "PROJECT COMPLETE"