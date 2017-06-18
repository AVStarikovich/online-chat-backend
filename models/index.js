import path from 'path';
import fs from 'fs';
import db from '../services/mongoose';

fs.readdirSync(path.join(__dirname))
  .forEach((fileName) => {
    if (fileName === 'index.js') return;
    require(path.join(__dirname, fileName));
  });

export default new Promise((resolve, reject) => {
  db.on('error', (err) => reject(err));

  db.once('open', () => {
    console.log('mongoDB is connected');
    resolve(db)
  });
});
