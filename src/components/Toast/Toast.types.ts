import type { ReactNode } from 'react';

export type ToastVariant = 'default' | 'success' | 'danger' | 'warning' | 'info';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastInput {
  /** Stable id — pass to dedupe; omitted = auto-generated. */
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  /** @default 'default' */
  variant?: ToastVariant;
  /** Duration in ms. `Infinity` or `0` keeps the toast until dismissed. @default 5000 */
  duration?: number;
  action?: ToastAction;
}

export interface ToastInstance extends Required<Pick<ToastInput, 'title' | 'variant' | 'duration'>> {
  id: string;
  description?: ReactNode;
  action?: ToastAction;
  createdAt: number;
}

export type ToasterPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToasterProps {
  /** @default 'top-right' */
  position?: ToasterPosition;
  /** Maximum visible toasts at once. @default 5 */
  max?: number;
  className?: string;
}
