import { expect, test } from "@playwright/test";

// Home page tests
test("has home page title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/- GOV.UK/);
});

test("check links work in navigation", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Design hub" }).click();

  await page.getByRole("link", { name: "Components" }).first().click();

  await page.getByRole("link", { name: "Patterns" }).first().click();
});

test("check hero section headings", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Design hub" })).toBeVisible();

  await expect(
    page.getByText(
      "Design resources to help teams create consistent GOV.UK One Login journeys.",
    ),
  ).toBeVisible();
});

test("check links work in 'what's new' section", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("link", { name: "progress button component guidance" })
    .click();

  await page
    .getByRole("link", { name: "section start page pattern guidance" })
    .click();

  await page
    .getByRole("link", { name: /GOV.UK One Login prototype/i })
    .first()
    .click();
});

test("check 'what's new' headings", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "What's new" })).toBeVisible();

  // await expect(
  //   page.getByText(/1 December 2025: Add progress button components guidance/i),
  // ).toBeVisible();

  // await expect(
  //   page.getByText(
  //     "1 November 2025: Updated section start page pattern guidance",
  //   ),
  // ).toBeVisible();

  // await expect(
  //   page.getByText(
  //     "1 October 2025 : Updated GOV.UK One Login prototype to include the latest app journey",
  //   ),
  // ).toBeVisible();

  const listItemOne = page.locator("li", { hasText: "1 December 2025" });
  await expect(listItemOne).toContainText(
    "1 December 2025 : Added progress button component guidance",
  );

  const listItemTwo = page.locator("li", { hasText: "1 November 2025" });
  await expect(listItemTwo).toContainText(
    "1 November 2025 : Updated section start page pattern guidance",
  );

  const listItemThree = page.locator("li", { hasText: "1 October 2025" });
  await expect(listItemThree).toContainText(
    "1 October 2025 : Updated GOV.UK One Login prototype to include the latest app journey",
  );
});

// Components page tests
test("has components page title", async ({ page }) => {
  await page.goto("/components");

  await expect(page).toHaveTitle("Components - GOV.UK");
});

// Patterns page tests
test("has patterns page title", async ({ page }) => {
  await page.goto("/patterns");

  await expect(page).toHaveTitle("Patterns - GOV.UK");
});

// progress button page

// section start page
