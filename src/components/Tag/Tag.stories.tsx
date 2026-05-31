import type { Meta, StoryObj } from '@storybook/react';
import { Hash } from 'lucide-react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = { title: 'Display/Tag', component: Tag, args: { children: 'design-system' } };
export default meta;
type Story = StoryObj<typeof Tag>;

export const Playground: Story = {};

export const Removable: Story = {
  args: { onRemove: () => alert('removed') },
};

export const WithIcon: Story = {
  args: { leftIcon: <Hash className="h-3 w-3" />, children: 'topic' },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="neutral">neutral</Tag>
      <Tag variant="primary">primary</Tag>
      <Tag variant="success" onRemove={() => {}}>success</Tag>
      <Tag variant="warning" onRemove={() => {}}>warning</Tag>
      <Tag variant="danger" onRemove={() => {}}>danger</Tag>
    </div>
  ),
};
