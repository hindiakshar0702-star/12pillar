import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Display/Avatar',
  component: Avatar,
  args: { alt: 'Jane Doe' },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Avatar key={s} size={s} alt="Jane Doe" />
      ))}
    </div>
  ),
};

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/150?img=12' },
};

export const Square: Story = { args: { shape: 'square' } };

export const WithStatus: Story = {
  render: () => (
    <div className="flex gap-3">
      <Avatar alt="A" status="online" />
      <Avatar alt="B" status="busy" />
      <Avatar alt="C" status="away" />
      <Avatar alt="D" status="offline" />
    </div>
  ),
};
