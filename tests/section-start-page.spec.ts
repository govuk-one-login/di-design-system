import { expect, test } from "@playwright/test";

// Section start page tests
test("has section start page title", async ({ page }) => {
  await page.goto("/section-start-page");

  await expect(page).toHaveTitle(/- GDS Design System | GOV.UK One Login/i);
});

test("check links work in navigation", async ({ page }) => {
  await page.goto("/section-start-page");

  await page.getByRole("link", { name: "Design hub" }).click();
  await page.getByRole("link", { name: "Components" }).first().click();
});

test("side bar links", async ({ page }) => {
  await page.goto("/section-start-page");

  // Verify the links exist without clicking the one that reloads the page
  const sectionLink = page
    .getByRole("link", { name: "Section start page" })
    .first();
  await expect(sectionLink).toBeVisible();

  await expect(
    page.getByRole("link", { name: /Pattern name 2/i }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: /Pattern name 3/i }),
  ).toBeVisible();
});

test("check main heading and text", async ({ page }) => {
  await page.goto("/section-start-page");

  await expect(
    page.getByRole("heading", { name: "Section start page", exact: true }),
  ).toBeVisible();

  await expect(
    page.getByText(
      "Help users to understand which section of the journey they are in, what tasks they'll need to complete and why.",
    ),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "When to use this pattern" }),
  ).toBeVisible();

  await expect(
    page.getByText(
      /Show the Section start page when users enter a new section/i,
    ),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "How it works" }),
  ).toBeVisible();

  const listItemOne = page.locator("li", { hasText: "what the credential" });
  await expect(listItemOne).toContainText("what the credential issuer does");

  const listItemTwo = page.locator("li", { hasText: "what tasks they need" });
  await expect(listItemTwo).toContainText(
    "what tasks they need to complete next and why",
  );
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
