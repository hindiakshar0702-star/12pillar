import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const options = [
  { value: 'in', label: 'India', description: 'Asia' },
  { value: 'us', label: 'United States', description: 'North America' },
  { value: 'jp', label: 'Japan', description: 'Asia' },
  { value: 'br', label: 'Brazil', description: 'South America' },
  { value: 'de', label: 'Germany', description: 'Europe' },
];

const meta: Meta<typeof Select> = { title: 'Forms/Select', component: Select };
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => <div className="w-72"><Select label="Country" options={options} /></div>,
};

export const Combobox: Story = {
  render: () => <div className="w-72"><Select label="Country" searchable options={options} /></div>,
};

export const WithError: Story = {
  render: () => <div className="w-72"><Select label="Country" options={options} error="Pick one" /></div>,
};
