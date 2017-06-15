let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server, { origins: 'http://localhost:*' });

let appConfig = require('./config');

let mongoDataBase = require('./models');

// let User = require('./models/user');

require('./routes')(app);

// console.log(User.addUser('111', '111'));

io.on('connection', (socket) => {
  console.log('USER:CONNECTED');

  socket.on('disconnect', () => {
    console.log('USER:DISCONNECT', socket);
  });

  socket.on('add-message', (message) => {
    io.emit('new-message', { type: 'new-message', message });
  });
});

let promise = mongoDataBase
  .then(() => {
    console.log('Database is connected.');
    return server.listen(appConfig.server.port, () => {
      console.log(`Listening on ${appConfig.server.port} port...`);
    })
  });

promise
  .catch(err => {
    console.error(err);
    throw err
  });

