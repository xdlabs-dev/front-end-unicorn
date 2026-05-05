import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from '@feu/components-ng';

const meta: Meta<InputComponent> = {
  title: 'Angular/Input',
  component: InputComponent,
  tags: ['autodocs'],
  args: { label: 'Email', placeholder: 'you@example.com', type: 'email', value: '' },
};
export default meta;

type Story = StoryObj<InputComponent>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true, value: 'locked@example.com' } };
export const Invalid: Story = { args: { invalid: true, value: 'not-an-email' } };
