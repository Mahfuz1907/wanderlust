# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## What this is

Next.js 16.4.3 (App Router, `src/app/`) client for WanderLust (travel/Airbnb-style listings). React 19.3, TypeScript strict mode. Not a monorepo, not yet git-initialized.

Early stage: `src/app/page.tsx` renders two feature components — `src/components/Navbar.tsx` and `src/components/Banner.tsx`. No other routes exist yet; the bulk of `src/` is the checked-in shadcn/ui component library.

`README.md` is untouched create-next-app boilerplate and partly wrong (claims Geist font and an `app/` dir) — trust config/code over it.

## Commands

- `npm run dev` — dev server (Turbopack). This also regenerates the `nextjs-agent-rules` block above; never delete it.
- Verification loop: `npx tsc --noEmit` → `npm run lint <files>` (lint is ESLint flat config, `eslint-config-next` core-web-vitals + typescript; takes file args: `npm run lint src/app/page.tsx`).
- `npm run build` — production build; the only full typecheck (there is no `typecheck` script).
- Typecheck prerequisite: `npx tsc --noEmit` needs Next's generated route types — `next-env.d.ts` imports `.next/dev/types/routes.d.ts`. That folder doesn't exist until `next dev` has run once; on a fresh checkout expect `LayoutProps<"/">` / missing-module errors until you start the dev server.
- No test runner, no formatter config, no CI, no `.env*` files exist yet.

## Toolchain quirks (verify in `next.config.ts`)

- `cacheComponents: true` — caching/rendering semantics differ from stock Next.js; read `node_modules/next/dist/docs/01-app/` before touching data fetching or caching APIs.
- `reactCompiler: true` (babel-plugin-react-compiler) — do **not** add manual memoization (`useMemo`/`useCallback`/`React.memo`); the compiler handles it.
- `partialPrefetching: true`.
- Turbopack processes `*.css` through `@tailwindcss/turbopack`.
- Next 16 API deltas are real: local docs (`node_modules/next/dist/docs/`) win over training data — e.g. `next/image` takes `preload`, not the deprecated `priority` (see `Banner.tsx`).
- Generated route types: layouts/pages use Next-generated types like `LayoutProps<"/">` (see `src/app/layout.tsx`). Keep signatures compatible with these generated types.

## Styling & UI

- Tailwind CSS v4, CSS-first config — no `tailwind.config.*`. Theme tokens live in `src/app/globals.css` (`@theme inline` + CSS variables). Edit tokens there, not in a JS config. Brand teal is a token: `--color-brand: #15a1bf` (sampled from the logo asset) — prefer `bg-brand`/`text-brand`/`hover:bg-brand/90` over hardcoded teal hexes.
- shadcn style is **`base-nova`** (`components.json`): components are built on `@base-ui/react`, **not Radix**. When adding components use the CLI (`npx shadcn add <name>`) or follow the existing `src/components/ui/*` files. Never port Radix-based shadcn examples by hand.
- `src/components/ui/` is reserved for shadcn primitives; feature/layout components live at `src/components/*.tsx` (e.g. `Navbar.tsx`, `Banner.tsx`), hooks in `src/hooks/`, helpers in `src/lib/`.
- Path alias: `@/*` → `./src/*`.
- Dark mode uses the `.dark` class (`@custom-variant dark` in `globals.css`).
- Assets are in `public/assets/` — the logo is `Wanderlast.png` (misspelled vs the product name; easy to miss when searching), hero is `Banner.png` (pre-darkened for white text — no extra scrim needed).

## Other gotchas

- `src/lib/highlighter.tsx` lazy-loads shiki languages from a fixed `languages` map. If a language fails to highlight, add its `shiki/langs/*.mjs` import to that map — it won't load automatically.
- Fonts are a trap: Josefin Sans only renders because `josefinSans.className` is applied to `<html>` in `src/app/layout.tsx`. The `variable: "--font-josefin-sans"` prop is never applied (`josefinSans.variable` is missing from the `<html>` class list), and `--font-sans`/`--font-heading`/`--font-mono` in `globals.css` all resolve through circular or undefined variables (`var(--font-sans)`, `var(--font-geist-mono)`) — so `font-sans`/`font-heading`/`font-mono` utilities currently resolve to nothing. Fix before relying on font tokens: apply `josefinSans.variable` and define `--font-sans` from it.
