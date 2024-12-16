import { test, expect } from '@playwright/test';

test('has html lang attribute set', async ({ page }) => {
    await page.goto('http://localhost:8080/');

    // Expect a title "to contain" a substring.
    const htmlElement = page.locator("html");
    await expect(htmlElement).toHaveAttribute("lang", "en");
});

test('has title with right value', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hery - Playground/);
});

test('has h1 with right value', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await expect(page.locator("h1")).toHaveText("Hery - Playground 🛝");
});

test('verifies that all the tabs are there', async ({ page }) => {
    await page.goto('http://localhost:8080/');

    // Locators for tabs
    const heryTab = page.locator('#box-tabs-hery-file-link');
    const cacheTab = page.locator('#box-tabs-cache-link');
    const uploadTab = page.locator('#box-tabs-eql-link');

    // Locators for tab contents and side menus using unique IDs
    const heryContent = page.locator('#tab-content-hery');
    const herySideMenu = page.locator('#tab-right-side-menu-hery');
    const cacheContent = page.locator('#tab-content-cache');
    const cacheSideMenu = page.locator('#tab-right-side-menu-cache');
    const uploadContent = page.locator('#tab-content-upload');

    // Ensure tabs are visible
    await expect(heryTab).toBeVisible();
    await expect(cacheTab).toBeVisible();
    await expect(uploadTab).toBeVisible();

    // Optionally verify the text content of each tab
    await expect(heryTab).toHaveText('HERY file');
    await expect(cacheTab).toHaveText('Cache');
    await expect(uploadTab).toHaveText('Upload');

    // Verify default state (HERY tab is active)
    await expect(heryContent).toBeVisible();
    //await expect(herySideMenu).toBeVisible();
    await expect(cacheContent).not.toBeVisible();
    await expect(cacheSideMenu).not.toBeVisible();
    await expect(uploadContent).not.toBeVisible();

    // Click Cache tab and verify its content and side menu are visible
    await cacheTab.click();
    await page.waitForSelector('#tab-right-side-menu-cache', { state: 'visible' });
    await expect(cacheContent).toBeVisible();
    await expect(cacheSideMenu).toBeVisible();
    await expect(heryContent).not.toBeVisible();
    await expect(herySideMenu).not.toBeVisible();
    await expect(uploadContent).not.toBeVisible();

    // Click Upload tab and verify its content is visible (no side menu expected for Upload tab)
    await uploadTab.click();
    await page.waitForSelector('#tab-content-upload', { state: 'visible' });
    await expect(uploadContent).toBeVisible();
    await expect(heryContent).not.toBeVisible();
    await expect(herySideMenu).not.toBeVisible();
    await expect(cacheContent).not.toBeVisible();
    await expect(cacheSideMenu).not.toBeVisible();

    // Click HERY tab again to return to the default state and verify
    await heryTab.click();
    //await page.waitForSelector('#tab-right-side-menu-hery', { state: 'visible' });
    await expect(heryContent).toBeVisible();
    //await expect(herySideMenu).toBeVisible();
    await expect(cacheContent).not.toBeVisible();
    await expect(cacheSideMenu).not.toBeVisible();
    await expect(uploadContent).not.toBeVisible();
});
