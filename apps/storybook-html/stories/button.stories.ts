import type { Meta, StoryObj } from '@storybook/html';
import { createButton, type ButtonProps } from '@feu/components-html';

const meta: Meta<ButtonProps> = {
  title: 'HTML/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { label: 'Button', variant: 'primary', size: 'md', disabled: false },
  render: (args) => createButton(args),
};
export default meta;

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const Disabled: Story = { args: { disabled: true } };
