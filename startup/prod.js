const hemlet = require('helmet');
const compression = require('compression');

module.exports = function(app){
    app.use(hemlet());
    app.use(compression());
}