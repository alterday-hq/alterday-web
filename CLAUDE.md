# alterday-web

React + Vite web app for the Alterday project.

## Stack

- **Framework**: React 19 + TypeScript
- **Build**: Vite 8
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **UI components**: shadcn/ui (`base-nova` style, Base UI primitives)
- **Icons**: lucide-react
- **Routing**: react-router-dom v7
- **State**: Zustand
- **Server state / data fetching**: TanStack Query v5
- **Backend / Auth**: Supabase (`@supabase/supabase-js`)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Fonts**: Geist Variable (body), Syne Variable (headings), Geist Mono (mono)

## Path alias

`@/` resolves to `src/` (configured in `vite.config.ts`).

## Commands

```bash
npm run dev       # start dev server
npm run build     # type-check + build
npm run lint      # ESLint
npm run preview   # preview production build
```

## Environment

Copy `.env.example` to `.env.local` and fill in:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Design system

### Color palette — 60/30/10 rule

| Role | Dark | Light |
|------|------|-------|
| 60% background | `#0F1117` | `#F5F7F7` |
| 30% surface (cards, panels) | `#1A2E2E` | `#D6EEEB` |
| 10% accent / CTA | `#00E5C3` | `#00967D` |

- Every color used or reused must be defined in `src/shared/colors.ts` — never hardcode hex values in components
- CSS custom properties for the full shadcn token system live in `src/index.css`

### Typography

- Scale, weights, line heights, letter spacing, and named text style presets are defined in `src/shared/typography.ts`
- Font classes: `font-sans` (Geist), `font-heading` (Syne), `font-mono` (Geist Mono)
- Font files live in `src/assets/fonts/`

### Shared design tokens

`src/shared/` is the single source of truth for all design tokens:
- `colors.ts` — brand palette and semantic foreground pairings
- `typography.ts` — type scale, weights, line heights, presets

## Third-party UI components (React Bits)

Components from [React Bits](https://reactbits.dev) are installed via:

```bash
npm install <package>                          # e.g. npm install three face-api.js
npx shadcn@latest add @react-bits/<Component>  # e.g. npx shadcn@latest add @react-bits/GlitchText-TS-CSS
```

The user provides the package/component names. Always remap any color props to match the brand palette above.

## Code standards

- Write at world-class senior frontend developer + UI/UX designer level
- Comments in English only
- No redundant comments — comment only when logic is non-obvious, or to explain what a strange/non-intuitive file is doing
- Do not hardcode colors — always import from `src/shared/colors.ts`
- After every response, suggest a git commit message

## Conventions

- UI primitives go in `src/components/ui/` (managed by shadcn CLI)
- Shared utilities in `src/lib/utils.ts` — use `cn()` for class merging
- shadcn component aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`
- CSS variables enabled; mapped to brand palette via oklch values in `src/index.css`
