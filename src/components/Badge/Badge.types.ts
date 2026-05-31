import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from './Badge.variants';

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;
export type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>['size']>;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** @default 'neutral' */
  variant?: BadgeVariant;
  /** @default 'md' */
  size?: BadgeSize;
  /** Render a colored dot before the label. */
  dot?: boolean;
}
