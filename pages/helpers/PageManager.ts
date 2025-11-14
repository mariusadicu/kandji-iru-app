// Core Playwright Page type
import { Page } from "@playwright/test";
import { LoginPage } from "@pages/login/LoginPage";
import { MfaPage } from "@pages/login/MfaPage";
import { HomePage } from "@pages/home/HomePage";
import { NavSideBar } from "@pages/components/NavSideBar";

// Manages all page objects and components for a test session
export class PageManager {
  // Playwright Page instance
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly mfaPage: MfaPage;
  private readonly homePage: HomePage;
  private readonly navSideBar: NavSideBar;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.mfaPage = new MfaPage(page);
    this.homePage = new HomePage(page);
    this.navSideBar = new NavSideBar(page);
  }

  // Returns the Playwright Page instance
  public getPage(): Page {
    return this.page;
  }

  public onLoginPage() {
    return this.loginPage;
  }

  public onMfaPage() {
    return this.mfaPage;
  }

  public onHomePage() {
    return this.homePage;
  }

  public onNavSideBar() {
    return this.navSideBar;
  }
}
