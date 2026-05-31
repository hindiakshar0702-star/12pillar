import { create } from 'zustand';
import type { ToastInput, ToastInstance, ToastVariant } from './Toast.types';

export interface ToastStore {
  toasts: ToastInstance[];
  /** Add a toast and return its id. */
  add: (input: ToastInput) => string;
  /** Remove a toast by id. */
  remove: (id: string) => void;
  /** Remove all toasts. */
  clear: () => void;
}

let counter = 0;
const genId = () => `bv-toast-${Date.now().toString(36)}-${(counter++).toString(36)}`;

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  add: (input) => {
    const id = input.id ?? genId();
    const variant: ToastVariant = input.variant ?? 'default';
    const duration = input.duration ?? 5000;
    const next: ToastInstance = {
      id,
      title: input.title,
      description: input.description,
      variant,
      duration,
      action: input.action,
      createdAt: Date.now(),
    };
    set((s) => {
      // De-duplicate by id
      const without = s.toasts.filter((t) => t.id !== id);
      return { toasts: [...without, next] };
    });
    return id;
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  clear: () => set({ toasts: [] }),
}));

/**
 * Imperative toast API — call from anywhere (event handlers, async fns, stores).
 */
export const toast = Object.assign(
  (input: ToastInput) => useToastStore.getState().add(input),
  {
    success: (title: string, opts?: Omit<ToastInput, 'title' | 'variant'>) =>
      useToastStore.getState().add({ ...opts, title, variant: 'success' }),
    error: (title: string, opts?: Omit<ToastInput, 'title' | 'variant'>) =>
      useToastStore.getState().add({ ...opts, title, variant: 'danger' }),
    warning: (title: string, opts?: Omit<ToastInput, 'title' | 'variant'>) =>
      useToastStore.getState().add({ ...opts, title, variant: 'warning' }),
    info: (title: string, opts?: Omit<ToastInput, 'title' | 'variant'>) =>
      useToastStore.getState().add({ ...opts, title, variant: 'info' }),
    dismiss: (id: string) => useToastStore.getState().remove(id),
    clear: () => useToastStore.getState().clear(),
  }
);
