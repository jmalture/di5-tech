# Status

Front page (Czech only) built: dark hero with the four BIM model cards, "Naše řešení" tabs, "Jak Vám Bim.Point pomůže" role cards, clients, demo/showcase tiles with news, footer.
Everything except the front page links to the live di5-tech.cz pages (URL map in `src/i18n/index.ts`). Forms (konzultace, pasportizace) stay on SmartEmailing.

## New copy (needs client approval)

- Hero H1 "Informační modelování staveb" (term from the live text) and the lead's second sentence (adapted from the BIM nástroj text).
- Offer card sub labels in `home.json` (not shown on screen), role/tab wording is 1:1 from the live site (hyphenation breaks fixed).
- Meta title and description.

## Open

- The scrape was done through Chrome (the site answers scripts with HTTP 466). The three offer GIFs are only 300x400 px; ask for higher-res originals or the source models.
- The di5 tech logo SVG could not be read, the Bim.Point logo (same company) is used.
- Client logos: only four are on the front page.

## Round 2 (feedback)
- Bubbles/blobs removed (hero glows, roles blob, tile blobs, demo ring). Replaced by an animated network (`ui/Net.astro`, canvas nodes + links, reacts to the pointer, pauses off screen, static under reduced motion) in the hero and the demo band.
- Logo is the client's official di5 tech SVG (from di5-tech.cz, `logo-di5tech.svg`), letters use currentColor, cube stays blue.
