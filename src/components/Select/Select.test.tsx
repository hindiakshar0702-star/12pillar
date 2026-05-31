import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const options = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
  { value: 'c', label: 'Cherry' },
];

describe('Select', () => {
  it('opens the listbox on click and selects an option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select label="Fruit" options={options} onChange={onChange} />);
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.click(screen.getByRole('option', { name: 'Banana' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('navigates with arrow keys and selects on Enter', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select label="Fruit" options={options} onChange={onChange} />);
    const trigger = screen.getByRole('combobox', { name: 'Fruit' });
    trigger.focus();
    await user.keyboard('{Enter}');
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalledWith('c');
  });

  it('filters options when searchable', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" searchable options={options} />);
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
    await user.keyboard('ban');
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument();
  });

  it('marks invalid and shows error', () => {
    render(<Select label="Fruit" options={options} error="Required" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });
});
