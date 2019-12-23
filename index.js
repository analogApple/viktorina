import mongoose from 'mongoose';
import express from 'express';
import socketIo from 'socket.io';
import 'dotenv/config';
import main from './src/sockets/main';
import path from 'path';

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  error => console.log('CONNECTING TO DATABASE ERROR:', error)
);
const app = new express();

const server = app.listen(process.env.PORT || 4000);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const socket = socketIo(server);

main(socket);
