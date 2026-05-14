# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server with Turbopack at localhost:3000
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint via next lint
```

There are no tests in this project.

### Docker (production)

```bash
docker compose --profile prod up -d        # Start app + MongoDB
docker compose --profile prod build        # Rebuild image
docker compose --profile prod down         # Stop and remove containers
```

The app runs on port **3004** externally, mapping to container port 3000. Uses `.env.production` for secrets.

## Environment Variables

Create `.env.local` for local development:

```
MONGODB_URI=mongodb://localhost:27017/portfolio
DB_NAME=portfolio
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NEXT_PUBLIC_TINYMCE_API_KEY=...
NEXT_PUBLIC_ROOT_API_URL=http://localhost:3000
```

## Architecture

### Directory layout

- `src/app/` — Next.js App Router: page routes, API routes, and `layout.tsx`
- `src/pages/` — **Not** the Pages Router; these are section-level React components (e.g. `home/Hero.tsx`, `home/Experience.tsx`) consumed by App Router pages
- `src/components/` — Shared layout (`HomeLayouts.tsx` wraps every page with Header/Footer) and utility UI elements
- `src/models/` — Mongoose schemas: `Blog.ts` and `Project.ts`
- `src/utils/` — Three utilities:
  - `mongoose.ts` — cached Mongoose connection (`connectDB()`); **this is what API routes use**
  - `db.ts` — raw MongoDB client; currently unused by API routes
  - `cloudinary.config.ts` — Cloudinary v2 SDK instance

### API routes

All API routes live under `src/app/api/`:

| Route | Methods |
|---|---|
| `/api/blog` | GET, POST |
| `/api/blog/[id]` | GET, DELETE |
| `/api/project` | GET, POST |
| `/api/project/[id]` | GET, PATCH, DELETE |
| `/api/health` | GET |

**Image upload pattern**: API routes accept `multipart/form-data`. Images are converted to data URIs via `src/utils/dataURIParser.ts`, uploaded to Cloudinary, and the resulting URL is stored in MongoDB.

### Styling

- **Tailwind CSS v4** (via `@tailwindcss/postcss`) for utility classes
- **Bootstrap** and other vendor CSS loaded as static files from `public/assets/css/` — imported directly in `layout.tsx`
- Custom fonts: Urbanist, Playfair Display, DM Mono via `next/font/google`
- WOW.js for scroll animations, initialized client-side in `HomeLayouts.tsx`

### Key patterns

- `HomeLayouts.tsx` is a `"use client"` component that manages Header/Footer, mobile menu, off-canvas, and scroll state for the entire site
- The rich text editor (`src/pages/blog/RichTextEditor.tsx`) uses TinyMCE and must be loaded with `dynamic(..., { ssr: false })`
- The Blog section is currently commented out on the homepage (`src/app/page.tsx`)
- Mongoose models use the `models.X || model(...)` pattern to prevent re-registration in hot-reload
- The database name is read from `process.env.DB_NAME` in `mongoose.ts` and hardcoded to `"Cluster0"` in `db.ts` (the unused raw client)
