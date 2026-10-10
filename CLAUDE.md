# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server (http://localhost:5173)
npm run build    # production build
npm run lint     # ESLint flat config
npm run preview  # serve the built output
```

**There is no test runner.** No test script, no vitest/jest. Don't invent `npm test`; verify changes by running the app. For UI/layout work, measuring computed styles in the browser is the practical check.

`.env` needs `VITE_API_BASE_URL` (see `.env.example`). The API serves Swagger at `/docs` on the API host — the repo never links it.

## Architecture

**Stack:** React 19 + Vite 8, React Router 8, TanStack Query 5, axios, Tailwind CSS v4, react-hook-form, Radix UI. Plain JavaScript — no TypeScript, despite the `@types/react` devDependency.

### Page module convention

Every route under `src/pages/` is a self-contained folder:

```
PageName/
  PageName.jsx     # layout only — composes components, no data logic
  usePageName.js   # all data fetching, mutations, derived state
  helpers.js       # pure functions (optional)
  index.js         # export { default } from './PageName'
  components/      # page-local components, with their own index.js barrel
```

The hook returns a flat object of values and handlers; the page destructures it and passes props down. Page-local components stay presentational. Nested component groups follow the same shape (`components/SeatMap/{SeatMap.jsx, helpers.js, index.js}`).

### Imports

Everything goes through barrel files and the `@` alias (`@` → `./src`, set in `vite.config.js`): `@/components`, `@/config`, `@/context`, `@/helpers`, `@/hooks`, `@/services`. Don't import deep paths across module boundaries; add the export to the relevant `index.js` instead. Within a page folder, relative imports are the norm.

### Data layer

`src/services/*.js` are thin axios wrappers returning the raw response — callers unwrap `response.data.data` themselves (usually in a React Query `select`).

`src/services/axios.js` holds the shared instance: it injects the bearer token from `localStorage` on every request, and on a 401 clears the token and invokes a globally registered handler. Individual requests opt out via a custom `unauthorizedBehavior` config flag:

- `'ignore'` — don't clear the token, don't notify (for probing calls)
- `'clear'` — clear the token but don't open the login modal
- unset — clear and notify (default; opens the login modal)

Query keys live in `src/config/queryKeys.js` and are always used as arrays with a params object: `[SESSION_QUERY_KEY, { sessionId }]`. `retryQuery` (`src/config/queryRetry.js`) is the global retry policy — it never retries 4xx.

### Auth

`AuthContext` wraps `useAuthContextValue`, which is where the real logic lives. The non-obvious part is **`requireAuth(action)`**: if authenticated it runs `action` immediately; otherwise it stashes the callback in a ref, opens the login modal, and replays it from `completeAuth` once login succeeds. Use it for any gated user action rather than redirecting or checking `isAuthenticated` at the call site.

`src/components/Providers.jsx` composes QueryClientProvider → BrowserRouter → AuthContextProvider. Routes are declared in `App.jsx`; `Layout` wraps every route with the header, footer and auth modals.

### Styling — read this before touching any layout

Tailwind v4 with **no `tailwind.config.js`**. All design tokens are `@theme` entries in `src/index.css` (colors, radii, shadows, spacing, easing, keyframes), plus custom `@utility` blocks.

`src/index.css` sets:

```css
html { font-size: calc(100vw / 108); }
```

The whole UI is sized in `rem` and therefore **scales with viewport width**. Figma frames are 1728px wide, and 1728 / 108 = 16, so:

> **1rem = 16 design px.** A Figma px value maps to a Tailwind spacing step by dividing by 4 — 52px → `size-13`, 36px → `gap-9`, 135px → `h-33.75`.

Consequences worth knowing: measured browser px are viewport-relative (at a 1440px viewport 1rem = 13.33px, so multiply measured px by 16/13.33 to get design px), and fixed `px` values break the scaling — use rem/Tailwind steps, or an arbitrary rem value (`rounded-[0.3125rem]`) when no token fits.

Compose classes with `cn` from `@/helpers` (clsx + tailwind-merge) for anything conditional. Prefer utilities over custom CSS; add a new `@theme` token or `@utility` only when a value is genuinely reused.

## Conventions

- **Destructure props in the parameter list** — `const X = ({ a, ...rest }) => ...`, never `props.a`.
- Components are arrow functions with a default export, re-exported from the folder's `index.js` barrel.
- Prettier: single quotes, semicolons, `es5` trailing commas. ESLint extends `eslint-config-prettier`, so formatting is Prettier's job, not ESLint's.
- `src/context/**` is exempt from `react-refresh/only-export-components` (it exports both a provider and a hook).
- Module-level constants are `SCREAMING_SNAKE_CASE` and declared above the component.
