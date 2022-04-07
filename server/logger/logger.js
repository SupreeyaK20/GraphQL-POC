const { createLogger, transports, format } = require("winston");

const myFormat = (level, message, timestamp) => {
  return ` ${level} ${message} ${timestamp}`;
};

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "logger.log",
      level: "info",
      format: format.combine(
        format.timestamp({ format: "hh-mm-ss" }, myFormat),
        format.json()
      ),
    }),
    new transports.File({
      filename: "logger.error.log",
      level: "error",
      format: format.combine(
        format.timestamp({ format: "hh-mm-ss" }, myFormat),
        format.json()
      ),
    }),
  ],
});

module.exports = logger;
