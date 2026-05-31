import type { ReactNode } from 'react';

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface SelectProps<T extends string = string> {
  options: SelectOption<T>[];
  /** Controlled value. */
  value?: T | null;
  /** Uncontrolled initial value. */
  defaultValue?: T | null;
  onChange?: (value: T) => void;

  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;

  /** Enable text filter (combobox mode). @default false */
  searchable?: boolean;

  /** Width control passthrough. */
  className?: string;
  /** ARIA label when no visible label is rendered. */
  'aria-label'?: string;
  name?: string;
  id?: string;

  size?: 'sm' | 'md' | 'lg';
}
