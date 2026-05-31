import { forwardRef, useEffect, useId, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Portal } from '@/lib/Portal';
import { useEscapeKey, useFocusTrap, useScrollLock } from '@/lib/hooks';
import type { ModalProps } from './Modal.types';

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  full: 'max-w-[calc(100vw-32px)] h-[calc(100vh-64px)]',
} as const;

/**
 * Modal — accessible dialog with focus trap, scroll lock, and escape close.
 *
 * - Renders into a portal at document.body
 * - Locks page scroll while open
 * - Traps Tab focus inside the dialog
 * - Closes on Escape (configurable)
 * - Closes on overlay click (configurable)
 * - Announces title via aria-labelledby; description via aria-describedby
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open,
    onClose,
    title,
    description,
    size = 'md',
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    children,
    footer,
    initialFocusRef,
    className,
    ...rest
  },
  ref
) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const descId = useId();

  useEscapeKey(onClose, open && closeOnEscape);
  useScrollLock(open);
  useFocusTrap(dialogRef, open);

  // Optional: move initial focus to a custom element after the dialog mounts
  useEffect(() => {
    if (!open || !initialFocusRef?.current) return;
    queueMicrotask(() => initialFocusRef.current?.focus());
  }, [open, initialFocusRef]);

  return (
    <Portal>
      <AnimatePresence>
        {open ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            aria-hidden={!open}
          >
            <motion.div
              key="overlay"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={closeOnOverlayClick ? onClose : undefined}
              data-testid="modal-overlay"
            />
            <motion.div
              key="dialog"
              ref={(node) => {
                dialogRef.current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId : undefined}
              aria-describedby={description ? descId : undefined}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 4 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'relative w-full rounded-lg border border-border bg-panel shadow-bv-3',
                'flex flex-col',
                sizeMap[size],
                className
              )}
              {...rest}
            >
              {(title || showCloseButton) && (
                <header className="flex items-start justify-between gap-4 border-b border-border p-4">
                  <div className="flex flex-col gap-1">
                    {title ? (
                      <h2 id={titleId} className="text-h4 text-text-primary">
                        {title}
                      </h2>
                    ) : null}
                    {description ? (
                      <p id={descId} className="text-small text-text-secondary">
                        {description}
                      </p>
                    ) : null}
                  </div>
                  {showCloseButton ? (
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close dialog"
                      className={cn(
                        'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm',
                        'text-text-secondary hover:bg-card hover:text-text-primary',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                      )}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  ) : null}
                </header>
              )}

              <div className="flex-1 overflow-y-auto p-4">{children}</div>

              {footer ? (
                <footer className="flex items-center justify-end gap-2 border-t border-border p-4">
                  {footer}
                </footer>
              ) : null}
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </Portal>
  );
});
Modal.displayName = 'Modal';
