import {
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Portal } from '@/lib/Portal';
import { useEscapeKey } from '@/lib/hooks';
import { cn } from '@/lib/cn';
import type { PopoverPlacement, PopoverProps } from './Popover.types';

interface Coords {
  top: number;
  left: number;
}

function compute(
  trigger: DOMRect,
  size: { width: number; height: number },
  placement: PopoverPlacement,
  offset: number
): Coords {
  const cx = trigger.left + trigger.width / 2;
  switch (placement) {
    case 'top':
      return { top: trigger.top - size.height - offset, left: cx - size.width / 2 };
    case 'bottom':
      return { top: trigger.bottom + offset, left: cx - size.width / 2 };
    case 'left':
      return {
        top: trigger.top + trigger.height / 2 - size.height / 2,
        left: trigger.left - size.width - offset,
      };
    case 'right':
      return {
        top: trigger.top + trigger.height / 2 - size.height / 2,
        left: trigger.right + offset,
      };
    case 'bottom-start':
      return { top: trigger.bottom + offset, left: trigger.left };
    case 'bottom-end':
      return { top: trigger.bottom + offset, left: trigger.right - size.width };
  }
}

/**
 * Popover — click-triggered floating panel.
 *
 * - Closes on outside mousedown and Escape
 * - Trigger receives full ARIA wiring (aria-expanded, aria-controls, aria-haspopup)
 * - Panel is portal-rendered and animated with Framer Motion
 */
export function Popover({
  trigger,
  children,
  placement = 'bottom',
  offset = 8,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  className,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const triggerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0 });
  const id = useId();

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  useEscapeKey(() => setOpen(false), open);

  // Outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, setOpen]);

  // Position
  useEffect(() => {
    if (!open || !triggerRef.current || !panelRef.current) return;
    const t = triggerRef.current.getBoundingClientRect();
    const r = panelRef.current.getBoundingClientRect();
    const next = compute(t, { width: r.width, height: r.height }, placement, offset);
    const padding = 8;
    next.left = Math.max(padding, Math.min(window.innerWidth - r.width - padding, next.left));
    next.top = Math.max(padding, Math.min(window.innerHeight - r.height - padding, next.top));
    setCoords(next);
  }, [open, placement, offset]);

  // Restore focus to trigger on close
  const wasOpen = useRef(open);
  useEffect(() => {
    if (wasOpen.current && !open) {
      triggerRef.current?.focus?.();
    }
    wasOpen.current = open;
  }, [open]);

  const child = trigger as ReactElement<{
    ref?: React.Ref<HTMLElement>;
    onClick?: React.MouseEventHandler<HTMLElement>;
    'aria-expanded'?: boolean;
    'aria-controls'?: string;
    'aria-haspopup'?: 'dialog' | 'menu' | 'true';
    disabled?: boolean;
  }>;

  const renderedTrigger = cloneElement(child, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      const childRef = (child as unknown as { ref?: React.Ref<HTMLElement> }).ref;
      if (typeof childRef === 'function') childRef(node);
      else if (childRef && typeof childRef === 'object')
        (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
    },
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      child.props.onClick?.(e);
      if (!disabled) setOpen(!open);
    },
    'aria-expanded': open,
    'aria-controls': id,
    'aria-haspopup': 'dialog',
    disabled: child.props.disabled || disabled,
  });

  return (
    <>
      {renderedTrigger}
      <Portal>
        <AnimatePresence>
          {open ? (
            <motion.div
              ref={panelRef}
              id={id}
              role="dialog"
              initial={{ opacity: 0, scale: 0.96, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 2 }}
              transition={{ duration: 0.14 }}
              style={{ top: coords.top, left: coords.left, position: 'fixed' }}
              className={cn(
                'z-50 rounded-md border border-border bg-panel shadow-bv-3',
                'min-w-[12rem] outline-none',
                className
              )}
              tabIndex={-1}
            >
              {children}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Portal>
    </>
  );
}
