import type { ReactElement, ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** The element that triggers the tooltip on hover/focus. Must be a single element that accepts a ref. */
  children: ReactElement;
  /** Tooltip content (string or node). */
  content: ReactNode;
  /** @default 'top' */
  placement?: TooltipPlacement;
  /** Open delay in ms. @default 250 */
  openDelay?: number;
  /** Close delay in ms. @default 80 */
  closeDelay?: number;
  /** Disable rendering. */
  disabled?: boolean;
  /** Spacing between trigger and tooltip in px. @default 8 */
  offset?: number;
}
