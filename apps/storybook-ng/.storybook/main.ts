import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|ts|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-themes'],
  framework: { name: '@storybook/angular', options: {} },
  docs: { autodocs: 'tag' },
};

export default config;
