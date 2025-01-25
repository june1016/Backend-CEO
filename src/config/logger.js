import fs from 'fs';
import { format, transports, createLogger } from 'winston';
import envs from './envs.js';

const {
  combine, timestamp, printf
} = format;

if (!fs.existsSync(envs.LOGS_PATH)) {
  fs.mkdirSync(envs.LOGS_PATH, { recursive: true });

  const errorLogFilePath = `${envs.LOGS_PATH}/error.log`;
  const combinedLogFilePath = `${envs.LOGS_PATH}/combined.log`;

  if (!fs.existsSync(errorLogFilePath)) {
    fs.writeFileSync(errorLogFilePath, '');
  }

  if (!fs.existsSync(combinedLogFilePath)) {
    fs.writeFileSync(combinedLogFilePath, '');
  }
}

/**
 * Custom log message format for the Winston logger.
 *
 * This function formats the log entry by including the timestamp,
 * the log level in uppercase, and the log message.
 *
 * @param {Object} logEntry - The log entry object.
 * @param {string} logEntry.level - The log level of the entry (e.g., 'info', 'error').
 * @param {string} logEntry.message - The log message.
 * @param {string} logEntry.timestamp - The timestamp of when the log entry was created.
 * @returns {string} The formatted log message.
 *
 * @author Juan Sebastian Gonzalez Sosssa
 * @date   20-01-2025
 */
const myFormat = printf(({
  level,
  timestamp: time,
  ...rest
}) => `${time} [${level.toUpperCase()}]: ${JSON.stringify(rest)}`);

/**
 * Gets the current date and time in the 'America/Bogota' timezone.
 *
 * @returns {string} The current date and time formatted as a string in the 'en-US' locale.
 *
 * @author Juan Sebastian Gonzalez Sosssa
 * @date   20-01-2025
 */
const timezoned = () => new Date().toLocaleString('en-US', {
  timeZone: 'America/Bogota'
});

/**
 * Creates a logger using the Winston logging library.
 *
 * This snippet initializes the Winston logger, configuring its transports and formats.
 * It enables logging messages at various levels and directs output to the console
 * and log files based on the specified configuration.
 *
 * @returns {Object} logger - The configured Winston logger instance.
 *
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   20-01-2025
 */
const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: timezoned }),
    myFormat
  ),
  transports: [
    new transports.File({
      filename: `${envs.LOGS_PATH}/combined.log`,
      level: 'info'
    }),
    new transports.File({
      filename: `${envs.LOGS_PATH}/error.log`,
      level: 'error'
    })
  ]
});

export default logger;
