import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  use: { baseURL: "http://127.0.0.1:4173/alina-lending/", headless: true },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
        defaultBrowserType: "chromium",
        channel: "chrome",
      },
    },
  ],
  // Serve under a repository path to catch GitHub Pages asset issues.
  webServer: {
    command: "node tests/serve.mjs",
    port: 4173,
    reuseExistingServer: false,
  },
});
