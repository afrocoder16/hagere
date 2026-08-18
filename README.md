# Hagere — “Gather Around” homepage

A production-oriented homepage concept for Hagere Ethiopian Restaurant in Sioux Falls, South Dakota. The established layout, styles, animations, and supplied photography are intentionally preserved while the restaurant content and menu data are tailored for Hagere.

## Run it

```bash
npm install
npm run dev
```

Production and visual QA:

```bash
npm run build
npm run capture
```

## Content architecture

- `src/content.js` — Hagere address, phone, hours, links, featured dishes, and editable homepage content.
- `src/data/menu.json` — Hagere menu transcribed from the supplied printed-menu photographs.
- `tools/sync-menu.mjs` — validates the local Hagere menu snapshot without fetching remote menu data.
- `src/main.js` — semantic homepage sections, menu dialog, navigation, and interactions.
- `src/styles.css` — the supplied design system and responsive styling, intentionally unchanged.
- `public/assets/` — the supplied images, intentionally unchanged.

The menu explorer omits prices because the supplied menu photographs show conflicting prices from different dates. Confirm current prices with Hagere before publication.

## Hagere details used

- 2113 S Minnesota Ave, Sioux Falls, SD 57105
- (605) 271-1084
- Tuesday–Sunday, 11 AM–9 PM; Monday closed
- Dine-in and takeout

Hours and availability should be confirmed by phone before launch.

## Accessibility and performance

- Keyboard-accessible navigation, native menu dialog, search, and category filters.
- Visible focus states and mobile-friendly controls.
- Reduced-motion support.
- No hover-only content or autoplay media.
- Reserved hero dimensions and lazy-loaded lower-page photography.

See `VERIFICATION.md` for remaining owner decisions.
