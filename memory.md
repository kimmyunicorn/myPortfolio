# Project memory

No secrets in this file.

## Goals
- A premium, memorable portfolio for Kimberly Camanero (robotics and software engineer) aimed at recruiters and engineering teams.
- A Japanese sakura visual identity combined with engineering credibility. Feminine, sophisticated and technical, never childish or overly pink.
- Performance, accessibility and accurate content come before effects.

## Hard requirements
- No invented employment, titles, metrics, awards or outcomes. Missing information is either a placeholder or hidden.
- Graphen Robotics work: high-level summary only. No code, datasets or internal details. Validation metrics stay hidden until approval (`disclosure.approved`).
- Validation accuracy must always be labeled as validation, not real-world deployment accuracy.
- Hosted on GitHub Pages. Media on Cloudflare R2 through a public URL env var. No credentials in the frontend.
- Supabase only if a real database need appears (none so far).
- Honor `prefers-reduced-motion`.

## Design decisions
- **Aesthetic (current, chosen by Kimberly):** a light pink outer space with doodles: rockets, ringed planets and doodle stars. Rejected versions: the Japanese sakura look (v1), the dark hero (v3), and the cozy pixel room / Notion style (v5). Never add a "hi, that's me" note.
- **Palette:** cream `#fff6f3`, blush, ink `#2b2140`, pink `#f7a8bf` / text-safe `#c23e6e`, lavender `#cdbdf2`, mint `#b9f2d8`, green `#46e6aa`, purple `#9b6bff`, gold `#f4c25e`.
- **Type:** Fraunces (SOFT 100) for display, Nunito for body, Caveat for one handwritten aside in About.
- **Hero:** a pastel pink universe with nebula clouds (pink, purple, green), coloured star dots, a ringed pink planet behind her head, green and purple moons, a doodled rocket with a dashed trail, twinkling doodle stars and petals. Her name is in a plum-magenta / violet gradient, entirely behind her. The intro sits bottom-left.
- **Sections:** sticker-style chips and buttons (ink outline + offset shadow), rounded white timeline cards with doodle-star nodes, pastel project placeholders with a planet + rocket doodle, and a dark starry pink-universe footer with planets and a rocket.
- **2010 layer (Kimberly asked for an Olivia Rodrigo "drop dead" era, 2010-internet vibe, blended with the pink space look):** glitter-foil name letters (sparkle dots over a shimmering pink-holo gradient), the tagline typed out in lowercase Courier Prime like a 2010 lyric video, holographic die-cut stickers (star, heart, sparkle), a pink "Engineer License" ID card in About (her portrait, fields from her real background, signature, faded name stamp), and a "Notice of appointment" renewal-notice card in the footer. The details are original: nothing copies the artist's site, logos or artwork.
- **Pastel only (Kimberly's request):** no neon. The decoration colours are pastel (mint `#a8e6cc`, lavender `#c4b0f5`, pink `#f8b6c9`, butter `#f7d68f`), the moons are desaturated, and the footer is a soft lavender dusk. The name is back to the plum-magenta / violet gradient: she preferred it over the glitter version.
- **About P.S.:** a very small line at the very bottom of About says she also really wants to be an actress and would love audition connections.
- **Motion:** one hero entrance, plus reveals for About, the timeline and projects. No Motion or GSAP.
- **Router:** a tiny custom History router plus the View Transitions API, instead of react-router. `scripts/prerender-routes.mjs` writes an HTML file per case study, because GitHub Pages has no SPA rewrites.
- **Skills:** no ratings. Selecting a skill shows the projects that use it, matched from the data files.
- **Portrait:** the cutout was made from the original photo with background modeling and GrabCut, with edge colors decontaminated. It ships as WebP only (AVIF with alpha was larger) and is bundled locally for LCP.
- **Hosting:** recommend a GitHub organization named `kimberlycamanero` that owns the repo `kimberlycamanero.github.io`, so the personal account `kimmyunicorn` stays untouched.

## Status
- [x] Scaffold, tokens, data files, router, motion hooks
- [x] Hero, About, Experience timeline, Projects, Skills, Contact footer, Case-study pages, 404
- [x] Deploy workflow, prerender, media optimization script, R2 CORS file
- [x] Visual check at 1440×900, 1280×720 and 390×844 (with fallback fonts; real fonts not loaded in the build sandbox)
- [ ] Run `npm install && npm run build` locally (the build sandbox had no package access)
- [ ] Reconcile tokens with the design-language docs
- [ ] Real project media

## Content to confirm
- LinkedIn URL and public email
- Skanska and CUHK are both Summer 2025: confirm dates. Skanska, LAUSD and Energy Coalition need a line on the work and their locations.
- GoEngineer: months and location. iD Tech: what was taught.
- Lunabotics: year, outcome, technologies, your specific contributions.
- Seed-planting robot: context (course, team or personal), dates, role, microcontroller and sensors.
- Lessons learned for each case study.
- The About copy is written in Kimberly's voice from her notes. She should read and edit it.
- Graphen: approval before showing metrics.

## Known issues
- Pipeline diagram connectors wrap onto the next row on narrow desktop widths (cosmetic).
- The cutout's left shoulder has a slightly rough edge where the light sleeve stripe meets the wall. It's mostly hidden by the side fade. A pro cutout would remove it.

## Future ideas
- Embed project demo videos (poster first, load on click).
- An Open Graph image per case study.
- Optional "Creative" gallery for acting, music and video work.
