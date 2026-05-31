import type { ReactElement, ReactNode } from 'react';

export type PopoverPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'bottom-start'
  | 'bottom-end';

export interface PopoverProps {
  /** Trigger element. Must accept ref + onClick. */
  trigger: ReactElement;
  children: ReactNode;
  /** @default 'bottom' */
  placement?: PopoverPlacement;
  /** Spacing between trigger and panel in px. @default 8 */
  offset?: number;
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial state. @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
}
