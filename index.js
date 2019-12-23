import Mongoose from 'mongoose';
import Express from 'express';
import socketIo from 'socket.io';
import 'dotenv/config';
import main from './src/sockets/main';

Mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  error => console.log('CONNECTING TO DATABASE ERROR:', error)
);

const app = new Express();

const server = app.listen(4000);

const socket = socketIo(server);

main(socket);
