import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = { title: 'Forms/Textarea', component: Textarea };
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = { args: { label: 'Bio', placeholder: 'Tell us about yourself…' } };
export const WithCounter: Story = {
  args: { label: 'Bio', showCount: true, maxLength: 280, defaultValue: 'Hello!' },
};
export const WithError: Story = {
  args: { label: 'Bio', error: 'Bio is too short.' },
};
