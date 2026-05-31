import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="/u.png" alt="Jane Doe" />);
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Jane Doe' }).querySelector('img')).toBeInTheDocument();
  });

  it('falls back to initials derived from alt when image errors', () => {
    render(<Avatar src="/broken.png" alt="Jane Doe" />);
    const img = screen.getByRole('img', { name: 'Jane Doe' }).querySelector('img');
    fireEvent.error(img!);
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD');
  });

  it('uses initials when no src is provided', () => {
    render(<Avatar alt="Single" />);
    expect(screen.getByRole('img', { name: 'Single' })).toHaveTextContent('SI');
  });

  it('renders status dot when status is set', () => {
    render(<Avatar alt="x" status="online" />);
    expect(screen.getByTestId('avatar-status')).toBeInTheDocument();
  });

  it('accepts custom fallback', () => {
    render(<Avatar alt="x" fallback={<span>★</span>} />);
    expect(screen.getByRole('img', { name: 'x' })).toHaveTextContent('★');
  });
});
