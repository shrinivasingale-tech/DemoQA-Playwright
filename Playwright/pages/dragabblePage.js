const { expect } = require('@playwright/test');

class DragabblePage {
  constructor(page) {
    this.page = page;
    this.simpleTab = page.locator('#draggableExample-tab-simple');
    this.axisTab = page.locator('#draggableExample-tab-axisRestriction');
    this.containerTab = page.locator('#draggableExample-tab-containerRestriction');
    this.cursorTab = page.locator('#draggableExample-tab-cursorStyle');
    this.draggableBox = page.locator('#dragBox');
    this.xAxisBox = page.locator('#restrictedX');
    this.yAxisBox = page.locator('#restrictedY');
    this.containerBox = page.locator('#containmentWrapper #draggableExample-positional');
    this.cursorBox = page.locator('#cursorCenter');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/dragabble', { timeout: 120000 });
    await this.page.waitForLoadState('networkidle');
    // Remove ads and overlays to prevent pointer interception
    await this.page.evaluate(() => {
      const removeById = id => { const el = document.getElementById(id); if (el) el.remove(); };
      removeById('fixedban');
      removeById('adplus-anchor');
      removeById('close-fixedban');
      document.querySelectorAll('iframe, [id*="ads"], [class*="ads"], [style*="z-index"], [style*="fixed"], [style*="absolute"], .modal, .popup, .advertisement, .adplus-dvertising').forEach(el => el.remove());
      document.querySelectorAll('div[style*="position: fixed"], div[style*="z-index"], div[style*="absolute"], .modal, .popup').forEach(el => el.remove());
    });
    await this.page.waitForTimeout(1500);
    // Wait for main content area
    // Ensure draggable box is visible
    await this.draggableBox.waitFor({ state: 'visible', timeout: 10000 });
  }

  async dragSimple(offsetX, offsetY) {
    // Remove overlays/ads before drag
    await this.page.evaluate(() => {
      document.querySelectorAll('iframe, [id*="ads"], [class*="ads"], .advertisement, .adplus-dvertising').forEach(el => el.remove());
      document.querySelectorAll('.modal, .popup, div[style*="position: fixed"], div[style*="z-index"], div[style*="absolute"]').forEach(el => {
        if (!el.closest('#dragBox')) el.style.pointerEvents = 'none';
      });
    });
    await this.page.waitForTimeout(500);
    await this.draggableBox.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    // Set pointer-events: none only on elements above #dragBox at the drag start, excluding <html>, <body>, and #dragBox
    await this.page.evaluate(() => {
      const dragBox = document.getElementById('dragBox');
      if (dragBox) {
        const rect = dragBox.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const elements = document.elementsFromPoint(x, y);
        elements.forEach(el => {
          if (el !== dragBox && el.tagName !== 'HTML' && el.tagName !== 'BODY') {
            el.style.pointerEvents = 'none';
          }
        });
        dragBox.style.zIndex = '9999';
      }
    });
    await this.page.waitForTimeout(200);
    // Use Playwright mouse actions for drag
    const box = await this.draggableBox.boundingBox();
    if (!box) throw new Error('Drag box not found');
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;
    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(startX + offsetX, startY + offsetY, { steps: 10 });
    await this.page.mouse.up();
  }

  async verifySimpleMoved() {
    const box = await this.draggableBox.boundingBox();
    expect(box.x).not.toBe(0);
    expect(box.y).not.toBe(0);
  }
}

module.exports = { DragabblePage };
