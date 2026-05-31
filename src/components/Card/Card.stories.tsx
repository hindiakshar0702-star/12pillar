import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = { title: 'Layout/Card', component: Card };
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <Card.Header>
        <Card.Title>Project settings</Card.Title>
        <Card.Description>Manage how your project behaves.</Card.Description>
      </Card.Header>
      <Card.Body>Body content goes here.</Card.Body>
      <Card.Footer>
        <Button variant="ghost">Cancel</Button>
        <Button>Save</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(['default', 'elevated', 'outlined', 'panel'] as const).map((v) => (
        <Card key={v} variant={v} className="w-72">
          <Card.Title>{v}</Card.Title>
        </Card>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card interactive role="button" tabIndex={0} className="w-80">
      <Card.Title>Click me</Card.Title>
      <Card.Description>Hover and press to see the 3D affordance.</Card.Description>
    </Card>
  ),
};
