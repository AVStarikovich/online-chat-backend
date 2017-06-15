const mongoose = require('mongoose');

const appConfig = require('../config');

mongoose.Promise = Promise;

mongoose.connect(appConfig.mongodb.url);

module.exports = mongoose.connection;