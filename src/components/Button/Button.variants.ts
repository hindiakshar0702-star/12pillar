import { cva } from 'class-variance-authority';

/**
 * Button variant system.
 *
 * Composes:
 *   base layout + typography
 * × variant (color/surface)
 * × size    (geometry)
 * × fullWidth
 *
 * The 3D feel comes from layered box-shadows defined in `tailwind.config.ts`:
 *   - `shadow-bv-3d`         — resting state (top highlight + drop shadow)
 *   - `shadow-bv-3d-pressed` — active state  (inner shadow simulates press)
 * paired with a 1px translate-y on press.
 */
export const buttonVariants = cva(
  [
    'group relative inline-flex items-center justify-center select-none',
    'whitespace-nowrap font-medium tracking-tight',
    'rounded-md border',
    'transition-[transform,box-shadow,background-color,border-color,color] duration-150 ease-bv-spring',
    'shadow-bv-3d',
    'active:translate-y-px active:shadow-bv-3d-pressed',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
    'data-[loading=true]:pointer-events-none data-[loading=true]:cursor-progress',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground border-primary/70',
          'hover:bg-primary/90 hover:border-primary',
        ],
        secondary: [
          'bg-card text-text-primary border-border',
          'hover:bg-panel hover:border-border/80',
        ],
        ghost: [
          'bg-transparent text-text-primary border-transparent shadow-none',
          'hover:bg-card/60 active:shadow-none',
        ],
        outline: [
          'bg-transparent text-text-primary border-border',
          'hover:bg-card/60',
        ],
        danger: [
          'bg-danger text-white border-danger/70',
          'hover:bg-danger/90 hover:border-danger',
        ],
        success: [
          'bg-success text-white border-success/70',
          'hover:bg-success/90 hover:border-success',
        ],
        warning: [
          'bg-warning text-black border-warning/70',
          'hover:bg-warning/90 hover:border-warning',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-small gap-2 rounded-sm',
        md: 'h-10 px-4 text-body gap-2 rounded-md',
        lg: 'h-12 px-6 text-body gap-3 rounded-md',
        xl: 'h-14 px-8 text-h4 gap-3 rounded-lg',
        icon: 'h-10 w-10 p-0 rounded-md',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);
