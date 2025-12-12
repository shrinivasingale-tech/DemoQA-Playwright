// pages/selectMenuPage.js
const { expect } = require('@playwright/test');

class SelectMenuPage {
  constructor(page) {
    this.page = page;
    this.selectValueDropdown = page.locator('#withOptGroup');
    this.selectOneDropdown = page.locator('#selectOne');
    this.oldStyleSelectMenu = page.locator('#oldSelectMenu');
    this.standardMultiSelect = page.locator('#cars');
  }

  async goto() {
    await this.page.goto('/select-menu');
    // Remove ads to prevent pointer interception
    await this.page.evaluate(() => {
      const fixedBan = document.getElementById('fixedban');
      if (fixedBan) fixedBan.remove();
      const ads = document.querySelectorAll('iframe[id*="google_ads"]');
      ads.forEach(ad => ad.remove());
    });
    await this.page.waitForTimeout(500);
  }

  async selectValue(value) {
    await this.selectValueDropdown.locator('input').type(value.substring(0, 2));
    await this.page.waitForTimeout(500);
    const option = this.page.locator(`div[id^="react-select-2-option"]:has-text("${value}")`);
    await option.click({ force: true, timeout: 30000 });
  }

  async selectOne(value) {
    await this.selectOneDropdown.locator('input').type(value.substring(0, 2));
    await this.page.waitForTimeout(500);
    const option = this.page.locator(`div[id^="react-select-3-option"]:has-text("${value}")`);
    await option.click({ force: true, timeout: 30000 });
  }

  async selectOldStyle(value) {
    await this.oldStyleSelectMenu.selectOption({ label: value });
  }

  async selectMultiple(values) {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(500);
    for (const value of values) {
      await this.page.locator('#selectMenuContainer').locator('.css-2b097c-container').last().locator('input').type(value.substring(0, 2));
      await this.page.waitForTimeout(300);
      const option = this.page.locator(`div[id^="react-select-4-option"]:has-text("${value}")`);
      await option.click({ force: true, timeout: 30000 });
      await this.page.waitForTimeout(300);
    }
  }

  async selectStandardMultiple(values) {
    await this.standardMultiSelect.scrollIntoViewIfNeeded();
    await this.standardMultiSelect.selectOption(values);
  }

  async verifySelectValue(value) {
    const selectedText = await this.selectValueDropdown.locator('.css-1uccc91-singleValue').textContent();
    expect(selectedText).toBe(value);
  }

  async verifySelectOne(value) {
    const selectedText = await this.selectOneDropdown.locator('.css-1uccc91-singleValue').textContent();
    expect(selectedText).toBe(value);
  }

  async verifyOldStyle(value) {
    const selectedValue = await this.oldStyleSelectMenu.inputValue();
    expect(selectedValue).toBe(value);
  }

  async verifyMultiSelect(values) {
    for (const value of values) {
      await expect(this.page.locator('#selectMenuContainer').locator('.css-2b097c-container').last()).toContainText(value);
    }
  }

  async verifyStandardMultiSelect(values) {
    const selectedOptions = await this.standardMultiSelect.locator('option:checked').allTextContents();
    for (const value of values) {
      expect(selectedOptions).toContain(value);
    }
  }
}

module.exports = { SelectMenuPage };
