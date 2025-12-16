
// playwright.config.js
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 90000, // 90 seconds per test
  retries: 2, // Retry failing tests up to 2 times
  use: {
    actionTimeout: 30000, // 30 seconds per action
    navigationTimeout: 60000, // 60 seconds for navigation
  workers: 8, // Run tests in parallel using 8 workers
    headless: false, // Force headed mode for all browsers
    baseURL: 'https://demoqa.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    // Cross-browser, default environment
    { name: 'Chromium', use: { browserName: 'chromium', baseURL: 'https://demoqa.com' } },
    { name: 'Firefox', use: { browserName: 'firefox', baseURL: 'https://demoqa.com' } },
    { name: 'WebKit', use: { browserName: 'webkit', baseURL: 'https://demoqa.com' } },

    // Multi-environment: Staging (example)
    { name: 'Staging-Chromium', use: { browserName: 'chromium', baseURL: 'https://staging.demoqa.com' } },
    { name: 'Staging-Firefox', use: { browserName: 'firefox', baseURL: 'https://staging.demoqa.com' } },
    { name: 'Staging-WebKit', use: { browserName: 'webkit', baseURL: 'https://staging.demoqa.com' } },
  ]
};

module.exports = config;
