import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Falak/);
  });

  test("has hero section", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator(".hero-section");
    await expect(hero).toBeVisible();
  });

  test("has navbar", async ({ page }) => {
    await page.goto("/");
    const navbar = page.locator("nav");
    await expect(navbar).toBeVisible();
  });

  test("has footer", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("get started link works", async ({ page }) => {
    await page.goto("/");
    const link = page.locator('a[href="/docs"]').first();
    await link.click();
    await expect(page).toHaveURL(/docs/);
  });

  test("github link opens in new tab", async ({ page }) => {
    await page.goto("/");
    const link = page.locator('a[href*="github.com"]').first();
    await expect(link).toHaveAttribute("target", "_blank");
  });
});
