// pages/studentFormPage.js
const { expect } = require('@playwright/test');

class StudentFormPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.genderLabel = (gender) => page.locator(`label[for^='gender-radio']:has-text("${gender}")`);
    this.mobileInput = page.locator('#userNumber');
    this.dobInput = page.locator('#dateOfBirthInput');
    this.subjectsInput = page.locator('.subjects-auto-complete__input input');
    this.hobbiesCheckbox = (hobby) => page.locator(`label:has-text("${hobby}")`);
    this.pictureUpload = page.locator('#uploadPicture');
    this.currentAddressInput = page.locator('#currentAddress');
    this.stateDropdown = page.locator('#state');
    this.cityDropdown = page.locator('#city');
    this.submitButton = page.locator('#submit');
    this.outputTable = page.locator('.table-responsive');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/automation-practice-form', { timeout: 120000 });
    await this.page.waitForLoadState('networkidle');
    // Remove ads to prevent pointer interception
    await this.page.evaluate(() => {
      const fixedBan = document.getElementById('fixedban');
      if (fixedBan) fixedBan.remove();
      const ads = document.querySelectorAll('iframe[id*="google_ads"]');
      ads.forEach(ad => ad.remove());
    });
    await this.page.waitForTimeout(500);
  }

  async fillForm({ firstName, lastName, email, gender, mobile, dob, subjects, hobbies, picturePath, currentAddress, state, city }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.genderLabel(gender).click();
    await this.mobileInput.fill(mobile);
    await this.dobInput.click();
    await this.dobInput.fill(dob);
    for (const subject of subjects) {
      await this.subjectsInput.fill(subject);
      await this.subjectsInput.press('Enter');
    }
    for (const hobby of hobbies) {
      const checkbox = this.hobbiesCheckbox(hobby);
      await checkbox.scrollIntoViewIfNeeded();
      await checkbox.click({ force: true });
    }
    if (picturePath) {
      await this.pictureUpload.setInputFiles(picturePath);
    }
    await this.currentAddressInput.fill(currentAddress);
    // Type in state dropdown to trigger options
    await this.stateDropdown.locator('input').type(state.substring(0, 2));
    await this.page.waitForTimeout(500);
    const stateOption = this.page.locator(`div[id^="react-select-3-option"]:has-text("${state}")`);
    await stateOption.click({ force: true, timeout: 30000 });
    await this.page.waitForTimeout(1500);
    // Type in city dropdown to trigger options  
    await this.page.locator('#city input').type(city.substring(0, 2));
    await this.page.waitForTimeout(500);
    const cityOption = this.page.locator(`div[id^="react-select-4-option"]:has-text("${city}")`);
    await cityOption.click({ force: true, timeout: 30000 });
  }

  async submit() {
    await this.submitButton.click({ force: true });
    await this.page.waitForTimeout(1000);
  }

  async verifyOutput({ firstName, lastName, email, gender, mobile, dob, subjects, hobbies, picturePath, currentAddress, state, city }) {
    // Wait for modal and verify it's visible
    const modal = this.page.locator('.modal-content');
    await modal.waitFor({ state: 'visible', timeout: 10000 });
    await this.outputTable.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.outputTable).toContainText(firstName);
    await expect(this.outputTable).toContainText(lastName);
    await expect(this.outputTable).toContainText(email);
    await expect(this.outputTable).toContainText(gender);
    await expect(this.outputTable).toContainText(mobile);
    await expect(this.outputTable).toContainText(currentAddress);
    await expect(this.outputTable).toContainText(state);
    await expect(this.outputTable).toContainText(city);
    for (const subject of subjects) {
      await expect(this.outputTable).toContainText(subject);
    }
    for (const hobby of hobbies) {
      await expect(this.outputTable).toContainText(hobby);
    }
  }
}

module.exports = { StudentFormPage };
