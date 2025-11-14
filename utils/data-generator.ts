import { faker } from "@faker-js/faker";

/**
 * Data generator utility functions for creating realistic test data
 * Uses faker.js to generate consistent, realistic test data
 */

/**
 * Generate a random first name
 * @returns {string} A random first name
 */
export function generateFirstName(): string {
  return faker.person.firstName();
}

/**
 * Generate a random last name
 * @returns {string} A random last name
 */
export function generateLastName(): string {
  return faker.person.lastName();
}

/**
 * Generate a full name (first + last)
 * @returns {object} Object with firstName and lastName properties
 */
export function generateFullName(): { firstName: string; lastName: string } {
  return {
    firstName: generateFirstName(),
    lastName: generateLastName(),
  };
}

/**
 * Generate a random phone number in US format
 * @returns {string} A phone number like "(555) 123-4567"
 */
export function generatePhone(): string {
  return faker.phone.number({ style: "national" });
}

/**
 * Generate a realistic email address
 * @param firstName - Optional first name to use in email
 * @param lastName - Optional last name to use in email
 * @returns {string} An email address
 */
export function generateEmail(firstName?: string, lastName?: string): string {
  if (firstName && lastName) {
    // Create email from provided names
    const cleanFirst = firstName.toLowerCase().replace(/[^a-z]/g, "");
    const cleanLast = lastName.toLowerCase().replace(/[^a-z]/g, "");
    return `${cleanFirst}.${cleanLast}@test.com`;
  }
  return faker.internet.email();
}

/**
 * Generate a random street address
 * @returns {string} A street address
 */
export function generateAddress(): string {
  return faker.location.streetAddress();
}

/**
 * Generate a random city
 * @returns {string} A city name
 */
export function generateCity(): string {
  return faker.location.city();
}

/**
 * Generate a random state abbreviation
 * @returns {string} A 2-letter state code
 */
export function generateState(): string {
  return faker.location.state({ abbreviated: true });
}

/**
 * Generate a random ZIP code
 * @returns {string} A 5-digit ZIP code
 */
export function generateZipCode(): string {
  return faker.location.zipCode();
}
