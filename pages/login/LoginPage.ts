import { Locator } from "@playwright/test";
import { BasePage } from "@pages/helpers/BasePage";
import { logger } from "@utils/logger";

export class LoginPage extends BasePage {
  // Locators
  public readonly emailInput: Locator = this.getByLabel("Email address");

  public readonly passwordInput: Locator = this.locator(
    'input[name="password"]'
  );

  public readonly continueButton: Locator = this.locator(
    'button[type="submit"][data-action-button-primary="true"]'
  );

  public readonly errorMessage: Locator = this.locator(
    '#error-element-password[data-error-code="wrong-email-credentials"]'
  );

  public readonly emailRequiredError: Locator = this.getByText(
    "Please enter an email address"
  );

  public readonly passwordRequiredError: Locator = this.getByText(
    "Password is required"
  );

  public async enterUsername(
    username: string = process.env.USERNAME as string
  ) {
    logger.info("Filling username...");
    await this.emailInput.fill(username);
  }
  public async enterPassword(
    password: string = process.env.PASSWORD as string
  ) {
    logger.info("Filling password...");
    await this.passwordInput.fill(password);
  }

  public async clickContinueBtn() {
    await this.click(this.continueButton, undefined, "Continue Button");
  }

  public async login(
    username: string = process.env.USERNAME as string,
    password: string = process.env.PASSWORD as string
  ) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickContinueBtn();
  }

  public async getErrorMessage(): Promise<string | null> {
    logger.info("Getting error message...");
    return await this.getElementText(this.errorMessage, "Login Error");
  }

  public async isErrorMessageVisible(): Promise<boolean> {
    logger.info("Checking if error message is visible...");
    return await this.errorMessage.isVisible();
  }

  public async waitForErrorMessage(): Promise<void> {
    logger.info("Waiting for error message to appear...");
    await this.waitForVisible(this.errorMessage, "Login Error Message");
  }

  public async getEmailRequiredErrorMessage(): Promise<string | null> {
    logger.info("Getting email required error message...");
    return await this.getElementText(
      this.emailRequiredError,
      "Email Required Error"
    );
  }

  public async getPasswordRequiredErrorMessage(): Promise<string | null> {
    logger.info("Getting password required error message...");
    return await this.getElementText(
      this.passwordRequiredError,
      "Password Required Error"
    );
  }
  
}
