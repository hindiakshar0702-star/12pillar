import type { TextareaHTMLAttributes, ReactNode } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  hideLabel?: boolean;
  /** Show a character counter; pair with `maxLength` for "x / N" display. */
  showCount?: boolean;
  wrapperClassName?: string;
}
