import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', {outputFolder: 'test-report', open: 'never'}]
  ],
  use: {
    headless: true,
    actionTimeout: 0,
    screenshot: "only-on-failure",
    trace: 'off',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    //{
    //  name: 'firefox',
    //  use: {
    //    ...devices['Desktop Firefox'],
    //  },
    //},

    //{
    //  name: 'webkit',
    //  use: {
    //    ...devices['Desktop Safari'],
    //  },
    //},

  ],

};

export default config;
