import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  /** Container element to portal into. Defaults to document.body. */
  container?: HTMLElement | null;
}

/**
 * Render children into a DOM node outside the parent tree.
 * Renders nothing on the server / before mount to avoid hydration mismatch.
 */
export function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return createPortal(children, container ?? document.body);
}
