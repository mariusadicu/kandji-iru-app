# Kandji UI Automation Framework

> **Scalable Playwright + TypeScript framework for automated UI testing**

---

## Quick Start

### Prerequisites
- Node.js 18+ and npm 9+

### Installation

```bash
git clone <repository-url>
cd kandji-iru-app
npm install
npx playwright install
```

### Environment Setup

Create `.env` file:

```bash
BASE_URL=https://qahw.kandji.io
EMAIL=your-email@example.com
PASSWORD=your-password
OTP_SECRET=your-totp-secret  # Optional for automated MFA
```

---

## Running Tests

```bash
npm run tests                              # Run all tests
npm run test:smoke                         # Smoke tests only
npm run test:specific -- app-login.spec.ts # Specific file
npm run allure:generate:report             # Generate report
npm run allure:open                        # View report
```

**Authentication:**
- With `OTP_SECRET`: Tests auto-generate MFA codes
- Without: Enter OTP manually when prompted

---

## Project Structure

```
kandji-iru-app/
├── pages/                      # Page Object Model
│   ├── helpers/                # BasePage, PageManager
│   ├── components/             # Reusable components (NavSideBar)
│   ├── login/                  # Login page objects
│   └── home/                   # Home page objects
├── tests/                      # Test specifications (@smoke)
├── utils/                      # Helpers (logger, OTP, fixtures)
├── docs/                       # Documentation
│   └── dependencies.md         # Dependency explanations
└── .env                        # Environment variables (gitignored)
```

---

## Architecture

**Page Object Model (POM)**
```typescript
export class LoginPage extends BasePage {
  readonly emailInput = this.getByLabel("Email address");
  
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.continueButton.click();
  }
}
```

**Page Manager Pattern**
```typescript
const pm = new PageManager(page);
await pm.onLoginPage().login(email, password);
await pm.onNavSideBar().goToDevices();
```

**Custom Test Fixtures**
```typescript
test("should navigate", async ({ authenticatedPage }) => {
  const pm = authenticatedPage; // Already logged in
  await pm.onNavSideBar().goToLibrary();
});
```

---

## Smoke Test Coverage

**What's Tested** ✅
- Login flow (valid/invalid credentials)
- Dashboard loads after authentication
- Navigation tabs visibility and functionality
- Basic page navigation

**What's NOT Tested** ❌
- CRUD operations
- Edge cases and error handling
- Performance/visual regression
- Mobile flows

**Why?** Smoke tests run fast (<5 min) and catch critical breakages. Comprehensive testing belongs in regression suites.

---

## CI/CD Integration

Tests run automatically via GitHub Actions on push/PR to `main`/`master`.

- **Config**: [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)
- **Artifacts**: Screenshots, videos, traces (30-day retention)
- **Authentication**: Uses saved state (no manual MFA in CI)

---

## Key Technologies

| Technology | Purpose |
|------------|---------|
| **Playwright** | Cross-browser automation |
| **TypeScript** | Type-safe test code |
| **Allure** | Test reporting |
| **dotenv** | Environment variables |
| **otpauth** | Automated MFA |

See [docs/dependencies.md](docs/dependencies.md) for details.

---

## Documentation

For detailed dependency explanations, see **[dependencies.md](docs/dependencies.md)**.

---

## Troubleshooting

**Tests fail with "Target page closed"**
- Increase timeout in `playwright.config.ts`

**MFA not working**
- Verify `OTP_SECRET` format in `.env`

**Allure report not generating**
- Ensure tests ran: `npm run tests`

---

## Contributing

1. Follow existing patterns (POM, PageManager)
2. Add logging with `logger.info()`
3. Tag tests (`@smoke`, `@regression`)
4. Run tests locally before committing

---

**Built with ❤️ using Playwright + TypeScript**