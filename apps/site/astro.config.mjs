import { defineConfig } from 'astro/config';
import angular from '@analogjs/astro-angular';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    angular({
      vite: {
        // List Angular components used in `.astro` pages here as needed.
        inlineStylesExtension: 'scss',
      },
    }),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: { api: 'modern-compiler' },
      },
    },
  },
});
