import { expect, test } from "@playwright/test";

// Components page tests
test("has components page title", async ({ page }) => {
  await page.goto("/components");

  await expect(page).toHaveTitle("Components - GOV.UK");
});

test("check links work in navigation", async ({ page }) => {
  await page.goto("/components");

  await page.getByRole("link", { name: "Design hub" }).click();

  await page.getByRole("link", { name: "Components" }).first().click();

  await page.getByRole("link", { name: "Patterns" }).first().click();
});

test("check main heading and text", async ({ page }) => {
  await page.goto("/components");

  await expect(page.getByRole("heading", { name: "Components" })).toBeVisible();

  await expect(
    page.getByText(
      "Components are reusable parts of a user interface used across GOV.UK One Login. Individual components can be used in multiple different patterns, pages and context.",
    ),
  ).toBeVisible();

  await expect(
    page.getByText(
      "All of the components in this section are supported by written guidance and contain coded examples where possible.",
    ),
  ).toBeVisible();
});

test("side bar links", async ({ page }) => {
  await page.goto("/components");

  await page.getByRole("link", { name: "Progress button " }).click();

  await page.getByRole("link", { name: "Component name 2" }).click();

  await page.getByRole("link", { name: "Component name 2" }).click();
});
