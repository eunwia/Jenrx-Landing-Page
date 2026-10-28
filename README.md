# Jenrx - Landing Page

A modern, responsive, and privacy-focused landing page for **Jenrx**, a personal health tracking companion for medications, hospital appointments, blood pressure, and medical records.

---

## 🚀 Deploy to Vercel

This project is a static web application and is 100% pre-configured for instant zero-config deployment on [Vercel](https://vercel.com).

### Option 1: Vercel Dashboard (Recommended)

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Prepare project for Vercel deployment"
   git push origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository (`Jenrx-Landing-Page`).
4. Keep the default settings:
   - **Framework Preset**: *Other*
   - **Root Directory**: `./`
5. Click **Deploy**. Your site will be live on a `*.vercel.app` domain in seconds!

---

### Option 2: Deploy via Vercel CLI

Run the following command from this directory:

```bash
npx vercel
```

Follow the prompts in your terminal. For production deployment, run:

```bash
npx vercel --prod
```

---

## 📁 Project Structure

```text
Jenrx-Landing-Page/
├── .gitignore          # Git ignore rules (includes .vercel artifacts)
├── vercel.json         # Vercel routing, cache control, and security headers
├── 404.html            # Custom on-brand 404 error page
├── index.html          # Main landing page with Open Graph and SEO tags
├── styles.css          # Design system & CSS stylesheet
├── script.js           # Interactive UI scripts & modals
├── images/             # App screenshots, mascots, and logos
└── README.md           # Project & deployment documentation
```

---

## 🛠️ Configuration Highlights

- **`vercel.json`**:
  - `cleanUrls: true`: Clean route resolution without `.html` extensions.
  - **Asset Caching**: 1-year immutable caching for static assets under `images/` and stale-while-revalidate for CSS/JS.
  - **Security Headers**: Standard headers pre-configured (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`).
- **`404.html`**: Automatically served by Vercel for any unresolved routes.
