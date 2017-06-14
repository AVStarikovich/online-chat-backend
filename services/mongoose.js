const mongoose = requier('mongoose');

const appConfig = require('../config');

mongoose.connect(appConfig.mongo.url + appConfig.mongo.port);
module.exports = mongoose.connection;