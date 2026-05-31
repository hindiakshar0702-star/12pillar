import { useEffect, useRef, useCallback, useState, type RefObject } from 'react';

/** Run a callback when Escape is pressed (when `enabled`). */
export function useEscapeKey(onEscape: () => void, enabled: boolean = true): void {
  const cb = useRef(onEscape);
  cb.current = onEscape;

  useEffect(() => {
    if (!enabled) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cb.current();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enabled]);
}

/** Detect clicks outside the referenced element. */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutside: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
): void {
  const cb = useRef(onOutside);
  cb.current = onOutside;

  useEffect(() => {
    if (!enabled) return;
    const handler = (event: MouseEvent | TouchEvent) => {
      const node = ref.current;
      if (node && !node.contains(event.target as Node)) {
        cb.current(event);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [ref, enabled]);
}

/**
 * Trap keyboard focus inside the referenced container.
 * Restores focus to the previously-focused element when disabled.
 */
export function useFocusTrap<T extends HTMLElement>(
  ref: RefObject<T | null>,
  enabled: boolean
): void {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const root = ref.current;
    if (!root) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const getFocusable = (): HTMLElement[] => {
      const selector = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(',');
      return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => !el.hasAttribute('aria-hidden') && el.offsetParent !== null
      );
    };

    // Move initial focus inside the container if it's not already there.
    if (!root.contains(document.activeElement)) {
      const items = getFocusable();
      (items[0] ?? root).focus();
    }

    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    root.addEventListener('keydown', handler);

    return () => {
      root.removeEventListener('keydown', handler);
      previouslyFocused.current?.focus?.();
    };
  }, [ref, enabled]);
}

/** Tiny disclosure state machine: open/close/toggle. */
export function useDisclosure(initial: boolean = false) {
  const [isOpen, setIsOpen] = useState(initial);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  return { isOpen, open, close, toggle, setIsOpen } as const;
}

/** Lock document scroll while `enabled` is true. */
export function useScrollLock(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [enabled]);
}
