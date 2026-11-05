import { expect, test } from "@playwright/test";

// Patterns page tests
test("has patterns page title", async ({ page }) => {
  await page.goto("/patterns");

  await expect(page).toHaveTitle(
    "Patterns - GDS Design System | GOV.UK One Login",
  );
});

test("check links work in navigation", async ({ page }) => {
  await page.goto("/patterns");

  await page.getByRole("link", { name: "Components" }).first().click();
});

test("check main heading and text renders", async ({ page }) => {
  await page.goto("/patterns");

  await expect(page.getByRole("heading", { name: "Patterns" })).toBeVisible();

  const contentParagraphs = page.locator(
    ".govuk-grid-column-two-thirds p",
  );
  expect(await contentParagraphs.count()).toBeGreaterThan(0);
  for (const paragraph of await contentParagraphs.all()) {
    await expect(paragraph).not.toBeEmpty();
  }
});

test("side bar links", async ({ page }) => {
  await page.goto("/patterns");

  // Sidebar links should be present and navigable
  const sidebarLinks = page.locator(
    ".govuk-grid-column-one-third a",
  );
  expect(await sidebarLinks.count()).toBeGreaterThan(0);

  // First sidebar link should be navigable
  await sidebarLinks.first().click();
});
