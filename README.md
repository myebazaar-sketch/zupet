# Zupet

A single-page product showcase website for **Zupet** — a premium fish food brand.
Built with **plain HTML, CSS and vanilla JavaScript** (no frameworks, no build tools),
ready to push to GitHub and host on **GitHub Pages**.

## Files

| File          | Purpose                                                        |
| ------------- | -------------------------------------------------------------- |
| `index.html`  | Full semantic page: nav, hero, logo band, products, why, about, contact, footer |
| `style.css`   | Mobile-first styles (breakpoints 480 / 600 / 768 / 1024 px)     |
| `script.js`   | Mobile menu, scroll-reveal, scroll-spy nav, front-end form      |

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

## Deploy to GitHub Pages

1. Create a GitHub repository and push these files to it (the site lives at the repo root).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Select the `main` branch and the **root** (`/`) folder, then **Save**.
5. Your site will be live at `https://<username>.github.io/<repo>/`.

> For a custom domain, add a `CNAME` file (repo root) and configure your DNS.

## Before publishing — replace these placeholders

Search the code for `PLACEHOLDER` / `REPLACE` comments and update:

- **Logo** — swap the `<img>` in the header and logo band with your logo file
  (e.g. `images/logo.svg`). Drop files in a new `images/` folder.
- **Product photos** — each product card has an inline SVG placeholder;
  replace it with `<img src="images/your-photo.jpg" alt="...">`.
- **Contact form** — the form is front-end only. Wire it to a service like
  [Formspree](https://formspree.io) for real submissions (see note in `script.js`).
- **Meta / Open Graph** — `og:url`, `og:image`, `canonical`, social links.
- **JSON-LD** — update prices, images and URLs in the structured data block.

## Editing products

Each product is an `<article class="product-card">` with a clearly commented
structure: name (`<h3>`), tagline, and an expandable `<details>` block containing
the SEO description (benefits, ingredients, suitable species, usage). Edit the
text directly — no other changes needed.