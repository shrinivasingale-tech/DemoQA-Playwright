// tests/selectMenu.spec.js
const { test } = require('@playwright/test');
const { SelectMenuPage } = require('../pages/selectMenuPage');

test.describe('Demo QA Select Menu', () => {
  test('should select options from various dropdowns and verify selections', async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);
    await selectMenuPage.goto();
    
    // Select Value dropdown
    await selectMenuPage.selectValue('Group 1, option 1');
    await selectMenuPage.verifySelectValue('Group 1, option 1');
    
    // Select One dropdown
    await selectMenuPage.selectOne('Dr.');
    await selectMenuPage.verifySelectOne('Dr.');
    
    // Old Style Select Menu
    await selectMenuPage.selectOldStyle('Red');
    await selectMenuPage.verifyOldStyle('red');
    
    // Multiselect dropdown
    await selectMenuPage.selectMultiple(['Green', 'Blue']);
    await selectMenuPage.verifyMultiSelect(['Green', 'Blue']);
    
    // Standard multi select
    await selectMenuPage.selectStandardMultiple(['Volvo', 'Audi']);
    await selectMenuPage.verifyStandardMultiSelect(['Volvo', 'Audi']);
  });
});
