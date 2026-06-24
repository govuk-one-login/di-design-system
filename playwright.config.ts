import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "html",
  timeout: 20000,
  expect: {
    timeout: 8000,
  },
  use: {
    baseURL: "http://localhost:8080",
    trace: process.env.CI ? "retain-on-failure" : "on-first-retry",
    screenshot: "only-on-failure",
    video: "off",
    actionTimeout: 8000,
    navigationTimeout: 10000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], headless: true },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:8080",
    reuseExistingServer: !process.env.CI,
    timeout: 45000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
