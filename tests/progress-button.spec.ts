import { expect, test } from "@playwright/test";

// Progress button page tests
test("has progress button page title", async ({ page }) => {
  await page.goto("/progress-button");

  await expect(page).toHaveTitle("- GOV.UK");
});

test("check links work in navigation", async ({ page }) => {
  await page.goto("/progress-button");

  await page.getByRole("link", { name: "Design hub" }).click();

  await page.getByRole("link", { name: "Components" }).first().click();

  await page.getByRole("link", { name: "Patterns" }).first().click();
});

test("side bar links", async ({ page }) => {
  await page.goto("/progress-button");

  await page.getByRole("link", { name: "Progress button " }).first().click();

  await page.getByRole("link", { name: /Component name 2/i }).isVisible();

  await page.getByRole("link", { name: /Component name 3/i }).isVisible();
});

test("check main heading and text", async ({ page }) => {
  await page.goto("/progress-button");

  await expect(
    page.getByRole("heading", { name: "Progress button" }),
  ).toBeVisible();

  await expect(
    page.getByText(
      "Help users understand that they need to wait for something to finish happening.",
    ),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "When to use this component" }),
  ).toBeVisible();

  await expect(
    page.getByText(
      "Use this component when there is more than a 2 second delay between the user clicking a button and seeing the result, such as a page loading.",
    ),
  ).toBeVisible();

  await expect(
    page.getByText(
      "2 seconds is a short delay, so use this component with care. Overusing it, especially on standard transactional steps, can make the service feel slower than it really is. This component is better suited to things like submitting information to an external API or performing a short backend process.",
    ),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "When not to use this component" }),
  ).toBeVisible();

  await expect(
    page.getByText(
      "Try to make your service respond quickly, so you don’t need to use a progress button.",
    ),
  ).toBeVisible();

  await expect(
    page.getByText(
      "Do not use this component when the user needs to take further action, such as checking their email, opening another app, or retrieving a security code. The progress button is only for situations where the user is expected to wait, not when they need to do something else.",
    ),
  ).toBeVisible();

  await expect(
    page.getByText(
      "Do not use this component when there is less than a 2 second delay between the user clicking a button and seeing the result. Users may notice a brief delay, but they stay focused and do not need reassurance. Using a progress button here can confuse the user or make the service feel slower than it is.",
    ),
  ).toBeVisible();

  await expect(
    page.getByText(
      "Do not use this component when there is more than a 10 second delay between the user clicking a button and seeing the result. After about 10 seconds, the average attention span is maxed out and users don't retain enough short-term memory to easily continue when the result appears. Focus on reducing that time, or use another technique – for example, showing determinate progress on an interstitial page or allowing the user to continue and be notified when the action is complete.",
    ),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "How it works" }),
  ).toBeVisible();

  await expect(
    page.getByText(
      "A progress button gives users immediate, contextual feedback after they click. It helps reassure them that something is happening and reduces the risk of repeated submissions.",
    ),
  ).toBeVisible();

  await expect(
    page.getByText(
      "The component builds on the default GOV.UK Button to show an active loading state when clicked.",
    ),
  ).toBeVisible();

  await expect(page.getByText("After a user clicks the button:")).toBeVisible();

  const listItemOne = page.locator("li", { hasText: "The button changes" });
  await expect(listItemOne).toContainText(
    `The button changes to govuk-colour("dark-grey") (#505a5f) to keep the user's focus`,
  );

  const listItemTwo = page.locator("li", { hasText: "A spinner appears" });
  await expect(listItemTwo).toContainText(
    "A spinner appears to indicate that something is happening",
  );

  const listItemThree = page.locator("li", {
    hasText: "The button text updates",
  });

  await expect(listItemThree).toContainText(
    "The button text updates at specific points to reassure something is still happening:",
  );

  const headers = await page.locator("thead th").allTextContents();
  expect(headers).toEqual([
    "Response time",
    "Button text",
    "Welsh translation of button text",
  ]);

  const firstRowCells = await page
    .locator("tbody tr")
    .first()
    .locator("th, td")
    .allTextContents();

  const cleanCells = firstRowCells.map((text) => text.trim());

  expect(cleanCells).toEqual(["0.1 seconds", "Wait", "Aros"]);

  await expect(
    page.getByText(
      "When the loading state appears, the updated text focuses on reassuring the user that the action is still happening, rather than repeating or explaining it. This reassurance is also announced by screen readers as the button text updates.",
    ),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Accessibility" }),
  ).toBeVisible();

  await expect(page.getByText("Example section...").first()).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Technical guidance" }),
  ).toBeVisible();

  await expect(page.getByText("Example section...").nth(1)).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Research on this component" }),
  ).toBeVisible();

  await expect(page.getByText("Example section...").nth(2)).toBeVisible();
});

test("check tabs", async ({ page }) => {
  await page.goto("/progress-button");

  await page.getByRole("tab", { name: "HTML" }).focus();

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

test("check to see progress button is on page", async ({ page }) => {
  await page.goto("/progress-button");

  await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
});
