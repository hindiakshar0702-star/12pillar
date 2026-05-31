import { forwardRef, memo } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { tagVariants } from './Tag.variants';
import type { TagProps } from './Tag.types';

/**
 * Tag — like Badge, but interactive: optional remove button + click handler.
 *
 * Use Badge for display-only labels, Tag for filter chips / token-style input.
 */
const TagImpl = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    variant = 'neutral',
    size = 'md',
    onRemove,
    removeLabel = 'Remove',
    leftIcon,
    className,
    children,
    ...rest
  },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(tagVariants({ variant, size }), className)}
      {...rest}
    >
      {leftIcon ? (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {leftIcon}
        </span>
      ) : null}
      <span className="truncate">{children}</span>
      {onRemove ? (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          className={cn(
            'ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-sm',
            'text-current/80 hover:bg-white/10 hover:text-current',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
          )}
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </button>
      ) : null}
    </span>
  );
});

export const Tag = memo(TagImpl);
Tag.displayName = 'Tag';
