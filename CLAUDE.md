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
- **Font**: Geist Variable (`@fontsource-variable/geist`)

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

## Conventions

- UI primitives go in `src/components/ui/` (managed by shadcn CLI)
- Shared utilities in `src/lib/utils.ts` — use `cn()` for class merging
- shadcn component aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`
- CSS variables are enabled; base color is `neutral`
