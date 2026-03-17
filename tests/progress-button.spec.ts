import { expect, test } from "@playwright/test";

// Progress button page tests
test("has progress button page title", async ({ page }) => {
  await page.goto("/progress-button");
  await expect(page).toHaveTitle(
    /Progress button - GDS Design System | GOV.UK One Login/i,
  );
});

test("check links work in navigation", async ({ page }) => {
  await page.goto("/progress-button");
  await page.getByRole("link", { name: "Design hub" }).click();
  await page.getByRole("link", { name: "Components" }).first().click();
});

test("side bar links are visible", async ({ page }) => {
  await page.goto("/progress-button");

  const sideNav = page.getByRole("navigation", { name: /Components/i });

  await expect(
    sideNav.getByRole("link", { name: "Progress button" }),
  ).toBeVisible();
  await expect(
    sideNav.getByRole("link", { name: /Component name 2/i }),
  ).toBeVisible();
  await expect(
    sideNav.getByRole("link", { name: /Component name 3/i }),
  ).toBeVisible();
});

test("check main heading and text", async ({ page }) => {
  await page.goto("/progress-button");

  await expect(
    page.getByRole("heading", { name: "Progress button", exact: true }),
  ).toBeVisible();

  await expect(
    page.getByText(/Help users understand that they need to wait/i),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "When to use this component" }),
  ).toBeVisible();

  await expect(
    page.getByText(
      /2 seconds is a short delay, so use this component with care/i,
    ),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "When not to use this component" }),
  ).toBeVisible();

  await expect(
    page.getByText(/Try to make your service respond quickly/i),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "How it works" }),
  ).toBeVisible();

  await expect(
    page
      .locator("li")
      .filter({ hasText: /The button changes to govuk-colour/i }),
  ).toBeVisible();

  const headers = await page.locator("thead th").allTextContents();
  expect(headers.map((h) => h.trim())).toEqual([
    "Response time",
    "Button text",
    "Welsh translation of button text",
  ]);

  const firstRowCells = await page
    .locator("tbody tr")
    .first()
    .locator("th, td")
    .allTextContents();

  expect(firstRowCells.map((text) => text.trim())).toEqual([
    "0.1 seconds",
    "Wait",
    "Aros",
  ]);
});

test("check tabs", async ({ page }) => {
  await page.goto("/progress-button");

  const htmlTab = page.getByRole("tab", { name: "HTML" });
  await htmlTab.click();

  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Nunjucks" })).toBeVisible();
});

test("check to see progress button is on page", async ({ page }) => {
  await page.goto("/progress-button");
  await expect(
    page.getByRole("button", { name: "Continue" }).first(),
  ).toBeVisible();
});
