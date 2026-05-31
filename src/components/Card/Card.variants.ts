import { cva } from 'class-variance-authority';

export const cardVariants = cva(
  ['rounded-lg border text-text-primary', 'transition-[transform,box-shadow,border-color]'],
  {
    variants: {
      variant: {
        default: 'bg-card border-border shadow-bv-2',
        elevated: 'bg-card border-border shadow-bv-3',
        outlined: 'bg-transparent border-border shadow-none',
        panel: 'bg-panel border-border/60 shadow-bv-1',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
      interactive: {
        true: [
          'cursor-pointer',
          'hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-bv-3',
          'active:translate-y-0 active:shadow-bv-2',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        ],
        false: '',
      },
    },
    defaultVariants: { variant: 'default', padding: 'md', interactive: false },
  }
);
