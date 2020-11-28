import { createLoggerConfig } from '../utils/logger-settings';
import winston from 'winston';

export function log(...p: unknown[]): void {
  console.log(...p);
}

export const createLogger = (name: string) => {
  const options = createLoggerConfig();

  const logger = winston.createLogger({
    transports: options.transports,
    format: options.format,
    defaultMeta: {
      name,
    },
  });

  return logger;
};
