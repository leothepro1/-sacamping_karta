# Apelvikstrand Map

Interactive Mapbox GL map for Apelvikstrand, Varberg. Single-page app hosted on Cloudflare Pages.

## Tech Stack

- React 19 + TypeScript 6 + Vite 8
- Mapbox GL JS v3 + react-map-gl v8
- Tailwind CSS v4
- i18next (sv/en/de)
- Embla Carousel

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Type-check + production build
- `npm run lint` — ESLint
- `npm run format` — Prettier
- `npm run test` — Vitest
- `npm run test:watch` — Vitest watch mode

## Project Structure

- `src/components/` — React components (Map, FilterPanel, Modal, ui)
- `src/data/` — POI data and types (static TypeScript files)
- `src/hooks/` — Custom hooks (usePoiFilter, useVisiblePois, useSelectedPoi)
- `src/i18n/` — i18next config and locale files (sv, en, de)
- `src/lib/` — Utilities (cloudinary URL builder, map constants)

## Environment Variables

- `VITE_MAPBOX_TOKEN` — Mapbox access token (set in .env.local or Cloudflare dashboard)
