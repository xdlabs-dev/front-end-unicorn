import type { Meta, StoryObj } from '@storybook/html';
import { createCard, createButton, type CardProps } from '@feu/components-html';

const meta: Meta<CardProps> = {
  title: 'HTML/Card',
  tags: ['autodocs'],
  args: { title: 'Card title', body: 'A short description that lives inside the card body.' },
  render: (args) =>
    createCard({
      ...args,
      footer: [
        createButton({ label: 'Cancel', variant: 'ghost' }),
        createButton({ label: 'Confirm', variant: 'primary' }),
      ],
    }),
};
export default meta;

type Story = StoryObj<CardProps>;

export const Default: Story = {};
export const TitleOnly: Story = { args: { body: undefined } };
