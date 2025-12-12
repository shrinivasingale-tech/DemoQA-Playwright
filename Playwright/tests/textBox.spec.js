// tests/textBox.spec.js
const { test } = require('@playwright/test');
const { TextBoxPage } = require('../pages/textBoxPage');

test.describe('Demo QA Text Box', () => {
  test('should submit text box form and verify output', async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);
    await textBoxPage.goto();
    await textBoxPage.fillForm({
      name: 'John Doe',
      email: 'john.doe@example.com',
      currentAddress: '123 Main St',
      permanentAddress: '456 Elm St'
    });
    await textBoxPage.submit();
    await textBoxPage.verifyOutput({
      name: 'John Doe',
      email: 'john.doe@example.com'
    });
  });
});
