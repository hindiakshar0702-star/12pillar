import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { Portal } from '@/lib/Portal';
import { cn } from '@/lib/cn';
import { useToastStore } from './Toast.store';
import type { ToastInstance, ToasterProps, ToastVariant } from './Toast.types';

const positionClasses: Record<NonNullable<ToasterProps['position']>, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-left': 'top-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

const variantStyles: Record<ToastVariant, { container: string; icon: React.ReactNode }> = {
  default: { container: 'border-border', icon: null },
  success: {
    container: 'border-success/40',
    icon: <CheckCircle2 className="h-5 w-5 text-success" aria-hidden="true" />,
  },
  danger: {
    container: 'border-danger/40',
    icon: <AlertCircle className="h-5 w-5 text-danger" aria-hidden="true" />,
  },
  warning: {
    container: 'border-warning/40',
    icon: <AlertTriangle className="h-5 w-5 text-warning" aria-hidden="true" />,
  },
  info: {
    container: 'border-primary/40',
    icon: <Info className="h-5 w-5 text-primary" aria-hidden="true" />,
  },
};

function ToastItem({ t, onDismiss }: { t: ToastInstance; onDismiss: (id: string) => void }) {
  useEffect(() => {
    if (t.duration === Infinity || t.duration === 0) return;
    const handle = window.setTimeout(() => onDismiss(t.id), t.duration);
    return () => window.clearTimeout(handle);
  }, [t.id, t.duration, onDismiss]);

  const styles = variantStyles[t.variant];

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      role={t.variant === 'danger' || t.variant === 'warning' ? 'alert' : 'status'}
      aria-live={t.variant === 'danger' || t.variant === 'warning' ? 'assertive' : 'polite'}
      className={cn(
        'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-md border bg-panel p-3 shadow-bv-3',
        styles.container
      )}
    >
      {styles.icon ? <span className="mt-0.5">{styles.icon}</span> : null}
      <div className="flex-1 min-w-0">
        <p className="text-small font-medium text-text-primary">{t.title}</p>
        {t.description ? (
          <p className="mt-0.5 text-caption text-text-secondary">{t.description}</p>
        ) : null}
        {t.action ? (
          <button
            type="button"
            onClick={() => {
              t.action?.onClick();
              onDismiss(t.id);
            }}
            className="mt-2 text-small font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            {t.action.label}
          </button>
        ) : null}
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(t.id)}
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm text-text-secondary hover:bg-card hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </motion.li>
  );
}

/**
 * Toaster — render once at the root of the app to display toasts.
 *
 *   <App>
 *     ...
 *     <Toaster position="top-right" />
 *   </App>
 */
export function Toaster({ position = 'top-right', max = 5, className }: ToasterProps) {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  // Keep only the most recent N (mirrors common UX expectations)
  const visible = toasts.slice(-max);

  return (
    <Portal>
      <ol
        aria-label="Notifications"
        className={cn(
          'pointer-events-none fixed z-[70] flex flex-col gap-2 outline-none',
          positionClasses[position],
          className
        )}
      >
        <AnimatePresence initial={false}>
          {visible.map((t) => (
            <ToastItem key={t.id} t={t} onDismiss={remove} />
          ))}
        </AnimatePresence>
      </ol>
    </Portal>
  );
}
