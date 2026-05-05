import type { Meta, StoryObj } from '@storybook/html';
import { createTabs, type TabsProps } from '@feu/components-html';

const meta: Meta<TabsProps> = {
  title: 'HTML/Tabs',
  tags: ['autodocs'],
  args: {
    items: [
      { id: 'overview', label: 'Overview', content: 'Overview content goes here.' },
      { id: 'details', label: 'Details', content: 'More detailed information.' },
      { id: 'history', label: 'History', content: 'Activity log.' },
    ],
    activeId: 'overview',
  },
  render: (args) => createTabs(args).element,
};
export default meta;

export const Default: StoryObj<TabsProps> = {};
