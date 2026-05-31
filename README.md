# BannerView 3D — Design System

Production-ready React component library with a tactile 3D feel.
Dark-first surfaces, design-token theming, and accessibility built in.

## Stack

- **React 19** · **TypeScript** (strict)
- **Vite 6** · **TailwindCSS 3.4** · **class-variance-authority** · **tailwind-merge**
- **Framer Motion** · **Lucide React** · **Zustand**
- **Vitest** · **React Testing Library** · **Storybook**

## Install & run

```bash
npm install
npm run dev        # Vite dev server with the demo page
npm test           # Vitest suite (single run)
npm run storybook  # opens Storybook on :6006 (after storybook init)
```

> Sandbox note: dependencies must be installed locally. The reference repo is
> code-only; `npm install` connects to the public npm registry.

## Components

| Category   | Component   | Folder                            | Notes |
| ---------- | ----------- | --------------------------------- | ----- |
| Primitive  | `Button`    | `src/components/Button/`          | 7 variants × 5 sizes, loading state |
| Display    | `Avatar`    | `src/components/Avatar/`          | Image + initials fallback + presence dot |
| Display    | `Badge`     | `src/components/Badge/`           | Static label, optional dot |
| Display    | `Tag`       | `src/components/Tag/`             | Removable filter chip |
| Layout     | `Card`      | `src/components/Card/`            | Compound: Header/Title/Description/Body/Footer |
| Forms      | `Input`     | `src/components/Input/`           | Label + hint + error + icons |
| Forms      | `Textarea`  | `src/components/Textarea/`        | + character counter |
| Forms      | `Select`    | `src/components/Select/`          | Listbox + optional combobox filter |
| Navigation | `Tabs`      | `src/components/Tabs/`            | Compound, keyboard nav, 3 variants |
| Overlay    | `Modal`     | `src/components/Modal/`           | Focus trap, scroll lock, ESC close |
| Overlay    | `Tooltip`   | `src/components/Tooltip/`         | Hover/focus, portal-rendered |
| Overlay    | `Popover`   | `src/components/Popover/`         | Click-triggered floating panel |
| Feedback   | `Toaster` + `toast` | `src/components/Toast/`   | Zustand store, imperative API |

Every component folder follows the same contract:

```
ComponentName/
  ComponentName.tsx          # source
  ComponentName.types.ts     # types
  ComponentName.variants.ts  # CVA variants (when applicable)
  ComponentName.test.tsx     # vitest + RTL
  ComponentName.stories.tsx  # storybook
  README.md                  # docs
  index.ts                   # barrel
```

## Layout

```
src/
  components/    # all components, one folder each
  lib/
    cn.ts        # clsx + tailwind-merge helper
    Portal.tsx   # SSR-safe portal
    hooks.ts     # useEscapeKey, useClickOutside, useFocusTrap, useScrollLock, useDisclosure
    index.ts
  styles/
    tokens.css   # HSL design tokens (CSS variables)
    globals.css  # Tailwind layers + base
  App.tsx        # demo page
  main.tsx
```

## Design tokens

CSS variables live in `src/styles/tokens.css` (HSL channels for Tailwind alpha
support). Tailwind references them via the `colors`, `fontSize`, `spacing`,
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

## Accessibility

Every component ships with:

- Semantic roles (`button`, `dialog`, `tablist`/`tab`/`tabpanel`, `combobox`/`listbox`/`option`, `tooltip`, `status`/`alert`)
- ARIA attributes (`aria-expanded`, `aria-controls`, `aria-haspopup`, `aria-selected`, `aria-invalid`, `aria-describedby`, `aria-modal`, `aria-busy`, `aria-activedescendant`)
- Keyboard support (Enter/Space, Esc, arrow keys, Tab traps where appropriate)
- `:focus-visible` rings (no pointer-focus noise)
- WCAG AA contrast on the dark surface

## Imperative toast example

```tsx
import { Toaster, toast } from '@/components/Toast';

// in your root:
<Toaster position="top-right" />

// from anywhere:
toast.success('Saved');
toast.error('Network error', { description: 'Please retry.' });
toast.info('Update available', {
  action: { label: 'Reload', onClick: () => location.reload() },
});
```
