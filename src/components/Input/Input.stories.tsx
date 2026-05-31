import type { Meta, StoryObj } from '@storybook/react';
import { Mail, Search, Lock } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = { title: 'Forms/Input', component: Input };
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { label: 'Email', placeholder: 'you@company.com' } };

export const WithHint: Story = {
  args: { label: 'Username', hint: '3–20 characters, letters and numbers only.' },
};

export const WithError: Story = {
  args: { label: 'Email', defaultValue: 'not-an-email', error: 'Enter a valid email address.' },
};

export const WithIcons: Story = {
  args: {
    label: 'Email',
    leftIcon: <Mail className="h-4 w-4" />,
    rightIcon: <Search className="h-4 w-4" />,
  },
};

export const Required: Story = {
  args: { label: 'Password', type: 'password', required: true, leftIcon: <Lock className="h-4 w-4" /> },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-80">
      <Input size="sm" label="Small" />
      <Input size="md" label="Medium" />
      <Input size="lg" label="Large" />
    </div>
  ),
};
