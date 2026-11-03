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
  await page.getByRole("link", { name: "Components" }).first().click();
});

test("side bar links are visible", async ({ page }) => {
  await page.goto("/progress-button");

  const sideNav = page.getByRole("navigation", { name: /Components/i });

  await expect(
    sideNav.getByText("Progress button"),
  ).toBeVisible();
  await expect(
    sideNav.getByRole("link", { name: /Component name 2/i }),
  ).toBeVisible();
  await expect(
    sideNav.getByRole("link", { name: /Component name 3/i }),
  ).toBeVisible();
});

test("check main heading and text renders", async ({ page }) => {
  await page.goto("/progress-button");

  await expect(
    page.getByRole("heading", { name: "Progress button", exact: true }),
  ).toBeVisible();

  // Verify description renders without asserting exact wording
  const description = page.locator(
    ".govuk-grid-column-three-quarters-from-desktop p.govuk-body-l",
  );
  await expect(description).toBeVisible();
  await expect(description).not.toBeEmpty();

  // Verify structural section headings exist
  await expect(
    page.getByRole("heading", { name: "When to use this component" }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "When not to use this component" }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "How it works" }),
  ).toBeVisible();

  // Verify the table renders with the expected structure (3 columns, non-empty cells)
  const headers = page.locator("thead th");
  expect(await headers.count()).toBe(3);
  for (const header of await headers.all()) {
    await expect(header).not.toBeEmpty();
  }

  const firstRow = page.locator("tbody tr").first();
  const firstRowCells = firstRow.locator("th, td");
  expect(await firstRowCells.count()).toBe(3);
  for (const cell of await firstRowCells.all()) {
    await expect(cell).not.toBeEmpty();
  }
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
