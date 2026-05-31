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
import { cn } from '@/lib/cn';
import type { TooltipPlacement, TooltipProps } from './Tooltip.types';

interface Coords {
  top: number;
  left: number;
}

function computePosition(
  trigger: DOMRect,
  tooltipSize: { width: number; height: number },
  placement: TooltipPlacement,
  offset: number
): Coords {
  const cx = trigger.left + trigger.width / 2;
  const cy = trigger.top + trigger.height / 2;
  switch (placement) {
    case 'top':
      return { top: trigger.top - tooltipSize.height - offset, left: cx - tooltipSize.width / 2 };
    case 'bottom':
      return { top: trigger.bottom + offset, left: cx - tooltipSize.width / 2 };
    case 'left':
      return { top: cy - tooltipSize.height / 2, left: trigger.left - tooltipSize.width - offset };
    case 'right':
      return { top: cy - tooltipSize.height / 2, left: trigger.right + offset };
  }
}

/**
 * Tooltip — text overlay shown on hover or focus.
 *
 * - Portal-rendered, manually positioned (no Floating UI dependency).
 * - Trigger gets `aria-describedby` while open.
 * - Hidden on Escape and on blur.
 */
export function Tooltip({
  children,
  content,
  placement = 'top',
  openDelay = 250,
  closeDelay = 80,
  disabled = false,
  offset = 8,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);
  const id = useId();

  const clearTimers = useCallback(() => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  const show = useCallback(() => {
    if (disabled) return;
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpen(true), openDelay);
  }, [disabled, openDelay, clearTimers]);

  const hide = useCallback(() => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(false), closeDelay);
  }, [closeDelay, clearTimers]);

  // Position the tooltip after it mounts
  useEffect(() => {
    if (!open || !triggerRef.current || !tooltipRef.current) return;
    const t = triggerRef.current.getBoundingClientRect();
    const r = tooltipRef.current.getBoundingClientRect();
    const next = computePosition(t, { width: r.width, height: r.height }, placement, offset);
    // Keep within viewport
    const padding = 4;
    next.left = Math.max(padding, Math.min(window.innerWidth - r.width - padding, next.left));
    next.top = Math.max(padding, Math.min(window.innerHeight - r.height - padding, next.top));
    setCoords(next);
  }, [open, placement, offset, content]);

  // Hide on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const child = children as ReactElement<{
    ref?: React.Ref<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    'aria-describedby'?: string;
  }>;

  const trigger = cloneElement(child, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      const childRef = (child as unknown as { ref?: React.Ref<HTMLElement> }).ref;
      if (typeof childRef === 'function') childRef(node);
      else if (childRef && typeof childRef === 'object')
        (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
    },
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      child.props.onMouseEnter?.(e);
      show();
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      child.props.onMouseLeave?.(e);
      hide();
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      child.props.onFocus?.(e);
      show();
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      child.props.onBlur?.(e);
      hide();
    },
    'aria-describedby': open
      ? [child.props['aria-describedby'], id].filter(Boolean).join(' ')
      : child.props['aria-describedby'],
  });

  return (
    <>
      {trigger}
      <Portal>
        <AnimatePresence>
          {open && !disabled ? (
            <motion.div
              ref={tooltipRef}
              id={id}
              role="tooltip"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.12 }}
              style={{ top: coords.top, left: coords.left, position: 'fixed' }}
              className={cn(
                'pointer-events-none z-[60]',
                'rounded-sm border border-border bg-panel px-2.5 py-1.5',
                'text-caption text-text-primary shadow-bv-2',
                'max-w-xs'
              )}
            >
              {content}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Portal>
    </>
  );
}
