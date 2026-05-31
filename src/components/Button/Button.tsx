import { forwardRef, memo } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { buttonVariants } from './Button.variants';
import type { ButtonProps } from './Button.types';

/**
 * Button — primary action element of the BannerView 3D Design System.
 *
 * Features
 * - 7 variants (primary, secondary, ghost, outline, danger, success, warning)
 * - 5 sizes   (sm, md, lg, xl, icon)
 * - Loading state with accessible live region
 * - Optional left / right icons
 * - 3D pressable feel (shadow + translate on :active)
 * - Full keyboard + screen reader support (WCAG AA)
 *
 * @example
 *   <Button variant="primary" size="lg" leftIcon={<PlusIcon />}>
 *     Create project
 *   </Button>
 */
const ButtonImpl = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    size,
    fullWidth,
    loading = false,
    leftIcon,
    rightIcon,
    loadingLabel = 'Loading',
    disabled,
    type = 'button',
    className,
    children,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...rest}
    >
      {loading ? (
        <>
          <Loader2
            aria-hidden="true"
            className="h-4 w-4 animate-spin"
            data-testid="button-spinner"
          />
          <span className="sr-only" role="status" aria-live="polite">
            {loadingLabel}
          </span>
          <span aria-hidden="true" className="opacity-0">
            {children}
          </span>
        </>
      ) : (
        <>
          {leftIcon ? (
            <span aria-hidden="true" className="inline-flex shrink-0">
              {leftIcon}
            </span>
          ) : null}
          {children ? <span className="inline-flex">{children}</span> : null}
          {rightIcon ? (
            <span aria-hidden="true" className="inline-flex shrink-0">
              {rightIcon}
            </span>
          ) : null}
        </>
      )}
    </button>
  );
});

/**
 * Memoized export — re-renders only when props change by reference.
 * Identity-stable callbacks (e.g. via useCallback) are recommended.
 */
export const Button = memo(ButtonImpl);
Button.displayName = 'Button';
