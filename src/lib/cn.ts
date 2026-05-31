import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * `cn` — merge Tailwind class names safely.
 *
 * Combines `clsx` (conditional class handling) with `tailwind-merge`
 * (conflict resolution: later utility wins). This is the canonical way
 * to compose class names across the BannerView 3D Design System.
 *
 * @example
 *   cn('px-4 py-2', isActive && 'bg-primary', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
