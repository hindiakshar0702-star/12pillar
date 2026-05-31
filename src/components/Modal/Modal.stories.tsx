import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = { title: 'Overlay/Modal', component: Modal };
export default meta;
type Story = StoryObj<typeof Modal>;

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete project"
        description="This action is permanent and cannot be undone."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        <p className="text-body text-text-secondary">
          The project, its history, and all members will be removed.
        </p>
      </Modal>
    </>
  );
}

export const Default: Story = { render: () => <Demo /> };
