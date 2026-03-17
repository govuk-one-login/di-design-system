import { expect, test } from "@playwright/test";

// Home page tests
test("has home page title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Home - GDS Design System | GOV.UK One Login/);
});

test("check links work in navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Design hub" }).click();
  await page.getByRole("link", { name: "Components" }).first().click();
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

test("'what's new' section", async ({ page }) => {
  await page.goto("/");

  const list = page.locator(".app-whats-new__list");

  await expect(
    list.locator("li").filter({ hasText: /1 December 2025/ }),
  ).toContainText("progress button component guidance");

  const listItemTwo = page.locator("li", { hasText: /1 November 2025/ });
  await expect(listItemTwo).toContainText(
    "section start page pattern guidance",
  );

  const listItemThree = page.locator("li", { hasText: /1 October 2025/ });
  await expect(listItemThree).toContainText("include the latest app journey");
});

test("check 'resources' headings and list items", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Resources" })).toBeVisible();

  await page
    .getByRole("link", { name: "GOV.UK One Login prototype" })
    .first()
    .click();

  await expect(
    page.getByText("An end to end prototype showing how users sign in"),
  ).toBeVisible();

  await expect(page.getByText("Password")).toBeVisible();

  await page
    .getByRole("link", { name: /Make changes to this prototype/i })
    .click();

  await page
    .getByRole("link", { name: /Tell us about a change that['’]s needed/i })
    .click();

  await page.getByRole("link", { name: "Components" }).nth(1).click();

  await expect(
    page.getByText("Reusable parts of a user interface with examples"),
  ).toBeVisible();
});

test("contribute section", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Contribute" })).toBeVisible();

  await expect(
    page.getByText(/The Design Hub is community led/i),
  ).toBeVisible();

  await expect(page.getByText(/get in touch through Slack/i)).toBeVisible();

  await page.getByRole("link", { name: /get in touch through Slack/i }).click();
});
