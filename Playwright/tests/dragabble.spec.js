const { test } = require('@playwright/test');
const { DragabblePage } = require('../pages/dragabblePage');

test.describe('Demo QA Dragabble', () => {
  test('should drag the simple box and verify it moved', async ({ page }) => {
    const dragabblePage = new DragabblePage(page);
    await dragabblePage.goto();
    await dragabblePage.dragSimple(100, 100);
    await dragabblePage.verifySimpleMoved();
  });
});
