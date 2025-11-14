# Dependency Explanations for kandji-iru-app-playwright

This document explains the purpose of each development dependency listed in `package.json`.

## DevDependencies

- **@playwright/test**: Playwright test runner for end-to-end testing  
  Install: `npm install --save-dev @playwright/test`

- **@types/node**: TypeScript type definitions for Node.js  
  Install: `npm install --save-dev @types/node`

- **allure-playwright**: Allure reporting integration for Playwright  
  Install: `npm install --save-dev allure-playwright`  

- **allure-js-commons**:: Core library for Allure reporting, required by Allure integrations
  Install: `npm install --save-dev allure-js-commons`  

- **@faker-js/faker**: Generates fake data for testing  
  Install: `npm install --save-dev @faker-js/faker`

- **dotenv**: Loads environment variables from .env files  
  Install: `npm install --save-dev dotenv`

- **otpauth**: Generates TOTP (Time-based One-Time Password) codes for MFA automation  
  Install: `npm install --save-dev otpauth`

---

If you add or remove dependencies, please update this file to keep documentation current.
