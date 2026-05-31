import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders compound parts in order', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Title</Card.Title>
          <Card.Description>Subtitle</Card.Description>
        </Card.Header>
        <Card.Body>Body content</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    );

    expect(screen.getByRole('heading', { level: 3, name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies interactive data attribute when interactive=true', () => {
    render(<Card interactive data-testid="c" />);
    expect(screen.getByTestId('c')).toHaveAttribute('data-interactive', 'true');
  });

  it.each(['default', 'elevated', 'outlined', 'panel'] as const)('renders %s variant', (v) => {
    render(<Card variant={v} data-testid="c" />);
    expect(screen.getByTestId('c')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Card ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
