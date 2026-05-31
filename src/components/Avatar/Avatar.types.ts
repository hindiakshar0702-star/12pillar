import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { avatarVariants, avatarStatusVariants } from './Avatar.variants';

export type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>['size']>;
export type AvatarShape = NonNullable<VariantProps<typeof avatarVariants>['shape']>;
export type AvatarStatus = NonNullable<VariantProps<typeof avatarStatusVariants>['status']>;

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image URL. If load fails, fallback is rendered. */
  src?: string;
  /** Required descriptive text for screen readers (also used for initials fallback). */
  alt: string;
  /** Custom fallback node. If omitted, initials are derived from `alt`. */
  fallback?: React.ReactNode;
  /** @default 'md' */
  size?: AvatarSize;
  /** @default 'circle' */
  shape?: AvatarShape;
  /** Optional presence indicator. */
  status?: AvatarStatus;
}
