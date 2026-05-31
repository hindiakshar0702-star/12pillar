import { cva } from 'class-variance-authority';

export const avatarVariants = cva(
  [
    'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden',
    'bg-card text-text-primary border border-border',
    'shadow-bv-3d',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-caption',
        sm: 'h-8 w-8 text-small',
        md: 'h-10 w-10 text-body',
        lg: 'h-12 w-12 text-h4',
        xl: 'h-16 w-16 text-h3',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md',
      },
    },
    defaultVariants: { size: 'md', shape: 'circle' },
  }
);

export const avatarStatusVariants = cva(
  'absolute block rounded-full ring-2 ring-bg',
  {
    variants: {
      status: {
        online: 'bg-success',
        offline: 'bg-text-secondary',
        busy: 'bg-danger',
        away: 'bg-warning',
      },
      size: {
        xs: 'h-1.5 w-1.5 right-0 bottom-0',
        sm: 'h-2 w-2 right-0 bottom-0',
        md: 'h-2.5 w-2.5 right-0 bottom-0',
        lg: 'h-3 w-3 right-0.5 bottom-0.5',
        xl: 'h-3.5 w-3.5 right-1 bottom-1',
      },
    },
    defaultVariants: { status: 'online', size: 'md' },
  }
);
