// tests/studentForm.spec.js
const { test } = require('@playwright/test');
const { StudentFormPage } = require('../pages/studentFormPage');

const testData = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@example.com',
  gender: 'Female',
  mobile: '9876543210',
  dob: '10 Dec 1995',
  subjects: ['Maths', 'English'],
  hobbies: ['Reading', 'Music'],
  picturePath: require('path').join(__dirname, '../assets/test-image.png'),
  currentAddress: '789 Oak St',
  state: 'NCR',
  city: 'Delhi'
};

test.describe('Demo QA Student Form', () => {
  test('should fill and submit student form and verify output', async ({ page }) => {
    const studentFormPage = new StudentFormPage(page);
    await studentFormPage.goto();
    await studentFormPage.fillForm(testData);
    await studentFormPage.submit();
    await studentFormPage.verifyOutput(testData);
  });
});
