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

  await page.getByRole("link", { name: "Design hub" }).click();

  await page.getByRole("link", { name: "Components" }).first().click();
});

test("check main heading and text", async ({ page }) => {
  await page.goto("/patterns");

  await expect(page.getByRole("heading", { name: "Patterns" })).toBeVisible();

  await expect(
    page.getByText(
      "Patterns are best practice design solutions for specific user-focused tasks and page types. They include examples of successful approaches but are flexible and don’t prescribe exact design solutions.",
    ),
  ).toBeVisible();

  await expect(
    page.getByText(
      "Patterns often use one or more components and explain how to adapt them to the context.",
    ),
  ).toBeVisible();

  await expect(
    page.getByText(
      "All of the patterns in this section are supported by written guidance and contain coded examples where possible.",
    ),
  ).toBeVisible();
});

test("side bar links", async ({ page }) => {
  await page.goto("/patterns");

  await page.getByRole("link", { name: "Section start page" }).click();

  await page.getByRole("link", { name: "Pattern name 2" }).click();

  await page.getByRole("link", { name: "Pattern name 2" }).click();
});
