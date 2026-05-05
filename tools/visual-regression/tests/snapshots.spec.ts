import { test, expect } from '@playwright/test';

// Snapshot every (story × theme) combination. New stories are picked up
// automatically by reading Storybook's index.json from the running instance.
const THEMES = ['light', 'dark', 'brand'] as const;

const HTML_STORYBOOK_URL = process.env.STORYBOOK_HTML_URL ?? 'http://localhost:6006';
const NG_STORYBOOK_URL = process.env.STORYBOOK_NG_URL ?? 'http://localhost:6007';

interface StoryEntry {
  id: string;
  title: string;
  name: string;
  type: 'story' | 'docs';
}

interface StoriesIndex {
  entries: Record<string, StoryEntry>;
}

async function fetchStories(baseUrl: string): Promise<StoryEntry[]> {
  const res = await fetch(`${baseUrl}/index.json`);
  if (!res.ok) throw new Error(`Failed to fetch ${baseUrl}/index.json: ${res.status}`);
  const json = (await res.json()) as StoriesIndex;
  return Object.values(json.entries).filter((e) => e.type === 'story');
}

for (const [label, baseUrl] of [
  ['html', HTML_STORYBOOK_URL],
  ['angular', NG_STORYBOOK_URL],
] as const) {
  test.describe(`${label} storybook`, () => {
    let stories: StoryEntry[] = [];
    test.beforeAll(async () => {
      stories = await fetchStories(baseUrl);
    });

    for (const theme of THEMES) {
      test(`screenshots — theme=${theme}`, async ({ page }) => {
        for (const story of stories) {
          const url = `${baseUrl}/iframe.html?id=${story.id}&globals=feuTheme:${theme}&viewMode=story`;
          await page.goto(url);
          await page.waitForLoadState('networkidle');
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const root = page.locator('#storybook-root, #root, body');
          await expect(root.first()).toHaveScreenshot(`${label}-${story.id}-${theme}.png`);
        }
      });
    }
  });
}
