const { createLogger, format, transports, addColors } = require('winston');

const myCustomColors = {
  colors: {
      error: 'red',
      debug: 'green',
      info: 'yellow'
  }
};

addColors(myCustomColors.colors);

const logger = createLogger({
  
  format: format.combine(
    format.simple(),
    format.colorize(),
    format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: "debug"
    }),
    new transports.File({ 
        level: 'error',
        filename: `${__dirname}/../logs/error-api.log`,
        maxsize: 5120000,
        maxFiles: 5,
    }),
    new transports.File({ 
        level: 'info',
        filename: `${__dirname}/../logs/info-api.log`,
        handleExceptions: true,
        maxsize: 5120000,
        maxFiles: 5,
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: `${__dirname}/../logs/exceptions-api.log` })
  ]

});

module.exports = logger;
