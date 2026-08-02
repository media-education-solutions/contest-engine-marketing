# Contest Engine — Marketing Website

Marketing site for [Contest Engine](https://contest-engine.com) by Media Education Solutions, Inc. — the platform for running film & photo contests and media competitions: collect submissions, manage fair anonymous judging, celebrate winners.

## Stack
Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Vercel

## Development
```bash
npm install
npm run dev        # http://localhost:3010
npm run lint
npm run typecheck
npm run build
```

## Architecture in one paragraph
Strict one-way layering: **content → blocks → pages**. All copy (including the product name) lives in typed modules under `src/content/` — never in components. Blocks (`src/components/blocks/`) are props-driven marketing sections; pages only compose them. Brand values exist solely as design tokens in `src/app/globals.css`. Full docs in `.claude/docs/` (PROJECT, ARCHITECTURE, SITEMAP, CONTENT, BRAND, ROADMAP).

## Project tracking
Linear: [Contest Engine Marketing Website](https://linear.app/media-education-solutions/project/contest-engine-marketing-website-1231d9daa89e)

## Stripe
Test credentials, webhook setup, and env vars: [STRIPE.md](./STRIPE.md)
