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

test("'what's new' section", async ({ page }) => {
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

  await expect(page.getByRole("heading", { name: "What's new" })).toBeVisible();

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

test("check 'resources' headings and list items", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Resources" })).toBeVisible();

  await page
    .getByRole("link", { name: /GOV.UK One Login prototype/i })
    .nth(1)
    .click();

  await expect(
    page.getByText(
      "An end to end prototype showing how users sign in, prove their identity and manage their One Login.",
    ),
  ).toBeVisible();

  await expect(page.getByText("Password")).toBeVisible();

  await page
    .getByRole("link", { name: /Make changes to this prototype/i })
    .click();

  await page
    .getByRole("link", { name: /Tell us about a change that’s needed/i })
    .click();

  await page
    .getByRole("link", { name: /Components/i })
    .nth(1)
    .click();

  await expect(
    page.getByText(
      "Reusable parts of a user interface with examples, code and guidance for GOV.UK One Login.",
    ),
  ).toBeVisible();

  await page
    .getByRole("link", { name: /Patterns/i })
    .nth(1)
    .click();

  await expect(
    page.getByText(
      "Design solutions for specific user-focused tasks and page types.",
    ),
  ).toBeVisible();
});

test("contribute section", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Contribute" })).toBeVisible();

  await expect(
    page.getByText(
      "The Design Hub is community led, to keep it updated and relevant we encourage contributions from the community.",
    ),
  ).toBeVisible();

  await expect(
    page.getByText(
      "If you have a question, idea or suggestion get in touch through Slack (opens in app if you have it).",
    ),
  ).toBeVisible();

  await page
    .getByRole("link", {
      name: /get in touch through Slack /i,
    })
    .first()
    .click();
});
