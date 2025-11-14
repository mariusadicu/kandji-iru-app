// utilities/common/date-time-utils.ts

/**
 * Returns today's date formatted as 'yyyy-MM-dd'.
 */
export function getTodayDate(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Formats a Date object as 'MM/DD/YYYY' (US format).
 */
export function formatDateUS(date: Date): string {
  return date.toLocaleDateString("en-US");
}
