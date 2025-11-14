import { Locator } from "@playwright/test";
import { BasePage } from "@pages/helpers/BasePage";
import { logger } from "@utils/logger";

export class MfaPage extends BasePage {
  public readonly otpCodeInput: Locator = this.getByLabel(
    "Enter your one-time code"
  );

  public readonly continueButton: Locator = this.locator(
    'button[type="submit"][data-action-button-primary="true"]'
  );

  public async enterOtpCode(code: string) {
    logger.info(`Entering OTP code: ${code.substring(0, 2)}****`);
    await this.otpCodeInput.fill(code);
  }

  public async clickContinueBtn() {
    await this.click(this.continueButton, undefined, "MFA Continue Button");
  }
}