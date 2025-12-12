// playwright.config.js
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 300000,
  retries: 0,
  use: {
    headless: false,
    baseURL: 'https://demoqa.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
};

module.exports = config;
