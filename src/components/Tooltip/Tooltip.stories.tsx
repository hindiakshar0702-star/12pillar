import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = { title: 'Overlay/Tooltip', component: Tooltip };
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip content="Sends a message to the team">
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-12 p-12">
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <Tooltip key={p} content={`Placement: ${p}`} placement={p} openDelay={0}>
          <Button variant="outline">{p}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
