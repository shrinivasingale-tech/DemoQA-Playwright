# Playwright JavaScript POM Framework for Demo QA

This project is a Playwright test automation framework using JavaScript and the Page Object Model (POM) pattern for the Demo QA website.

## Structure
- `pages/` - Page Object classes for each Demo QA page
- `tests/` - Test specs using Playwright and POM
- `utils/` - Utility functions (optional)
- `playwright.config.js` - Playwright configuration
- `package.json` - Project dependencies and scripts

## Getting Started
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Run all tests:
   ```powershell
   npm test
   ```
3. Run a specific test:
   ```powershell
   npx playwright test tests/example.spec.js
   ```

## Resources
- [Playwright Docs](https://playwright.dev/)
- [Demo QA Website](https://demoqa.com/)

## Notes
- Extend the framework by adding more page objects and tests as needed.
