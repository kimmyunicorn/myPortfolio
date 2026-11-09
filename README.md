# Kimberly Camanero — Portfolio

An interactive portfolio for a robotics and software engineer, set in a light pink outer space with doodled rockets, ringed planets and twinkling stars. It has a hero with the name behind the portrait, a scroll-driven experience timeline, editorial project features, and a case-study page for each project.

**Stack:** React 19 · Vite 7 · plain CSS with design tokens · SVG/CSS animation · GitHub Pages · Cloudflare R2 for media.
React is the only runtime dependency. All motion is CSS, IntersectionObserver and a few small hooks in `src/hooks/motion.js`. This keeps the bundle small, and it honors `prefers-reduced-motion` everywhere.

---

## Quick start (Ubuntu)

```bash
# Node 20.19+ (22 recommended)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

cd kc-portfolio
npm install            # creates package-lock.json; commit it
cp .env.example .env.local
npm run dev            # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server. Also shows "To add / To confirm" notes for missing content. |
| `npm run build` | Production build into `dist/`, plus a real HTML file for each case-study route, `404.html` and `sitemap.xml`. |
| `npm run preview` | Serve the production build locally (http://localhost:4173). |
| `npm run media` | Turn images in `media-src/` into AVIF and WebP sizes in `media-dist/` for upload to R2. |

## Environment variables

These values are public. They are compiled into the browser bundle.

| Variable | Example | Purpose |
|---|---|---|
| `VITE_ASSET_BASE_URL` | `https://assets.kimberlycamanero.com/` | Public R2 URL for project media. If empty, media is served from `public/media/`. |
| `VITE_BASE` | `/` | `/` for `kimberlycamanero.github.io`, or `/<repo>/` for a project site. |

Never put R2 access keys or Supabase service keys in a `VITE_` variable or anywhere in this repo.

---

## Getting `kimberlycamanero.github.io` without touching `kimmyunicorn`

GitHub serves `https://<name>.github.io` only from a repo called `<name>.github.io` that's owned by the account or organization `<name>`. The lowest-disruption route is a **free GitHub organization**:

1. Go to github.com → **+** → **New organization** → Free plan, and name it `kimberlycamanero`.
   If GitHub says the name is taken, use the fallbacks below.
2. In that organization, create a public repo named exactly **`kimberlycamanero.github.io`**.
3. Push this project to it:
   ```bash
   git init && git add -A && git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/kimberlycamanero/kimberlycamanero.github.io.git
   git push -u origin main
   ```
4. In the repo, open **Settings → Pages → Build and deployment → Source: GitHub Actions**.
5. Optional: under **Settings → Secrets and variables → Actions → Variables**, add `VITE_ASSET_BASE_URL`.
6. Every push to `main` now deploys through `.github/workflows/deploy.yml`.

Your personal account, its repos and all existing links stay exactly as they are. You own the organization, so you push to it with your normal login.

**Fallbacks if the name is taken:** use `kimmyunicorn.github.io`, or buy a custom domain (e.g. `kimberlycamanero.com`). To use a domain, add it under Settings → Pages → Custom domain. You'd likely want a domain anyway for R2 (see below). Renaming your personal account also works, but it breaks old profile links and frees `kimmyunicorn` for anyone to take.

---

## Media on Cloudflare R2

1. In the Cloudflare dashboard, go to **R2 → Create bucket** (e.g. `kc-portfolio-media`).
2. Make it public:
   - **Recommended:** under Settings → Custom Domains, connect a domain you have on Cloudflare (e.g. `assets.kimberlycamanero.com`).
   - For testing only: enable the `r2.dev` public URL. It's rate-limited and not meant for production.
3. Under Settings → CORS policy, paste `r2-cors.json`. Plain `<img>` and `<video>` tags don't need it. It's there for future fetch or `crossorigin` use.
4. Process and upload images:
   ```bash
   mkdir -p media-src/projects/seastar-rov
   cp ~/Pictures/rov.jpg media-src/projects/seastar-rov/hero.jpg
   npm run media                       # -> media-dist/projects/seastar-rov/hero-640.avif ... hero-1920.webp
   npx wrangler login
   for f in $(cd media-dist && find . -type f | sed 's|^\./||'); do
     npx wrangler r2 object put "kc-portfolio-media/$f" --file "media-dist/$f" --remote
   done
   ```
5. Reference the image in `src/data/projects.js`:
   ```js
   media: {
     hero: { key: 'projects/seastar-rov/hero', widths: [640, 1000, 1500, 1920], width: 4000, height: 3000, alt: 'SeaSTAR ROV on the pool deck' },
     gallery: [ /* same shape, plus optional caption */ ],
     wanted: ['Pilot UI screenshot', 'Demo video'],   // still-missing items render as labelled placeholders
   }
   ```
   `npm run media` prints each image's original width and height for the `width`/`height` fields, which prevents layout shift.

The portrait is bundled in `public/media/portrait/` rather than on R2, so the hero image never waits on a second domain.

### Portrait cutout
`media-src/portrait/kimberly.png` is a transparent cutout made from your original photo. The face and proportions are untouched. To swap in a cleaner cutout (e.g. from Photoshop's Remove Background), replace that PNG, then run:
```bash
node scripts/optimize-media.mjs media-src/portrait public/media/portrait
rm public/media/portrait/*.avif     # WebP is smaller for this transparent image
```
If you replace it with a photo of a different size, also update `width` and `height` in `src/config/assets.js`.

---

## Editing content

Everything recruiters read lives in `src/data/`:

| File | Controls |
|---|---|
| `projects.js` | Project cards and case-study pages. Copy an entry to add a project. Set `featured: false` to list it under "More projects". |
| `experience.js` | Timeline entries. The `verify` notes appear only in `npm run dev`. |
| `skills.js` | Skill groups. Each skill automatically links to the projects whose `tech`, `highlights` or `category` mention it. |
| `socials.js` | LinkedIn and Email are `null` until you add them, and show as "soon". |
| `navigation.js` | Nav items. Each must match a section `id`. |
| `src/config/site.js` | Name, roles, tagline and meta description. |

**Missing content:** text fields left as `null` are hidden in production and show a dashed "To add" note in development. Missing photos always show a themed "Coming soon" panel.

**Company work (Graphen):** `visibility: 'summary-only'` adds a confidentiality note. `disclosure: { approved: false }` hides the validation metrics. Change it to `true` only after Graphen approves sharing them.

## Design system

All colors, type, spacing and motion values are tokens in `src/styles/tokens.css`. The fonts are Fraunces (display), Nunito (body) and Caveat (one handwritten note). The doodles (planet, rocket, stars, petals) are in `src/components/sakura/Sakura.jsx`.

When `DesignLanguage.md` and `SakuraDesignLanguage.md` are added, reconcile the tokens with them.

## Project structure

```
src/
  config/      assets.js (R2/local URL helper, portrait), site.js
  data/        projects, experience, skills, socials, navigation
  hooks/       motion.js (in-view, scroll progress, pointer parallax, active section)
  lib/         router.jsx (tiny History API router + View Transitions)
  components/  layout · sakura · hero · about · experience · projects · skills · contact · ui
  pages/       Home, CaseStudy, NotFound
  styles/      tokens.css, base.css
scripts/       optimize-media.mjs, prerender-routes.mjs
public/media/  bundled portrait
media-src/     originals for processing (not served)
```
