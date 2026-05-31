import type { Meta, StoryObj } from '@storybook/react';
import { Plus, ArrowRight, Trash2, Check } from 'lucide-react';
import { Button } from './Button';

/**
 * Storybook stories for the Button component.
 *
 * Note: Storybook is wired via `npm run storybook`. These stories are
 * authored against `@storybook/react` v8 and are framework-agnostic.
 */
const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'bv-bg' },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'danger', 'success', 'warning'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'icon'] },
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">X-Large</Button>
      <Button size="icon" aria-label="Add">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button leftIcon={<Plus className="h-4 w-4" />}>Create</Button>
      <Button rightIcon={<ArrowRight className="h-4 w-4" />}>Next</Button>
      <Button variant="danger" leftIcon={<Trash2 className="h-4 w-4" />}>
        Delete
      </Button>
      <Button variant="success" leftIcon={<Check className="h-4 w-4" />}>
        Approve
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { loading: true, loadingLabel: 'Saving changes' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: 'padded' },
};
