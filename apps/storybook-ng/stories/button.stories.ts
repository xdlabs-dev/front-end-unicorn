import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@feu/components-ng';

const meta: Meta<ButtonComponent> = {
  title: 'Angular/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Button', variant: 'primary', size: 'md', disabled: false },
};
export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const Disabled: Story = { args: { disabled: true } };
