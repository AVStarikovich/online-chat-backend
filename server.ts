import { express } from 'express';
import http from 'http';
import socket from 'socket.io';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import { mongoDataBase } from './models';
import routing from './routes';
import socketing from './sockets';

import config from './config';

const app = express();
const server = http.Server(app);
const io = socket(server, { origins: config.socket.origins});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

routing(app);
socketing(io);

app.use((req, res, next) => {
  if (req.dataOut) {
    return res.status(200).send({ success: true, data: req.dataOut });
  }
  next();
}); // data out catcher

app.use((error, req, res, next) => {
  if (error) {
    console.error(error);
    return res.status(500).send({ success: false, error })
  }
}); // error catcher

app.use((req, res, next) => {
  res.status(404).send({ success: false, error: 'Route not found' })
}); // 404 catcher

let serverPromise = Promise.resolve()
  .then(() => mongoDataBase)
  .then(() => server.listen(config.server.port, () => {
    console.log(`Listening on ${config.server.port} port`);
  }));

serverPromise.catch(console.error);

