const winston = require('winston');
const expressWinston = require('express-winston');

module.exports = {
  log: expressWinston.logger({
    transports: [
      new winston.transports.File({
        filename: 'infolog.log'
      })
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  }),
  error: expressWinston.errorLogger({
    transports: [
      new winston.transports.File({
        filename: 'error.log'
      })
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  })
};