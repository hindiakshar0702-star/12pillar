import { cva } from 'class-variance-authority';

export const tabsListVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row gap-1',
      vertical: 'flex-col gap-1',
    },
    variant: {
      underline: 'border-b border-border',
      pill: 'p-1 rounded-md bg-card border border-border',
      enclosed: 'rounded-md border border-border bg-card',
    },
  },
  defaultVariants: { orientation: 'horizontal', variant: 'underline' },
});

export const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap',
    'text-small font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        underline: [
          'h-10 px-3 -mb-px border-b-2 border-transparent text-text-secondary',
          'hover:text-text-primary',
          'data-[state=active]:border-primary data-[state=active]:text-text-primary',
        ],
        pill: [
          'h-8 px-3 rounded-sm text-text-secondary',
          'hover:text-text-primary',
          'data-[state=active]:bg-panel data-[state=active]:text-text-primary data-[state=active]:shadow-bv-1',
        ],
        enclosed: [
          'h-10 px-4 text-text-secondary border-r border-border last:border-r-0',
          'hover:text-text-primary',
          'data-[state=active]:bg-panel data-[state=active]:text-text-primary',
        ],
      },
    },
    defaultVariants: { variant: 'underline' },
  }
);
