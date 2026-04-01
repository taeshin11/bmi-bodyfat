# BMI Dashboard — Free BMI & Body Fat Calculator

A fast, free, privacy-first web calculator that computes **Body Mass Index (BMI)** and **body fat percentage** directly in the browser — no account required, no data sent to a server.

**[Live Site](https://bmi-bodyfat.vercel.app)**

---

## Features

- **BMI Calculator** — metric and imperial support, WHO category classification (Underweight to Obese Class III)
- **US Navy Body Fat Calculator** — gender-specific circumference-based formula, ACE category classification
- **Animated Gauge Charts** — SVG-based, colour-coded zones, smooth animated needle
- **Combined Results Dashboard** — side-by-side cards, colour-coded badges, personalised health insights
- **Real-time Validation** — instant feedback, debounced auto-calculation, field-level error messages
- **Persistent Inputs** — last-used values saved to localStorage, reset button to clear
- **Responsive Design** — mobile-first layout, tested from 320 px to 1440 px
- **PWA Ready** — web app manifest for add-to-homescreen support
- **SEO Optimised** — JSON-LD structured data, Open Graph tags, Twitter Card, canonical URLs
- **Visitor Counter** — localStorage-based, session-deduplicated, shows today + total
- **Feedback Widget** — floating modal with mailto submit and toast notification
- **Share & Print** — Twitter, Facebook, WhatsApp share buttons; print-optimised results view
- **Educational Content** — 5 content sections + 9 accordion FAQ items
- **Policy Pages** — About, Privacy Policy, Terms of Service, Contact

---

## Stack

| Layer      | Technology               |
|------------|--------------------------|
| Markup     | HTML5 (semantic)         |
| Styles     | CSS3 (custom properties, grid, flexbox) |
| Logic      | Vanilla JavaScript (ES6+, no frameworks) |
| Hosting    | Vercel (static)          |

No build step. No npm install. No dependencies. Open the folder and go.

---

## Run Locally

**Option 1 — bootstrap script (recommended):**

```bash
bash init.sh
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

**Option 2 — Python (if you have Python 3):**

```bash
python3 -m http.server 8080
```

**Option 3 — Node.js:**

```bash
npx serve . -p 3000
```

---

## Deploy to Vercel

```bash
# Install Vercel CLI once
npm i -g vercel

# Deploy
vercel --prod --yes
```

The `vercel.json` in this repo configures:
- Clean URLs (no `.html` extensions)
- No trailing slashes
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`)

---

## Pending (needs user input)

| Feature | Blocker |
|---------|---------|
| Adsterra ad integration | Requires Adsterra account + ad unit keys |
| Google Sheets data webhook | Requires Apps Script deployment URL |

See `claude-progress.txt` for the full feature log.

---

## Project Structure

```
bmi-bodyfat/
├── index.html          # Main calculator page
├── about.html          # About page
├── privacy.html        # Privacy Policy
├── terms.html          # Terms of Service
├── contact.html        # Contact page
├── css/
│   └── style.css       # All styles
├── js/
│   ├── calculator.js   # BMI + body fat formulas
│   ├── ui.js           # DOM interactions, gauge charts
│   ├── validator.js    # Input validation
│   ├── storage.js      # localStorage helpers
│   ├── share.js        # Share & print logic
│   ├── feedback.js     # Feedback widget
│   ├── counter.js      # Visitor counter
│   └── data-collector.js  # Google Sheets webhook (pending)
├── manifest.json       # PWA manifest
├── sitemap.xml         # XML sitemap
├── robots.txt          # Crawl directives
├── vercel.json         # Vercel deployment config
├── init.sh             # Local dev bootstrap script
├── claude-progress.txt # Build progress log
└── README.md           # This file
```

---

## Built by SPINAI

BMI Dashboard is built and maintained by the **SPINAI** team.
Contact: [taeshinkim11@gmail.com](mailto:taeshinkim11@gmail.com)
