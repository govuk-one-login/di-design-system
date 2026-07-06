import { expect, test } from "@playwright/test";

test.describe("Progress button visual regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/progress-button");
    await page.evaluate(() => {
      document.querySelectorAll("form").forEach((form) => {
        form.addEventListener("submit", (event) => event.preventDefault());
      });
    });
  });

  test("default state", async ({ page }) => {
    const button = page.locator(".govuk-button--progress").first();
    await expect(button).toHaveScreenshot("progress-button-default.png");
  });

  test("after clicking", async ({ page }) => {
    const button = page.locator(".govuk-button--progress").first();
    button.click({ force: true });
    await expect(button).toHaveScreenshot("progress-button-clicked.png");
  });

  test("after clicking and waiting 5 seconds", async ({ page }) => {
    const button = page.locator(".govuk-button--progress").first();
    await button.click({ force: true });
    await page.waitForTimeout(5100);
    await page.waitForSelector('.govuk-button--progress:has-text("Keep waiting")', { state: "visible" });
    await expect(button).toHaveScreenshot("progress-button-clicked-and-waited.png", { timeout: 10000 });
  });

  test("default state - reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const button = page.locator(".govuk-button--progress").first();
    await expect(button).toHaveScreenshot("progress-button-default-no-motion.png");
  });

  test("after clicking - reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const button = page.locator(".govuk-button--progress").first();
    button.click({ force: true });
    await expect(button).toHaveScreenshot("progress-button-clicked-no-motion.png");
  });

  test("after clicking and waiting 5 seconds - reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const button = page.locator(".govuk-button--progress").first();
    await button.click({ force: true });
    await page.waitForTimeout(5100);
    await page.waitForSelector('.govuk-button--progress:has-text("Keep waiting")', { state: "visible" });
    await expect(button).toHaveScreenshot("progress-button-clicked-and-waited-no-motion.png", { timeout: 10000 });
  });
});
