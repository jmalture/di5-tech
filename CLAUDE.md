# CLAUDE.md: di5-tech

Pitch redesign of the di5-tech.cz (Bim.Point) front page by Alture, same architecture as BLL_website and bsi_certifikace (Astro 7, static + @astrojs/node, inlined CSS, self-hosted fonts, no CMS). Czech only. Class prefix `dt-`.
Commands: `npm install`, `npm run dev`, `npm run build` (must pass before push), `npm start`, `npm run format`. Astro 7 needs Node >= 22.23.4.
Hostinger: framework Astro, build `npm run build`, output `dist`, entry `server/entry.mjs`, Node 22. Do not switch to `output: 'server'`.
Structure: `src/components/home/NN-name.astro` sections (01 hero, 02 solutions tabs, 03 roles, 04 clients, 05 demo and news), `src/i18n/*.json` texts, `src/styles/site.css` tokens, `src/scripts/site.ts` behaviour, `public/media` offer cards (mp4 + webp posters).
Gotchas: see the BLL_website CLAUDE.md. Playwright: `executablePath: '/opt/pw-browsers/chromium'`; check mobile `scrollWidth === 390`. The live site blocks scripted downloads (HTTP 466): scrape through Chrome.
Read `docs/BRAND.md`, `docs/STATUS.md`.
