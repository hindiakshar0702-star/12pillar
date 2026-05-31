import type { HTMLAttributes, ButtonHTMLAttributes } from 'react';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsVariant = 'underline' | 'pill' | 'enclosed';

export interface TabsContextValue {
  value: string;
  setValue: (next: string) => void;
  orientation: TabsOrientation;
  variant: TabsVariant;
  baseId: string;
}

export interface TabsRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controlled active value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** @default 'horizontal' */
  orientation?: TabsOrientation;
  /** @default 'underline' */
  variant?: TabsVariant;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  /** Keep panel mounted when inactive (useful for forms). */
  forceMount?: boolean;
}
