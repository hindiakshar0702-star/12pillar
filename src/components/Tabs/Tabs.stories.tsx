import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = { title: 'Navigation/Tabs', component: Tabs };
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="a" className="w-[420px]">
      <Tabs.List aria-label="Sections">
        <Tabs.Trigger value="a">Account</Tabs.Trigger>
        <Tabs.Trigger value="b">Billing</Tabs.Trigger>
        <Tabs.Trigger value="c">Team</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="a">Account settings…</Tabs.Content>
      <Tabs.Content value="b">Billing settings…</Tabs.Content>
      <Tabs.Content value="c">Team settings…</Tabs.Content>
    </Tabs>
  ),
};

export const Pill: Story = {
  render: () => (
    <Tabs defaultValue="a" variant="pill" className="w-[420px]">
      <Tabs.List aria-label="View">
        <Tabs.Trigger value="a">Day</Tabs.Trigger>
        <Tabs.Trigger value="b">Week</Tabs.Trigger>
        <Tabs.Trigger value="c">Month</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="a">Day view</Tabs.Content>
      <Tabs.Content value="b">Week view</Tabs.Content>
      <Tabs.Content value="c">Month view</Tabs.Content>
    </Tabs>
  ),
};
