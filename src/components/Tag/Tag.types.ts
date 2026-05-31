import type { HTMLAttributes, ReactNode, MouseEventHandler } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { tagVariants } from './Tag.variants';

export type TagVariant = NonNullable<VariantProps<typeof tagVariants>['variant']>;
export type TagSize = NonNullable<VariantProps<typeof tagVariants>['size']>;

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onRemove'> {
  /** @default 'neutral' */
  variant?: TagVariant;
  /** @default 'md' */
  size?: TagSize;
  /** Render a remove button when provided. */
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  /** Accessible label for the remove button. @default 'Remove' */
  removeLabel?: string;
  leftIcon?: ReactNode;
}
