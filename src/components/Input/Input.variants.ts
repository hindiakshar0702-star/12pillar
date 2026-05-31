import { cva } from 'class-variance-authority';

/** Wrapper around the native <input>. Provides the visual chrome. */
export const inputWrapperVariants = cva(
  [
    'flex w-full items-center gap-2 border bg-card text-text-primary',
    'transition-[border-color,box-shadow,background-color] duration-150',
    'focus-within:border-primary focus-within:shadow-bv-focus',
    'has-[:disabled]:opacity-50 has-[:disabled]:pointer-events-none',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-2.5 text-small rounded-sm gap-1.5',
        md: 'h-10 px-3 text-body rounded-md gap-2',
        lg: 'h-12 px-4 text-body rounded-md gap-2.5',
      },
      invalid: {
        true: 'border-danger focus-within:border-danger focus-within:shadow-[0_0_0_3px_hsl(var(--bv-danger)/0.35)]',
        false: 'border-border',
      },
    },
    defaultVariants: { size: 'md', invalid: false },
  }
);

export const inputControlVariants = cva([
  'flex-1 bg-transparent border-0 outline-none',
  'placeholder:text-text-secondary/70',
  'disabled:cursor-not-allowed',
]);
