import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

function setup() {
  return render(
    <Tabs defaultValue="a">
      <Tabs.List aria-label="Sections">
        <Tabs.Trigger value="a">A</Tabs.Trigger>
        <Tabs.Trigger value="b">B</Tabs.Trigger>
        <Tabs.Trigger value="c">C</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="a">Panel A</Tabs.Content>
      <Tabs.Content value="b">Panel B</Tabs.Content>
      <Tabs.Content value="c">Panel C</Tabs.Content>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('shows the default panel and sets aria-selected on trigger', () => {
    setup();
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel A');
  });

  it('switches panel on click', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('tab', { name: 'B' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel B');
  });

  it('navigates with arrow keys', async () => {
    const user = userEvent.setup();
    setup();
    const tabA = screen.getByRole('tab', { name: 'A' });
    tabA.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveFocus();
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'C' })).toHaveFocus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'A' })).toHaveFocus();
  });
});
