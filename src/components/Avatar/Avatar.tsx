import { forwardRef, useState, useEffect, memo } from 'react';
import { cn } from '@/lib/cn';
import { avatarVariants, avatarStatusVariants } from './Avatar.variants';
import type { AvatarProps } from './Avatar.types';

function deriveInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '?';
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Avatar — presents a user with image, fallback initials, and optional status dot.
 */
const AvatarImpl = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, fallback, size = 'md', shape = 'circle', status, className, ...rest },
  ref
) {
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [src]);

  const showImage = Boolean(src) && !errored;

  return (
    <span
      ref={ref}
      role="img"
      aria-label={alt}
      className={cn(avatarVariants({ size, shape }), className)}
      {...rest}
    >
      {showImage ? (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          draggable={false}
          onError={() => setErrored(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true" className="font-medium">
          {fallback ?? deriveInitials(alt)}
        </span>
      )}

      {status ? (
        <span
          aria-hidden="true"
          data-testid="avatar-status"
          className={avatarStatusVariants({ status, size })}
        />
      ) : null}
    </span>
  );
});

export const Avatar = memo(AvatarImpl);
Avatar.displayName = 'Avatar';
