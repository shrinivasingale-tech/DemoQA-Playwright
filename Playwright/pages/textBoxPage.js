// pages/textBoxPage.js
const { expect } = require('@playwright/test');

class TextBoxPage {
  constructor(page) {
    this.page = page;
    this.fullNameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.locator('#submit');
    this.outputName = page.locator('#name');
    this.outputEmail = page.locator('#email');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/text-box', { timeout: 120000 });
    await this.page.waitForLoadState('networkidle');
  }

  async fillForm({ name, email, currentAddress, permanentAddress }) {
    await this.fullNameInput.fill(name);
    await this.emailInput.fill(email);
    await this.currentAddressInput.fill(currentAddress);
    await this.permanentAddressInput.fill(permanentAddress);
  }

  async submit() {
    await this.submitButton.click();
  }

  async verifyOutput({ name, email }) {
    await expect(this.outputName).toContainText(name);
    await expect(this.outputEmail).toContainText(email);
  }
}

module.exports = { TextBoxPage };
