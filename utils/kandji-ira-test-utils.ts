import { Page, test as base, TestInfo, expect } from "@playwright/test";
import { BasePage } from "@pages/helpers/BasePage";
import { LoginPage } from "@pages/login/LoginPage";
import { MfaPage } from "@pages/login/MfaPage";
import { generateOtpCode } from "@utils/otp";
import { logger } from "@utils/logger";
import { PageManager } from "@pages/helpers/PageManager";

// Extends the base test with custom UI setup and automatic login
export const appLoginTest = base.extend({
  page: async ({ page }, use: (page: Page) => Promise<void>, testInfo: TestInfo) => {
    logger.info("Setting up test with automatic login...");
    const pm = new PageManager(page);

    // Navigate to login page
    await pm.onLoginPage().gotoAndWait(process.env.BASE_URL as string);
    // Login with default credentials
    await pm.onLoginPage().login();

    // Handle MFA
    const otpCode = generateOtpCode(process.env.OTP_KEY as string);
    await pm.onMfaPage().enterOtpCode(otpCode);
    await pm.onMfaPage().clickContinueBtn();

    BasePage.setPage(page); // Set the page in BasePage for global access
    await use(page); // Use the page in the test functions
  },
});

export { expect }; // Export commonly used Playwright test functions
