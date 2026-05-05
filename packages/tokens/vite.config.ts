import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FeuTokens',
      formats: ['es', 'cjs'],
      fileName: (format) => `tokens.${format === 'es' ? 'js' : 'cjs'}`,
    },
    sourcemap: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: { assetFileNames: 'tokens.[ext]' },
    },
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
  },
});
