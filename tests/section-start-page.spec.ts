import { expect, test } from "@playwright/test";

// Section start page tests
test("has section start page title", async ({ page }) => {
  await page.goto("/section-start-page");

  await expect(page).toHaveTitle(/- GDS Design System | GOV.UK One Login/i);
});

test("check links work in navigation", async ({ page }) => {
  await page.goto("/section-start-page");

  await page.getByRole("link", { name: "Components" }).first().click();
});

test("side bar links", async ({ page }) => {
  await page.goto("/section-start-page");

  // Verify the current page link exists in the sidebar
  const sectionLink = page
    .getByRole("link", { name: "Section start page" })
    .first();
  await expect(sectionLink).toBeVisible();

  // Sidebar should contain at least one other link
  const sidebarLinks = page.locator(
    ".govuk-grid-column-one-quarter-from-desktop a",
  );
  expect(await sidebarLinks.count()).toBeGreaterThan(1);
});

test("check main heading and text renders", async ({ page }) => {
  await page.goto("/section-start-page");

  await expect(
    page.getByRole("heading", { name: "Section start page", exact: true }),
  ).toBeVisible();

  // Verify description text renders (without asserting exact wording)
  const description = page.locator(
    ".govuk-grid-column-three-quarters-from-desktop p.govuk-body-l",
  );
  await expect(description).toBeVisible();
  await expect(description).not.toBeEmpty();

  // Verify at least one section heading exists below the description
  const sectionHeadings = page.locator(
    ".govuk-grid-column-three-quarters-from-desktop h2",
  );
  expect(await sectionHeadings.count()).toBeGreaterThan(0);
});

test("check tabs", async ({ page }) => {
  await page.goto("/section-start-page");

  const htmlTab = page.getByRole("tab", { name: "HTML" });
  await htmlTab.click();

  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Nunjucks" })).toHaveAttribute(
    "aria-selected",
    "true",
  );

  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Figma" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});
