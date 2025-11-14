import { Page, Locator } from "@playwright/test";
import { BasePage } from "@pages/helpers/BasePage";
import { logger } from "@utils/logger";

export class NavSideBar extends BasePage {
  // Locators
  readonly searchItem: Locator = this.getByText("Search");

  readonly devicesTab: Locator = this.getByText("Devices");

  readonly blueprintsTab: Locator = this.getByText("Blueprints");

  readonly libraryTab: Locator = this.getByText("Library");

  readonly usersTab: Locator = this.getByText("Users");

  readonly threatsTab: Locator = this.getByText("Threats");

  readonly vulnerabilitiesTab: Locator = this.getByText("Vulnerabilities");

  readonly alertsTab: Locator = this.getByText("Alerts");

  readonly activityTab: Locator = this.getByText("Activity");

  readonly enrollmentTab: Locator = this.getByText("Enrollment");

  readonly resourcesTab: Locator = this.getByText("Resources");

  // Helper Methods
  getAllNavigationTabs() {
    return [
      { name: "Devices", locator: this.devicesTab },
      { name: "Blueprints", locator: this.blueprintsTab },
      { name: "Library", locator: this.libraryTab },
      { name: "Users", locator: this.usersTab },
      { name: "Threats", locator: this.threatsTab },
      { name: "Vulnerabilities", locator: this.vulnerabilitiesTab },
    ];
  }

  // Navigation Methods
  async openSearch() {
    logger.info("Opening Universal Search");
    await this.searchItem.click();
  }

  async goToDevices() {
    logger.info("Navigating to Devices");
    await this.devicesTab.click();
  }

  async goToBlueprints() {
    logger.info("Navigating to Blueprints");
    await this.blueprintsTab.click();
  }

  async goToLibrary() {
    logger.info("Navigating to Library");
    await this.libraryTab.click();
  }

  async goToUsers() {
    logger.info("Navigating to Users");
    await this.usersTab.click();
  }

  async goToThreats() {
    logger.info("Navigating to Threats");
    await this.threatsTab.click();
  }

  async goToVulnerabilities() {
    logger.info("Navigating to Vulnerabilities");
    await this.vulnerabilitiesTab.click();
  }

  async goToAlerts() {
    logger.info("Navigating to Alerts");
    await this.alertsTab.click();
  }

  async goToActivity() {
    logger.info("Navigating to Activity");
    await this.activityTab.click();
  }

  async goToEnrollment() {
    logger.info("Navigating to Enrollment");
    await this.enrollmentTab.click();
  }

  async goToResources() {
    logger.info("Navigating to Resources");
    await this.resourcesTab.click();
  }
}
