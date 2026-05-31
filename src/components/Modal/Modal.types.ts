import type { HTMLAttributes, ReactNode, RefObject } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Controlled open state. */
  open: boolean;
  /** Called when the dialog requests to close (overlay click, Escape, X). */
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  /** @default 'md' */
  size?: ModalSize;
  /** @default true */
  showCloseButton?: boolean;
  /** @default true */
  closeOnOverlayClick?: boolean;
  /** @default true */
  closeOnEscape?: boolean;
  /** Footer slot — typically action buttons. */
  footer?: ReactNode;
  /** Move initial focus to a specific element instead of the first focusable. */
  initialFocusRef?: RefObject<HTMLElement | null>;
}
