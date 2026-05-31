import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { cardVariants } from './Card.variants';

export type CardVariant = NonNullable<VariantProps<typeof cardVariants>['variant']>;
export type CardPadding = NonNullable<VariantProps<typeof cardVariants>['padding']>;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** @default 'default' */
  variant?: CardVariant;
  /** @default 'md' */
  padding?: CardPadding;
  /** Adds hover/active affordances when the card is the click target. */
  interactive?: boolean;
}
