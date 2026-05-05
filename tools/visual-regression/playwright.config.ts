import { defineConfig, devices } from '@playwright/test';

// Drives the built Storybook(s) and snapshots one screenshot per (story × theme).
// Storybooks are expected to be served at the URLs below before the test run —
// see scripts/run-vr.sh or the CI workflow for the orchestration.
export default defineConfig({
  testDir: './tests',
  snapshotDir: './__snapshots__',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: process.env.STORYBOOK_HTML_URL ?? 'http://localhost:6006',
    viewport: { width: 1024, height: 768 },
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  expect: {
    toHaveScreenshot: {
      // Allow tiny font-rendering deltas across machines.
      maxDiffPixelRatio: 0.01,
    },
  },
});
