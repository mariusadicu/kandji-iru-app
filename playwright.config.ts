import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: "allure-playwright",
  outputDir: "allure-results/artifacts",
  use: {
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
    video: "retain-on-failure", //on-first-retry //retain-on-failure
    screenshot: "on-first-failure",
    headless: false,
  },

  projects: [
    // Desktop browsers
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: { width: 2000, height: 1440 },
      },
    },
    // {
    //   name: "Desktop Firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     viewport: { width: 1800, height: 1000 },
    //   },
    // },
    // {
    //   name: "Desktop Safari",
    //   use: {
    //     ...devices["Desktop Safari"],
    //     viewport: { width: 1800, height: 1000 },
    //   },
    // },

    // Mobile browsers
    // {
    //   name: "Mobile Chrome",
    //   use: {
    //     ...devices["Pixel 5"],
    //   },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: {
    //     ...devices["iPhone 12"],
    //   },
    // },

  ],
});
