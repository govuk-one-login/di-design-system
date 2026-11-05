import { expect, test } from "@playwright/test";

// Components page tests
test("has components page title", async ({ page }) => {
  await page.goto("/components");

  await expect(page).toHaveTitle(
    "Components - GDS Design System | GOV.UK One Login",
  );
});

test("check links work in navigation", async ({ page }) => {
  await page.goto("/components");

  await page.getByRole("link", { name: "Components" }).first().click();
});

test("check main heading and text renders", async ({ page }) => {
  await page.goto("/components");

  await expect(page.getByRole("heading", { name: "Components" })).toBeVisible();

  const contentParagraphs = page.locator(
    ".govuk-grid-column-three-quarters-from-desktop p",
  );
  expect(await contentParagraphs.count()).toBeGreaterThan(0);
  for (const paragraph of await contentParagraphs.all()) {
    await expect(paragraph).not.toBeEmpty();
  }
});

test("side bar links", async ({ page }) => {
  await page.goto("/components");

  const sideNav = page.getByRole("navigation", { name: /Components/i });
  const sideNavLinks = sideNav.getByRole("link");

  // Sidebar should contain at least one link
  expect(await sideNavLinks.count()).toBeGreaterThan(0);

  // First sidebar link should be navigable
  await sideNavLinks.first().click();
});
