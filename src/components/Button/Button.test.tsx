import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  describe('rendering', () => {
    it('renders children as label', () => {
      render(<Button>Save changes</Button>);
      expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
    });

    it('defaults to type="button" to avoid accidental form submits', () => {
      render(<Button>Save</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('forwards ref to the underlying button element', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Button ref={ref}>Hello</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('merges custom className with variant classes (tailwind-merge wins on conflict)', () => {
      render(
        <Button className="bg-red-500" data-testid="b">
          x
        </Button>
      );
      const btn = screen.getByTestId('b');
      // tailwind-merge resolves bg conflict in favor of the consumer-supplied class
      expect(btn.className).toContain('bg-red-500');
    });
  });

  describe('variants & sizes', () => {
    it.each([
      ['primary'],
      ['secondary'],
      ['ghost'],
      ['outline'],
      ['danger'],
      ['success'],
      ['warning'],
    ] as const)('renders the %s variant without crashing', (variant) => {
      render(<Button variant={variant}>v</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it.each([['sm'], ['md'], ['lg'], ['xl'], ['icon']] as const)(
      'renders the %s size without crashing',
      (size) => {
        render(<Button size={size}>s</Button>);
        expect(screen.getByRole('button')).toBeInTheDocument();
      }
    );

    it('applies w-full when fullWidth is true', () => {
      render(<Button fullWidth>full</Button>);
      expect(screen.getByRole('button').className).toContain('w-full');
    });
  });

  describe('interaction', () => {
    it('fires onClick when clicked', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Go</Button>);
      await user.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is activatable via Enter and Space (native button semantics)', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Go</Button>);
      const btn = screen.getByRole('button');
      btn.focus();
      await user.keyboard('{Enter}');
      await user.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('does not fire onClick when disabled', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button disabled onClick={onClick}>
          Go
        </Button>
      );
      await user.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    it('renders a spinner and announces a live status', () => {
      render(<Button loading loadingLabel="Saving">Save</Button>);
      expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveTextContent('Saving');
    });

    it('sets aria-busy and disables the button while loading', () => {
      render(<Button loading>Save</Button>);
      const btn = screen.getByRole('button');
      expect(btn).toHaveAttribute('aria-busy', 'true');
      expect(btn).toBeDisabled();
    });

    it('blocks clicks while loading', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button loading onClick={onClick}>
          Save
        </Button>
      );
      await user.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('icons', () => {
    it('renders left and right icons (decorative, hidden from a11y tree)', () => {
      render(
        <Button
          leftIcon={<span data-testid="li">L</span>}
          rightIcon={<span data-testid="ri">R</span>}
        >
          Label
        </Button>
      );
      const left = screen.getByTestId('li').parentElement;
      const right = screen.getByTestId('ri').parentElement;
      expect(left).toHaveAttribute('aria-hidden', 'true');
      expect(right).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('accessibility', () => {
    it('supports aria-label for icon-only buttons', () => {
      render(<Button size="icon" aria-label="Close dialog" />);
      expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Button aria-describedby="hint">Delete</Button>
          <p id="hint">This action is irreversible.</p>
        </>
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', 'hint');
    });
  });
});
