import path from 'path';
import fs from 'fs';

export default io => {
  fs.readdirSync(path.join(__dirname))
    .forEach((fileName) => {
      if (fileName === 'index.js') return;
      require(path.join(__dirname, fileName))(io);
    });

  return io;
};
