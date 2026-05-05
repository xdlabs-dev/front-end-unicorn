import type { Preview } from '@storybook/html';

// Each theme is its own compiled CSS bundle. Importing them all lets us
// activate one at a time via a [data-feu-theme] attribute toggled by the toolbar.
// In production each app would lazy-load only the active theme bundle.
import '@feu/tokens/themes/light.css';
import '@feu/tokens/themes/dark.css';
import '@feu/tokens/themes/brand.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    backgrounds: { disable: true },
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
      const theme = (ctx.globals.feuTheme as string | undefined) ?? 'light';
      // Storybook decorators in HTML mode return either a string or a Node.
      const wrapper = document.createElement('div');
      wrapper.className = 'feu-root';
      wrapper.setAttribute('data-feu-theme', theme);
      wrapper.style.padding = '24px';
      wrapper.style.minHeight = '100vh';
      wrapper.style.background = 'var(--feu-color-surface)';
      wrapper.style.color = 'var(--feu-color-text)';
      const result = story(ctx);
      if (typeof result === 'string') {
        wrapper.innerHTML = result;
      } else if (result instanceof Node) {
        wrapper.appendChild(result);
      }
      return wrapper;
    },
  ],
};

export default preview;
