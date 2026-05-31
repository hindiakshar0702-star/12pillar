import { cva } from 'class-variance-authority';

export const tagVariants = cva(
  [
    'inline-flex max-w-full items-center gap-1.5 whitespace-nowrap',
    'border font-medium',
  ],
  {
    variants: {
      variant: {
        neutral: 'bg-card text-text-primary border-border',
        primary: 'bg-primary/15 text-primary border-primary/30',
        success: 'bg-success/15 text-success border-success/30',
        warning: 'bg-warning/15 text-warning border-warning/30',
        danger: 'bg-danger/15 text-danger border-danger/30',
      },
      size: {
        sm: 'h-6 pl-2 pr-1.5 text-caption rounded-sm',
        md: 'h-7 pl-2.5 pr-2 text-small rounded-md',
        lg: 'h-8 pl-3 pr-2 text-body rounded-md',
      },
    },
    defaultVariants: { variant: 'neutral', size: 'md' },
  }
);
