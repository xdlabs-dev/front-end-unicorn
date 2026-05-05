import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        'components-html': resolve(__dirname, 'src/index.ts'),
        elements: resolve(__dirname, 'src/elements.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    sourcemap: true,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['@feu/tokens'],
      output: { assetFileNames: 'components-html.[ext]' },
    },
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
