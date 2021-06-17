const mongoose = require('mongoose');
const config = require('../config.json');

module.exports = mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });