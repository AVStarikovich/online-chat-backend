export default {
  server: {
    port: 3000,
    secret: '6b05c699d7c39a74f728785ebcd27142',
  },
  mongodb: {
    url: 'mongodb://localhost/online-chat',
    port: ':27017',
  },
  socket: {
    origins: 'http://localhost:*'
  }
};
