import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from './Toaster';
import { toast } from './Toast.store';
import { Button } from '../Button';

const meta: Meta<typeof Toaster> = { title: 'Feedback/Toast', component: Toaster };
export default meta;
type Story = StoryObj<typeof Toaster>;

export const Showcase: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast({ title: 'Default toast' })}>Default</Button>
        <Button variant="success" onClick={() => toast.success('Saved successfully')}>Success</Button>
        <Button variant="warning" onClick={() => toast.warning('Disk almost full')}>Warning</Button>
        <Button variant="danger" onClick={() => toast.error('Operation failed', { description: 'Try again later.' })}>Error</Button>
        <Button variant="secondary" onClick={() =>
          toast.info('New release available', {
            description: 'Version 2.1 just shipped.',
            action: { label: 'View', onClick: () => alert('navigated') },
          })
        }>Info + action</Button>
      </div>
      <Toaster />
    </>
  ),
};
