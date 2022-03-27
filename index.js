const winston = require('winston');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validate')();
require('./startup/prod')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    winston.info(`listening to port ${port}`)
})