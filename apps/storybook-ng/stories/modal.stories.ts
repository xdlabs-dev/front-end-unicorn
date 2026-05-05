import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from '@feu/components-ng';

const meta: Meta<ModalComponent> = {
  title: 'Angular/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  args: { title: 'Confirm action', open: true },
  render: (args) => ({
    props: args,
    template: `
      <feu-modal [title]="title" [open]="open">
        Are you sure you want to continue?
      </feu-modal>
    `,
  }),
};
export default meta;

type Story = StoryObj<ModalComponent>;

export const Open: Story = {};
export const Closed: Story = { args: { open: false } };
