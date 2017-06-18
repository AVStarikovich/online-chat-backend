import * as path from 'path';
import * as fs from 'fs';
import db from '../services/mongoose';

fs.readdirSync(path.join(__dirname))
  .forEach((fileName) => {
    if (fileName === 'index.js') return;
    require(path.join(__dirname, fileName));
  });

export const mongoDataBase = new Promise((resolve, reject) => {
  db.on('error', (err:Error) => reject(err));

  db.once('open', () => {
    console.log('mongoDB is connected');
    resolve(db)
  });
});
