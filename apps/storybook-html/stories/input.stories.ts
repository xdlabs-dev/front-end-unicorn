import type { Meta, StoryObj } from '@storybook/html';
import { createInput, type InputProps } from '@feu/components-html';

const meta: Meta<InputProps> = {
  title: 'HTML/Input',
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search'] },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
  args: { label: 'Email', placeholder: 'you@example.com', type: 'email' },
  render: (args) => createInput(args),
};
export default meta;

type Story = StoryObj<InputProps>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true, value: 'locked@example.com' } };
export const Invalid: Story = { args: { invalid: true, value: 'not-an-email' } };
