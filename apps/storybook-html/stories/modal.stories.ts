import type { Meta, StoryObj } from '@storybook/html';
import { createModal, createButton, type ModalProps } from '@feu/components-html';

const meta: Meta<ModalProps> = {
  title: 'HTML/Modal',
  tags: ['autodocs'],
  args: { title: 'Confirm action', body: 'Are you sure you want to continue?', open: true },
  render: (args) => {
    const container = document.createElement('div');
    const trigger = createButton({ label: 'Open modal' });
    const handle = createModal(args);
    trigger.addEventListener('click', () => handle.open());
    container.appendChild(trigger);
    container.appendChild(handle.element);
    return container;
  },
};
export default meta;

type Story = StoryObj<ModalProps>;

export const Open: Story = {};
export const Closed: Story = { args: { open: false } };
