import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from '@feu/components-ng';

const meta: Meta<CardComponent> = {
  title: 'Angular/Card',
  component: CardComponent,
  tags: ['autodocs'],
  args: { title: 'Card title' },
  render: (args) => ({
    props: args,
    template: `
      <feu-card [title]="title">
        A short description that lives inside the card body.
      </feu-card>
    `,
  }),
};
export default meta;

export const Default: StoryObj<CardComponent> = {};
