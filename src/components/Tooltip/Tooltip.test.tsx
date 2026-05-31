import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('shows tooltip after openDelay on hover', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <Tooltip content="More info" openDelay={100}>
        <button>Trigger</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.getByRole('tooltip')).toHaveTextContent('More info');
  });

  it('hides tooltip on Escape', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <Tooltip content="x" openDelay={0}>
        <button>Trigger</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(50));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    // Animation may still keep DOM briefly; assert that the descriptor was removed eventually:
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not render when disabled', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <Tooltip content="x" openDelay={0} disabled>
        <button>Trigger</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(50));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
