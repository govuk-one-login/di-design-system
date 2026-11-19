import { expect, test } from "@playwright/test";

// Home page tests
test("has home page title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Home - GDS Design System | GOV.UK One Login/);
});

test("check navigation renders", async ({ page }) => {
  await page.goto("/");

  const nav = page.locator(".govuk-service-navigation__list");
  await expect(nav).toBeVisible();
});

test("check hero section renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Design hub" })).toBeVisible();
  await expect(page.locator(".app-masthead p")).not.toBeEmpty();
});

test("check cards section renders", async ({ page }) => {
  await page.goto("/");

  const cards = page.locator(".design-hub-card");
  expect(await cards.count()).toBeGreaterThan(0);

  const descriptions = page.locator(".design-hub-card__description");
  for (const description of await descriptions.all()) {
    await expect(description).not.toBeEmpty();
  }

  const cardLinks = page.locator(".design-hub-card a");
  expect(await cardLinks.count()).toBeGreaterThan(0);
});

test("contribute section renders", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Contribute" })).toBeVisible();

  const contributeParagraphs = page
    .locator("h2:has-text('Contribute')")
    .locator("~ p");
  expect(await contributeParagraphs.count()).toBeGreaterThan(0);
  await expect(contributeParagraphs.first()).not.toBeEmpty();

  const contributeLinks = page
    .locator("h2:has-text('Contribute')")
    .locator("~ p a");
  expect(await contributeLinks.count()).toBeGreaterThan(0);
});
