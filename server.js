const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'http://localhost:*'});

let mongoDataBase = require('./models');

let appConfig = require('./config');

require('./routes')(app);
require('./sockets')(io);

let promise = Promise.resolve()
  .then(() => mongoDataBase)
  .then(() => server.listen(appConfig.server.port, () => {
    console.log(`Listening on ${appConfig.server.port} port`);
  }));

promise.catch(console.error);

