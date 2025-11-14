import { FrameLocator, Locator, Page, expect } from "@playwright/test";
import { logger } from "@utils/logger";

export class BasePage {
  protected readonly page: Page;

  // Optional: static reference for utils/global access
  private static _staticPage?: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ----------------------
  // Locators
  // ----------------------
  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  protected frameLocator(selector: string): FrameLocator {
    return this.page.frameLocator(selector);
  }

  protected getByRole(
    role: string,
    options?: { name?: string | RegExp }
  ): Locator {
    return this.page.getByRole(role as any, options);
  }

  protected getByText(
    text: string | RegExp,
    options?: { exact?: boolean }
  ): Locator {
    return this.page.getByText(text, options);
  }

  protected getByLabel(
    label: string | RegExp,
    options?: { exact?: boolean }
  ): Locator {
    return this.page.getByLabel(label, options);
  }

  // Getters and Setters for static page
  public static setPage(page: Page): void {
    BasePage._staticPage = page;
  }

  public static getPage(): Page {
    if (!BasePage._staticPage) {
      throw new Error(
        "Static page not set. Did you call BasePage.setPage(page)?"
      );
    }
    return BasePage._staticPage;
  }

  /**
   * Returns the current page title.
   */
  public async getPageTitle(): Promise<string> {
    const title = await this.page.title();
    logger.info(`Getting Page title: ${title}`);
    return title;
  }

  /**
   * Gets the text content of a locator and logs the action.
   * @param locator - Playwright Locator
   * @param description - Optional description for logging
   */
  public async getElementText(
    locator: Locator,
    description?: string
  ): Promise<string | null> {
    const text = await locator.textContent();
    logger.info(
      `Getting text for${description ? ` ${description}` : ""}: ${text}`
    );
    return text;
  }

  async waitNumberOfSeconds(timeInSeconds: number) {
    logger.info(`Waiting for ${timeInSeconds} second(s)`);
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }

  public async waitForVisible(
    locator: Locator,
    description?: string,
    timeout = 5000
  ): Promise<void> {
    logger.info(
      `Waiting for ${
        description || "element"
      } to be visible (timeout: ${timeout}ms)`
    );
    await locator.waitFor({ state: "visible", timeout });
  }

  /**
   * Navigate to a URL and wait for page to be fully loaded.
   * @param url - URL to navigate
   */
  public async gotoAndWait(url: string): Promise<void> {
    logger.info(`Navigating to URL: ${url}`);
    await this.page.goto(url);
    await this.page.waitForLoadState("networkidle");
    logger.info(`Navigation to url complete and network is idle.`);
  }

  // Helper Methods

  /**
   * Clicks an element and logs the action.
   * @param selector - Selector or Locator
   * @param options - Playwright click options
   */
  public async click(
    selector: string | Locator,
    options?: Parameters<Locator["click"]>[0],
    actionName?: string
  ): Promise<void> {
    const locator =
      typeof selector === "string" ? this.locator(selector) : selector;
    const label =
      actionName || (typeof selector === "string" ? selector : "<Locator>");
    logger.info(`Clicking on: ${label}`);
    await locator.click(options);
  }

  /**
   * Checks a checkbox and logs the action.
   * @param selector - Selector or Locator
   * @param options - Playwright check options
   */
  public async check(
    selector: string | Locator,
    options?: Parameters<Locator["check"]>[0]
  ): Promise<void> {
    const locator =
      typeof selector === "string" ? this.locator(selector) : selector;
    logger.info(
      `Checking: ${typeof selector === "string" ? selector : "<Locator>"}`
    );
    await locator.check(options);
    await expect(locator).toBeChecked();
  }

  /**
   * Unchecks a checkbox and logs the action.
   * @param selector - Selector or Locator
   * @param options - Playwright uncheck options
   */
  public async uncheck(
    selector: string | Locator,
    options?: Parameters<Locator["uncheck"]>[0]
  ): Promise<void> {
    const locator =
      typeof selector === "string" ? this.locator(selector) : selector;
    logger.info(
      `Unchecking: ${typeof selector === "string" ? selector : "<Locator>"}`
    );
    await locator.uncheck(options);
    await expect(locator).not.toBeChecked();
  }

  public async fill(
    selector: string | Locator,
    value: string,
    options?: Parameters<Locator["fill"]>[1]
  ): Promise<void> {
    const locator =
      typeof selector === "string" ? this.locator(selector) : selector;
    logger.info(`Filling input with value: ${value}`);
    await locator.waitFor({ state: "visible", timeout: 5000 });
    if (await locator.isVisible()) {
      await locator.fill(value, options);
    } else {
      throw new Error(`Element is NOT visible`);
    }
  }
}
