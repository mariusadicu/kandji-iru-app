import * as allure from "allure-js-commons";
import { test, expect } from "@playwright/test";
import { PageManager } from "@pages/helpers/PageManager";
import { logger } from "@utils/logger";
import { generateOtpCode } from "@utils/otp";

test.describe("Login Feature @login @smoke", () => {
  let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    allure.owner("Marius");
    allure.link(`${process.env.BASE_URL}`, "Project website");
    pm = new PageManager(page);
    logger.info("Starting login tests...");
  });

  test("Login with valid username and password", async ({ page }) => {
    logger.info("Starting login test...");
    await pm.onLoginPage().gotoAndWait(process.env.BASE_URL as string);

    await pm.onLoginPage().enterUsername(process.env.USERNAME as string);
    await pm.onLoginPage().enterPassword(process.env.PASSWORD as string);
    await pm.onLoginPage().clickContinueBtn();

    const otpCode = generateOtpCode(process.env.OTP_SECRET as string);
    await pm.onMfaPage().enterOtpCode(otpCode);
    await pm.onMfaPage().clickContinueBtn();

    // Wait for navigation after MFA
    await page.waitForURL(/.*qahw\.kandji\.io/, { timeout: 10000 });

    // Verify successful login by checking page title
    const pageTitle = await pm.onHomePage().getPageTitle();
    expect(pageTitle).toContain("Kandji");
  });

  test("Login with invalid password", async ({ page }) => {
    await pm.onLoginPage().gotoAndWait(process.env.BASE_URL as string);

    await pm.onLoginPage().enterUsername(process.env.USERNAME as string);
    await pm.onLoginPage().enterPassword("WrongPassword123!");
    await pm.onLoginPage().clickContinueBtn();

    // Wait for error message to appear
    await pm.onLoginPage().waitForErrorMessage();

    // Verify error message is visible
    const isErrorVisible = await pm.onLoginPage().isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();

    // Verify error message text
    const errorText = await pm.onLoginPage().getErrorMessage();
    expect(errorText).toContain("Wrong email or password");
  });

  test("Login with invalid email format", async ({ page }) => {
    await pm.onLoginPage().gotoAndWait(process.env.BASE_URL as string);

    await pm.onLoginPage().enterUsername("invalid-email");
    await pm.onLoginPage().enterPassword(process.env.PASSWORD as string);
    await pm.onLoginPage().clickContinueBtn();

    // Wait for error message to appear
    await pm.onLoginPage().waitForErrorMessage();

    // Verify error message is visible
    const isErrorVisible = await pm.onLoginPage().isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();

    // Verify error message text
    const errorText = await pm.onLoginPage().getErrorMessage();
    expect(errorText).toContain("Wrong email or password");
  });

  test("Login with empty credentials", async ({ page }) => {
    await pm.onLoginPage().gotoAndWait(process.env.BASE_URL as string);

    // Try to click Continue without filling anything
    await pm.onLoginPage().clickContinueBtn();

    // Verify email error message text
    const emailErrorText = await pm
      .onLoginPage()
      .getEmailRequiredErrorMessage();
    expect(emailErrorText).toContain("Please enter an email address");

    // Verify password error message text
    const passwordErrorText = await pm
      .onLoginPage()
      .getPasswordRequiredErrorMessage();
    expect(passwordErrorText).toContain("Password is required");
  });
});
