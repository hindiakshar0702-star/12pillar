import { forwardRef, useId } from 'react';
import { cn } from '@/lib/cn';
import type { TextareaProps } from './Textarea.types';

/**
 * Textarea — labeled multi-line input with hint, error, and optional
 * character counter.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    id,
    label,
    hint,
    error,
    required,
    hideLabel,
    showCount = false,
    className,
    wrapperClassName,
    maxLength,
    value,
    defaultValue,
    onChange,
    'aria-describedby': ariaDescribedBy,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const countId = `${inputId}-count`;
  const invalid = Boolean(error);

  const currentLength =
    typeof value === 'string'
      ? value.length
      : typeof defaultValue === 'string'
      ? defaultValue.length
      : 0;

  const describedBy =
    [
      error ? errorId : null,
      hint && !error ? hintId : null,
      showCount ? countId : null,
      ariaDescribedBy,
    ]
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
          {required ? <span aria-hidden="true" className="ml-1 text-danger">*</span> : null}
        </label>
      ) : null}

      <div
        className={cn(
          'rounded-md border bg-card transition-[border-color,box-shadow]',
          'focus-within:border-primary focus-within:shadow-bv-focus',
          invalid
            ? 'border-danger focus-within:border-danger focus-within:shadow-[0_0_0_3px_hsl(var(--bv-danger)/0.35)]'
            : 'border-border',
          'has-[:disabled]:opacity-50',
          wrapperClassName
        )}
      >
        <textarea
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          className={cn(
            'block w-full resize-y bg-transparent px-3 py-2 text-body text-text-primary outline-none',
            'placeholder:text-text-secondary/70',
            'min-h-[88px]',
            className
          )}
          {...rest}
        />
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
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
        {showCount ? (
          <p id={countId} className="text-caption text-text-secondary tabular-nums">
            {currentLength}
            {maxLength ? ` / ${maxLength}` : ''}
          </p>
        ) : null}
      </div>
    </div>
  );
});
Textarea.displayName = 'Textarea';
