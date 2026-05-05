import type { Preview } from '@storybook/angular';

import '@feu/tokens/themes/light.css';
import '@feu/tokens/themes/dark.css';
import '@feu/tokens/themes/brand.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
  globalTypes: {
    feuTheme: {
      name: 'Theme',
      description: 'Active design token bundle',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'brand', title: 'Brand' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, ctx) => {
      const theme = (ctx.globals.feuTheme as string) ?? 'light';
      // Reflect the theme onto <html> so [data-feu-theme="dark"] selectors win.
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-feu-theme', theme);
        document.body.classList.add('feu-root');
      }
      return story();
    },
  ],
};

export default preview;
