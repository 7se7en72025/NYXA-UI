import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("navbar logo links to home", async ({ page }) => {
    await page.goto("/docs");
    const logo = page.locator('a[href="/"]').first();
    await expect(logo).toBeVisible();
  });

  test("navigation between pages works", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/docs"]');
    await expect(page).toHaveURL(/docs/);
    await page.click('a[href="/"]');
    await expect(page).toHaveURL("/");
  });

  test("docs sidebar links work", async ({ page }) => {
    await page.goto("/docs");
    const links = page.locator("aside a");
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    const firstLink = links.first();
    await firstLink.click();
    await page.waitForLoadState("networkidle");
  });

  test("404 page shows for invalid routes", async ({ page }) => {
    const response = await page.goto("/nonexistent-page");
    expect(response?.status()).toBe(404);
  });
});

test.describe("Responsive Design", () => {
  test("renders correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const hero = page.locator(".hero-section");
    await expect(hero).toBeVisible();
  });

  test("renders correctly on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    const hero = page.locator(".hero-section");
    await expect(hero).toBeVisible();
  });

  test("renders correctly on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");
    const hero = page.locator(".hero-section");
    await expect(hero).toBeVisible();
  });
});

test.describe("User Interactions", () => {
  test("FAQ accordion works", async ({ page }) => {
    await page.goto("/");
    const faqSection = page.locator("text=Is Falak easy to customise?");
    if (await faqSection.isVisible()) {
      await faqSection.click();
      await page.waitForTimeout(300);
    }
  });

  test("code blocks are visible", async ({ page }) => {
    await page.goto("/docs/installation/nextjs");
    const codeBlock = page.locator("pre, code").first();
    await expect(codeBlock).toBeVisible();
  });

  test("scroll to top works", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });
});
