const { createLogger, format, transports, addColors } = require("winston");

const myCustomColors = {
  colors: {
      error: "red",
      debug: "green",
      info: "yellow"
  }
};

addColors(myCustomColors.colors);

const logger = createLogger({
  
  format: format.combine(
    format.simple(),
    format.colorize(),
    format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: "debug"
    }),
    new transports.File({ 
        level: "info",
        filename: "./logs/SystemOut.log",
        handleExceptions: true,
        maxsize: 5120000,
        maxFiles: 5,
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: "./logs/exceptions-api.log" })
  ]

});

module.exports = logger;
