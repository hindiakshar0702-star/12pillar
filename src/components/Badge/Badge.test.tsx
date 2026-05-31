import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it.each(['neutral', 'primary', 'success', 'warning', 'danger', 'outline', 'solid'] as const)(
    'renders the %s variant',
    (variant) => {
      render(<Badge variant={variant}>x</Badge>);
      expect(screen.getByText('x')).toBeInTheDocument();
    }
  );

  it('renders a leading dot when dot=true', () => {
    const { container } = render(<Badge dot>3</Badge>);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
