const path = require('path');
const fs = require('fs');
const db = require('../services/mongoose');

fs.readdirSync(path.join(__dirname, './models'))
  .forEach((fileName) => {
    if (fileName === 'index.js') return;
    require(path.join(__dirname, './models', fileName));
  });

module.exports = new Promise((resolve, reject) => {
  db.on('error', (err) => reject(err));

  db.once('open', () => resolve(db));
});
