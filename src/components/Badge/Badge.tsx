import { forwardRef, memo } from 'react';
import { cn } from '@/lib/cn';
import { badgeVariants } from './Badge.variants';
import type { BadgeProps } from './Badge.types';

const dotColor: Record<string, string> = {
  neutral: 'bg-text-secondary',
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  outline: 'bg-text-secondary',
  solid: 'bg-white',
};

/**
 * Badge — compact status / count label.
 */
const BadgeImpl = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'neutral', size = 'md', dot = false, className, children, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, dot }), className)}
      {...rest}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className={cn('h-1.5 w-1.5 rounded-full', dotColor[variant])}
        />
      ) : null}
      {children}
    </span>
  );
});

export const Badge = memo(BadgeImpl);
Badge.displayName = 'Badge';
