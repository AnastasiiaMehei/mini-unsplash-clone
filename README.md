# Mosaic

A small Unsplash-style photo discovery app built with Next.js App Router.

Live demo: <>

## What is implemented

- Server-rendered editorial, search, and tag collections.
- Canonical navigation through `/s/photos/[query]`, `/tags/[tag]`, and `/photos/[id]`.
- Client-side infinite loading with orientation filters and valid Unsplash ordering.
- Responsive masonry gallery with 3/5-column toggle.
- Photo detail pages showing description, tags, author, avatar, date, dimensions, views, downloads, and location when supplied by the API.
- Context-aware previous/next photo navigation.
- Loading, empty, API error, 403, and 429 states.
- Legacy `/photo/[id]` and `/tag/[tag]` URLs redirect to the canonical plural routes.

## Setup

1. Create an Unsplash application at <https://unsplash.com/developers> and copy its access key.
2. Install dependencies and create the local environment file:

```bash
npm install
cp .env.example .env.local
```

3. Set `UNSPLASH_ACCESS_KEY` in `.env.local`.
4. Start development:

```bash
npm run dev
```

Open <http://localhost:3000> (local development URL).

Without an access key, the app uses the included fallback photo set.

## Production and Vercel

The app is compatible with Vercel's Next.js SSR deployment:

```bash
npm run build
```

Import the repository into Vercel, add `UNSPLASH_ACCESS_KEY` under Project Settings > Environment Variables, and deploy. No Unsplash key is exposed to the browser.

## Unsplash API notes

The server sends `Accept-Version: v1`, uses only `images.unsplash.com` for image hotlinks, and maps `Newest` to `latest`, `Relevance` to `relevant`, and editorial `/photos` browsing to `popular`.

## Screenshots

Capture the gallery at 1440px, 1024px, 768px, and 375px after starting the dev server. The responsive layout is defined in `app/globals.css`.

## Routes

- `/` editorial gallery
- `/s/photos/forest` search gallery
- `/tags/forest` tag gallery
- `/photos/:id` photo detail
