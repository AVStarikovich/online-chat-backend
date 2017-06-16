module.exports = io => {
  let messageSocket = io.of('/message');
  messageSocket.on('connection', socket => {
    console.log('NEW CONNECTION: MESSAGE SOCKET');

    socket.on('add-message', (message) => {
      console.log('message', message);
      messageSocket.emit('new-message', message);
    });

    socket.on('disconnected', () => {
      console.log('DISCONNECT: MESSAGE SOCKET');
    });
  });

  return messageSocket;
};