import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('renders a labeled input', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('forwards typed values via onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input label="Name" onChange={onChange} />);
    await user.type(screen.getByLabelText('Name'), 'abc');
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('shows hint text when provided and links via aria-describedby', () => {
    render(<Input label="Email" hint="We never share it." />);
    const input = screen.getByLabelText('Email');
    expect(screen.getByText('We never share it.')).toBeInTheDocument();
    expect(input.getAttribute('aria-describedby')).toContain('-hint');
  });

  it('shows error in place of hint and sets aria-invalid', () => {
    render(<Input label="Email" hint="hint" error="Required field" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Required field');
    expect(screen.queryByText('hint')).not.toBeInTheDocument();
  });

  it('hides label visually with hideLabel but keeps it for AT', () => {
    render(<Input label="Search" hideLabel />);
    const label = screen.getByText('Search');
    expect(label.className).toContain('sr-only');
  });

  it('renders required marker when required', () => {
    const { container } = render(<Input label="Name" required />);
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent('*');
  });
});
