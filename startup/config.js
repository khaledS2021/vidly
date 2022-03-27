const dotenv = require('dotenv');
dotenv.config();

module.exports = function () {
    if (!process.env.TOKEN_SECRET) {
        throw new Error('FATAL ERROR: Token is not defined.')
    }
}