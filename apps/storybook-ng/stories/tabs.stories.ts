import type { Meta, StoryObj } from '@storybook/angular';
import { TabsComponent, TabPanelComponent } from '@feu/components-ng';

const meta: Meta<TabsComponent> = {
  title: 'Angular/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  args: {
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'details', label: 'Details' },
      { id: 'history', label: 'History' },
    ],
    activeId: 'overview',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [TabPanelComponent] },
    template: `
      <feu-tabs [items]="items" [(activeId)]="activeId">
        <feu-tab-panel [tabId]="'overview'" [activeId]="activeId">Overview content</feu-tab-panel>
        <feu-tab-panel [tabId]="'details'" [activeId]="activeId">Details content</feu-tab-panel>
        <feu-tab-panel [tabId]="'history'" [activeId]="activeId">History log</feu-tab-panel>
      </feu-tabs>
    `,
  }),
};
export default meta;

export const Default: StoryObj<TabsComponent> = {};
