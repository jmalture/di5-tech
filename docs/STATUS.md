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

## Round 3: BIM assembly background
- `ui/BimField.astro` replaces the plain net: a canvas where building objects (slab, walls, door, window, column, room volume), storeys, MEP pipes and a chart dashboard fly in, snap together, show IFC data tags and relationship links with travelling pulses, then come apart and repeat. Used in hero, solutions, roles, clients and the demo band (dark and light tones). Pauses off screen, parallax with the cursor.
- Tag values (IfcDoor EI30 · 900 mm, etc.) are illustrative, not client data.
- BimField placement: each scene picks, at the start of every cycle, a free spot (and size) fully inside its section, clear of text, buttons, cards, the fixed header, chips and other scenes. If nothing fits it skips that cycle.
