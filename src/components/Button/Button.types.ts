import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from './Button.variants';

/**
 * Visual style of the button.
 *
 * - `primary`   — Brand blue, used for the dominant action on a screen.
 * - `secondary` — Subtle panel surface, used for non-dominant actions.
 * - `ghost`     — Transparent surface, used inside dense UIs / toolbars.
 * - `danger`    — Destructive actions (delete, remove, revoke).
 * - `success`   — Positive confirmations (approve, publish).
 * - `warning`   — Cautionary actions (re-run, override).
 * - `outline`   — Bordered, neutral. Used as a quiet secondary.
 */
export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;

/**
 * Size token. Maps to height / padding / font-size pairs from the design system.
 */
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

export interface ButtonOwnProps {
  /** Visual style. @default 'primary' */
  variant?: ButtonVariant;
  /** Size token. @default 'md' */
  size?: ButtonSize;
  /** When true, button stretches to fill its parent. */
  fullWidth?: boolean;
  /** Replace label with a spinner and disable interaction. */
  loading?: boolean;
  /** Optional icon rendered before the label. */
  leftIcon?: ReactNode;
  /** Optional icon rendered after the label. */
  rightIcon?: ReactNode;
  /**
   * When `loading` is true, this label is announced to screen readers
   * via `aria-live` while the visual label is hidden.
   * @default 'Loading'
   */
  loadingLabel?: string;
}

export type ButtonProps = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps>;
