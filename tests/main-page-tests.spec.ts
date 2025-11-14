import { appLoginTest as test, expect } from "@utils/kandji-ira-test-utils";
import { PageManager } from "@pages/helpers/PageManager";
import { logger } from "@utils/logger";
import * as allure from "allure-js-commons";

test.describe("Kandji Home Page Test Suite @smoke", () => {
  let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    allure.owner("Marius");
    allure.link(`${process.env.BASE_URL}`, "Project website");
    pm = new PageManager(page);
    logger.info("Starting home page tests...");
  });

  test("Verify all navigation tabs are visible and enabled", async ({ page }) => {
    logger.info("Validating all navigation tabs...");

    const navTabs = pm.onNavSideBar().getAllNavigationTabs();

    for (const tab of navTabs) {
      await expect(tab.locator).toBeVisible();
      await expect(tab.locator).toBeEnabled();
      logger.info(`✓ ${tab.name} tab is visible and enabled`);
    }

    logger.info("All navigation tabs validated successfully");
  });

  test("Navigate to tabs", async ({ page }) => {
    logger.info("Testing navigation to main tabs");

    await pm.onNavSideBar().goToBlueprints();
    await expect(page).toHaveURL(/.*\/blueprints/);

    await pm.onNavSideBar().goToUsers();
    await expect(page).toHaveURL(/.*\/users/);
  });

  test("Library main modules", async ({ page }) => {
    logger.info("Testing Library main modules");

    await pm.onNavSideBar().goToLibrary();

    // Rest of the test implementation goes here
  });

});
