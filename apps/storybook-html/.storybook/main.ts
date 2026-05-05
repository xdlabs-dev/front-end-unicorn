import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|ts|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-themes'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  docs: { autodocs: 'tag' },
  // Surface this Storybook + the Angular Storybook under one composed UI.
  refs: {
    'feu-html': { title: 'HTML / JS components', url: '.', expanded: true },
    'feu-angular': {
      title: 'Angular components',
      // When both Storybooks are deployed, set this to the Angular Storybook URL.
      url: process.env.STORYBOOK_NG_URL ?? 'http://localhost:6007',
      expanded: true,
    },
  },
};

export default config;
