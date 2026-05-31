import { forwardRef, useId } from 'react';
import { cn } from '@/lib/cn';
import { inputWrapperVariants, inputControlVariants } from './Input.variants';
import type { InputProps } from './Input.types';

/**
 * Input — labeled text input with hint, error, and icon slots.
 *
 * Wraps a native <input> so all standard attributes work
 * (`type`, `value`, `onChange`, `name`, ...).
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    hint,
    error,
    required,
    hideLabel,
    leftIcon,
    rightIcon,
    size = 'md',
    className,
    wrapperClassName,
    'aria-describedby': ariaDescribedBy,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const invalid = Boolean(error);

  const describedBy =
    [error ? errorId : null, hint && !error ? hintId : null, ariaDescribedBy]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <label
          htmlFor={inputId}
          className={cn(
            'text-small font-medium text-text-primary',
            hideLabel && 'sr-only'
          )}
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="ml-1 text-danger">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div className={cn(inputWrapperVariants({ size, invalid }), wrapperClassName)}>
        {leftIcon ? (
          <span aria-hidden="true" className="inline-flex shrink-0 text-text-secondary">
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(inputControlVariants(), className)}
          {...rest}
        />
        {rightIcon ? (
          <span aria-hidden="true" className="inline-flex shrink-0 text-text-secondary">
            {rightIcon}
          </span>
        ) : null}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-caption text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-caption text-text-secondary">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
Input.displayName = 'Input';
