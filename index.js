import mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config';
import main from './src/sockets/main';

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => null
);

const app = new express();

const server = app.listen(4000, () => {});

main(server);
