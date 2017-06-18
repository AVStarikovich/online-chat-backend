module.exports = io => {
  let commonChatSocket = io.of('/common-chat');
  commonChatSocket.on('connection', socket => {
    console.log('NEW CONNECTION: COMMON CHAT SOCKET');

    socket.on('join-user', (user) => {
      console.log('join-user', user);
      commonChatSocket.emit('join-user', user);
    });

    socket.on('add-message', (message) => {
      console.log('add-message', message);
      commonChatSocket.emit('new-message', message);
    });

    socket.on('remove-message', (message) => {
      console.log('remove-message', message);
      commonChatSocket.emit('remove-message', message);
    });

    socket.on('');

    socket.on('disconnected', () => {
      console.log('DISCONNECT: COMMON CHAT SOCKET');
    });
  });

  return commonChatSocket;
};
