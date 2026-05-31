import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover';

describe('Popover', () => {
  it('opens on trigger click and closes on outside click', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Popover trigger={<button>Open</button>}>
          <p>Panel content</p>
        </Popover>
        <button>Outside</button>
      </div>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toHaveTextContent('Panel content');
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('toggles aria-expanded on trigger', async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger={<button>Open</button>}>
        <p>x</p>
      </Popover>
    );
    const trigger = screen.getByRole('button', { name: 'Open' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Popover trigger={<button>Open</button>} onOpenChange={onOpenChange}>
        <p>x</p>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
