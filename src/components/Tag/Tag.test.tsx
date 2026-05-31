import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders label', () => {
    render(<Tag>typescript</Tag>);
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('renders remove button when onRemove is provided', () => {
    render(<Tag onRemove={() => {}}>x</Tag>);
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
  });

  it('does not render remove button by default', () => {
    render(<Tag>x</Tag>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('fires onRemove when remove button clicked', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>x</Tag>);
    await user.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('honors custom removeLabel', () => {
    render(
      <Tag onRemove={() => {}} removeLabel="Delete tag">
        x
      </Tag>
    );
    expect(screen.getByRole('button', { name: 'Delete tag' })).toBeInTheDocument();
  });
});
