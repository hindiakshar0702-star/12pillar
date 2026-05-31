import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toaster } from './Toaster';
import { toast, useToastStore } from './Toast.store';

describe('Toast', () => {
  beforeEach(() => {
    useToastStore.getState().clear();
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it('renders nothing initially', () => {
    render(<Toaster />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows a status toast on toast.success', () => {
    render(<Toaster />);
    act(() => {
      toast.success('Saved');
    });
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
  });

  it('shows alert role for error toasts', () => {
    render(<Toaster />);
    act(() => {
      toast.error('Failed');
    });
    expect(screen.getByRole('alert')).toHaveTextContent('Failed');
  });

  it('auto-dismisses after duration', () => {
    render(<Toaster />);
    act(() => {
      toast({ title: 'Hi', duration: 1000 });
    });
    expect(screen.getByRole('status')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('persists when duration is Infinity and is dismissable', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Toaster />);
    act(() => {
      toast({ title: 'Sticky', duration: Infinity });
    });
    expect(screen.getByRole('status')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(screen.getByRole('status')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    // Wait for exit animation tick:
    act(() => vi.advanceTimersByTime(500));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
