// Copies compiled theme CSS bundles from @feu/tokens into apps/site/public/_themes
// so they are served as static assets and can be swapped via <link href="…">.
import { mkdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensDist = resolve(__dirname, '../../../packages/tokens/dist/themes');
const dest = resolve(__dirname, '../public/_themes');

const themes = ['light', 'dark', 'brand'];

await mkdir(dest, { recursive: true });
for (const theme of themes) {
  const src = resolve(tokensDist, `${theme}.css`);
  if (!existsSync(src)) {
    throw new Error(
      `[copy-themes] Missing ${src}. Run \`pnpm --filter @feu/tokens build\` first.`,
    );
  }
  await copyFile(src, resolve(dest, `${theme}.css`));
  // eslint-disable-next-line no-console
  console.log(`[copy-themes] ${theme}.css \u2192 public/_themes/`);
}
