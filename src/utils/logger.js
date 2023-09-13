const { createLogger, format, transports, addColors } = require('winston');

const logger = createLogger({
  
  format: format.combine(
    format.simple(),
    format.colorize(),
    format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),
  transports: [
    new transports.File({ 
        level: 'error',
        maxsize: 5120000,
        maxFiles: 5,
        filename: `${__dirname}/../logs/error-api.log`
    }),
    new transports.File({ 
        level: 'info',
        maxsize: 5120000,
        maxFiles: 5,
        filename: `${__dirname}/../logs/info-api.log`
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: `${__dirname}/../logs/exceptions-api.log` })
  ]

});

const myCustomColors = {
    colors: {
        error: 'red',
        debug: 'green',
        info: 'yellow'
    }
};

addColors(myCustomColors.colors);

module.exports = logger;
