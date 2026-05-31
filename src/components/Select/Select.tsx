import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Portal } from '@/lib/Portal';
import { cn } from '@/lib/cn';
import { inputWrapperVariants } from '../Input/Input.variants';
import type { SelectOption, SelectProps } from './Select.types';

/**
 * Select — accessible single-select dropdown.
 *
 * Set `searchable` to enable combobox-style text filtering.
 *
 * - Trigger: `role="combobox"` + `aria-expanded` + `aria-haspopup="listbox"`
 * - Listbox: `role="listbox"` + `aria-activedescendant`
 * - Options: `role="option"` + `aria-selected`
 */
export function Select<T extends string = string>({
  options,
  value: controlledValue,
  defaultValue = null,
  onChange,
  label,
  hint,
  error,
  placeholder = 'Select…',
  required,
  disabled,
  hideLabel,
  searchable = false,
  className,
  'aria-label': ariaLabel,
  name,
  id,
  size = 'md',
}: SelectProps<T>) {
  const [uncontrolled, setUncontrolled] = useState<T | null>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = (isControlled ? controlledValue : uncontrolled) ?? null;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const generated = useId();
  const baseId = id ?? generated;
  const listId = `${baseId}-listbox`;
  const labelId = `${baseId}-label`;
  const hintId = `${baseId}-hint`;
  const errorId = `${baseId}-error`;

  const filtered = useMemo<SelectOption<T>[]>(() => {
    if (!searchable || !query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, searchable, query]);

  const selected = options.find((o) => o.value === value) ?? null;

  const select = useCallback(
    (next: SelectOption<T>) => {
      if (next.disabled) return;
      if (!isControlled) setUncontrolled(next.value);
      onChange?.(next.value);
      setOpen(false);
      setQuery('');
      triggerRef.current?.focus();
    },
    [isControlled, onChange]
  );

  const openMenu = useCallback(() => {
    if (disabled) return;
    setOpen(true);
    const idx = Math.max(
      0,
      filtered.findIndex((o) => o.value === value)
    );
    setHighlight(idx === -1 ? 0 : idx);
  }, [disabled, filtered, value]);

  // Reset highlight when filter list changes
  useEffect(() => {
    if (open) setHighlight(0);
  }, [query, open]);

  // Outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || listRef.current?.contains(t)) return;
      setOpen(false);
      setQuery('');
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Position listbox under the trigger
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setCoords({ top: r.bottom + 4, left: r.left, width: r.width });
  }, [open]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlight((i) => Math.min(filtered.length - 1, i + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlight((i) => Math.max(0, i - 1));
        break;
      case 'Home':
        e.preventDefault();
        setHighlight(0);
        break;
      case 'End':
        e.preventDefault();
        setHighlight(filtered.length - 1);
        break;
      case 'Enter': {
        e.preventDefault();
        const opt = filtered[highlight];
        if (opt) select(opt);
        break;
      }
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        setQuery('');
        break;
      case 'Tab':
        setOpen(false);
        setQuery('');
        break;
    }
  };

  const invalid = Boolean(error);
  const describedBy =
    [error ? errorId : null, hint && !error ? hintId : null].filter(Boolean).join(' ') || undefined;

  const activeId = filtered[highlight] ? `${baseId}-option-${filtered[highlight].value}` : undefined;

  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)}>
      {label ? (
        <label
          id={labelId}
          htmlFor={baseId}
          className={cn(
            'text-small font-medium text-text-primary',
            hideLabel && 'sr-only'
          )}
        >
          {label}
          {required ? <span aria-hidden="true" className="ml-1 text-danger">*</span> : null}
        </label>
      ) : null}

      {/* Hidden native input for form participation */}
      {name ? <input type="hidden" name={name} value={value ?? ''} /> : null}

      <div
        ref={triggerRef}
        id={baseId}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={label ? labelId : undefined}
        aria-label={!label ? ariaLabel : undefined}
        aria-disabled={disabled || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-activedescendant={open ? activeId : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={cn(
          inputWrapperVariants({ size, invalid }),
          'cursor-pointer pr-2',
          disabled && 'opacity-50 pointer-events-none'
        )}
      >
        {searchable && open ? (
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={selected?.label ?? placeholder}
            className="flex-1 bg-transparent outline-none placeholder:text-text-secondary/70"
            // Re-emit key events to the combobox so navigation works
            onKeyDown={(e) => onKeyDown(e as unknown as KeyboardEvent<HTMLDivElement>)}
            aria-autocomplete="list"
            aria-controls={listId}
          />
        ) : (
          <span
            className={cn(
              'flex-1 truncate text-left',
              !selected && 'text-text-secondary/70'
            )}
          >
            {selected?.label ?? placeholder}
          </span>
        )}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'h-4 w-4 shrink-0 text-text-secondary transition-transform',
            open && 'rotate-180'
          )}
        />
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

      <Portal>
        <AnimatePresence>
          {open ? (
            <motion.ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-labelledby={label ? labelId : undefined}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              style={{
                position: 'fixed',
                top: coords.top,
                left: coords.left,
                width: coords.width,
              }}
              className={cn(
                'z-50 max-h-64 overflow-y-auto rounded-md border border-border bg-panel p-1 shadow-bv-3'
              )}
            >
              {filtered.length === 0 ? (
                <li className="px-3 py-2 text-small text-text-secondary">No matches</li>
              ) : null}
              {filtered.map((opt, i) => {
                const isSelected = opt.value === value;
                const isActive = i === highlight;
                return (
                  <li
                    key={opt.value}
                    id={`${baseId}-option-${opt.value}`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled || undefined}
                    onMouseEnter={() => setHighlight(i)}
                    onMouseDown={(e) => {
                      e.preventDefault(); // keep trigger focused
                      select(opt);
                    }}
                    className={cn(
                      'flex cursor-pointer items-start gap-2 rounded-sm px-2.5 py-1.5',
                      'text-small text-text-primary',
                      isActive && 'bg-card',
                      opt.disabled && 'opacity-40 cursor-not-allowed'
                    )}
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                      {isSelected ? <Check className="h-4 w-4 text-primary" aria-hidden="true" /> : null}
                    </span>
                    <span className="flex flex-col">
                      <span>{opt.label}</span>
                      {opt.description ? (
                        <span className="text-caption text-text-secondary">{opt.description}</span>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </Portal>
    </div>
  );
}
