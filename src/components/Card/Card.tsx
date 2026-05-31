import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { cardVariants } from './Card.variants';
import type { CardProps } from './Card.types';

/**
 * Card — surface container with header / body / footer slots.
 *
 * Composed via dot notation:
 *   <Card>
 *     <Card.Header>
 *       <Card.Title>Title</Card.Title>
 *       <Card.Description>Subtitle</Card.Description>
 *     </Card.Header>
 *     <Card.Body>...</Card.Body>
 *     <Card.Footer>...</Card.Footer>
 *   </Card>
 */
const CardRoot = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', padding = 'md', interactive = false, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-interactive={interactive || undefined}
      className={cn(cardVariants({ variant, padding, interactive }), className)}
      {...rest}
    />
  );
});

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-1 border-b border-border pb-4 mb-4', className)}
        {...rest}
      />
    );
  }
);

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, children, ...rest }, ref) {
    return (
      <h3 ref={ref} className={cn('text-h4 text-text-primary', className)} {...rest}>
        {children}
      </h3>
    );
  }
);

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className, ...rest }, ref) {
    return (
      <p
        ref={ref}
        className={cn('text-small text-text-secondary', className)}
        {...rest}
      />
    );
  }
);

const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardBody({ className, ...rest }, ref) {
    return <div ref={ref} className={cn('text-body text-text-primary', className)} {...rest} />;
  }
);

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'mt-4 flex items-center justify-end gap-2 border-t border-border pt-4',
          className
        )}
        {...rest}
      />
    );
  }
);

type CardComponent = typeof CardRoot & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
};

export const Card = CardRoot as CardComponent;
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Body = CardBody;
Card.Footer = CardFooter;
