require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
    winston.add(
        new winston.transports.Console({ format: winston.format.simple() }),
    )
    winston.add(new winston.transports.MongoDB({
        db: 'mongodb://localhost/vidly',
        level: 'error',
        options: { useUnifiedTopology: true }
    }));
    winston.add(new winston.transports.File({
        filename: 'logfile.log', 'level': 'info',
    }));
    winston.exceptions.handle(new winston.transports.File(
        { filename: 'uncaughtExceptions.log' },
        new winston.transports.Console({ format: winston.format.simple() })
    ));
}