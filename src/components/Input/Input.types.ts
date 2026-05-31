import type { InputHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { inputWrapperVariants } from './Input.variants';

export type InputSize = NonNullable<VariantProps<typeof inputWrapperVariants>['size']>;

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label rendered above the field. */
  label?: ReactNode;
  /** Helper text rendered below the field. */
  hint?: ReactNode;
  /** When set, the field is marked invalid and `error` is shown in place of `hint`. */
  error?: ReactNode;
  /** Required marker (visual only). */
  required?: boolean;
  /** Hide the visual label but keep it accessible to screen readers. */
  hideLabel?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Wrapper className (the field's own className still applies to the input). */
  wrapperClassName?: string;
  /** @default 'md' */
  size?: InputSize;
}
