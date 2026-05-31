# BannerView 3D — Design System

Production-ready React component library with a tactile 3D feel.
Dark-first surfaces, design-token theming, and accessibility built in.

## Stack

- **React 19** · **TypeScript** (strict)
- **Vite 6** · **TailwindCSS 3.4** · **class-variance-authority** · **tailwind-merge**
- **Framer Motion** · **Lucide React** · **Zustand**
- **Vitest** · **React Testing Library** · **Storybook**

## Layout

```
src/
  components/
    Button/
      Button.tsx
      Button.types.ts
      Button.variants.ts
      Button.test.tsx
      Button.stories.tsx
      README.md
      index.ts
    index.ts
  lib/
    cn.ts          # clsx + tailwind-merge helper
    index.ts
  styles/
    tokens.css     # HSL design tokens (CSS variables)
    globals.css    # Tailwind + base layer
  App.tsx          # demo page
  main.tsx
```

## Design tokens

Tokens are exposed as CSS variables (`--bv-*`) so consumers can re-theme at
runtime. Tailwind references them via the `colors`, `fontSize`, `spacing`,
`borderRadius`, and `boxShadow` extensions in `tailwind.config.ts`.

| Token             | Value     |
| ----------------- | --------- |
| `bg`              | `#0F1115` |
| `panel`           | `#161A22` |
| `card`            | `#1C2230` |
| `border`          | `#2A3345` |
| `primary`         | `#3B82F6` |
| `success`         | `#22C55E` |
| `warning`         | `#F59E0B` |
| `danger`          | `#EF4444` |
| `text.primary`    | `#FFFFFF` |
| `text.secondary`  | `#AAB4C5` |

## Scripts

```bash
npm install       # first run
npm run dev       # start Vite dev server
npm run build     # type-check + production build
npm test          # run Vitest suite once
npm run storybook # open Storybook on :6006
```

## Components

| Component | Status | Doc |
| --------- | ------ | --- |
| Button    | Stable | [src/components/Button/README.md](./src/components/Button/README.md) |

More primitives (Card, Input, Modal, Tooltip, Tabs, …) follow the same
directory contract — copy `Button/` as the template.
