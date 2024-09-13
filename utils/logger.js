const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const path = require('path');

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, 'logs', 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, 'logs', 'combined.log') })
  ]
});

module.exports = logger;