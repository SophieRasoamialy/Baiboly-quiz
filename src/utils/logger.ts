const LOG_PREFIX = "[BaibolyQuiz]";

const formatMessage = (scope: string, message: string) =>
  `${LOG_PREFIX} [${scope}] ${message}`;

export const logger = {
  info(scope: string, message: string, ...args: unknown[]) {
    console.info(formatMessage(scope, message), ...args);
  },

  warn(scope: string, message: string, ...args: unknown[]) {
    console.warn(formatMessage(scope, message), ...args);
  },

  error(scope: string, message: string, ...args: unknown[]) {
    console.error(formatMessage(scope, message), ...args);
  },
};

