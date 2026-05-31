import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  [
    'inline-flex items-center justify-center gap-1 whitespace-nowrap',
    'font-medium tracking-tight',
    'border',
  ],
  {
    variants: {
      variant: {
        neutral: 'bg-card text-text-secondary border-border',
        primary: 'bg-primary/15 text-primary border-primary/30',
        success: 'bg-success/15 text-success border-success/30',
        warning: 'bg-warning/15 text-warning border-warning/30',
        danger: 'bg-danger/15 text-danger border-danger/30',
        outline: 'bg-transparent text-text-primary border-border',
        solid: 'bg-primary text-primary-foreground border-primary',
      },
      size: {
        sm: 'h-5 px-2 text-caption rounded-sm',
        md: 'h-6 px-2.5 text-small rounded-sm',
        lg: 'h-7 px-3 text-small rounded-md',
      },
      dot: {
        true: 'pl-1.5',
        false: '',
      },
    },
    defaultVariants: { variant: 'neutral', size: 'md', dot: false },
  }
);
