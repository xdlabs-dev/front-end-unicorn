import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        tokens: resolve(__dirname, 'src/index.ts'),
        'themes/light': resolve(__dirname, 'src/themes/light.ts'),
        'themes/dark': resolve(__dirname, 'src/themes/dark.ts'),
        'themes/brand': resolve(__dirname, 'src/themes/brand.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    sourcemap: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Place each theme's emitted CSS under dist/themes/<name>.css to match its JS shim.
        assetFileNames: (info) => {
          const name = info.name ?? 'asset';
          if (name === 'light.css' || name === 'dark.css' || name === 'brand.css') {
            return `themes/${name}`;
          }
          return name;
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
  },
});
