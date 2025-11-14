export type LogLevel = "debug" | "info" | "warn" | "error" | "none";

let currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || "info";

const levels = { debug: 0, info: 1, warn: 2, error: 3, none: 4 };

export const logger = {
  setLevel(level: LogLevel) {
    currentLevel = level;
  },
  debug(...args: any[]) {
    if (levels[currentLevel] <= levels.debug) console.debug("[DEBUG]", ...args);
  },
  info(...args: any[]) {
    if (levels[currentLevel] <= levels.info) console.info("[INFO]", ...args);
  },
  warn(...args: any[]) {
    if (levels[currentLevel] <= levels.warn) console.warn("[WARN]", ...args);
  },
  error(...args: any[]) {
    if (levels[currentLevel] <= levels.error) console.error("[ERROR]", ...args);
  },
  logExpectedActual(label: string, expected: any, actual: any) {
    logger.info(`${label} - Expected: ${expected}, Actual: ${actual}`);
  },
};
