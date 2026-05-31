import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../Button';

const meta: Meta<typeof Popover> = { title: 'Overlay/Popover', component: Popover };
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover trigger={<Button variant="outline">Open</Button>}>
      <div className="w-64 p-3">
        <h4 className="text-h4 mb-2">Notifications</h4>
        <p className="text-small text-text-secondary">You're all caught up.</p>
      </div>
    </Popover>
  ),
};
