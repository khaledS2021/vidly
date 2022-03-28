const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect(process.env.db)
        .then(() => { winston.info('Connected to MongoDB server...') })
}
