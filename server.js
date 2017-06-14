let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http, { origins: 'http://localhost:*' });

require('./routes')(app);

io.on('connection', (socket) => {
  console.log('USER:CONNECTED');

  socket.on('disconnect', () => {
    console.log('USER:DISCONNECT', socket);
  });

  socket.on('add-message', (message) => {
    io.emit('new-message', { type: 'new-message', message });
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
