import * as dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import mongoose from 'mongoose';
const app: Express = express();

const PORT =
  process.env.NODE_ENV === 'production'
    ? process.env.PORT
    : process.env.PORT_DEV;

const MONGO_URI = process.env.MONGO_URI as string;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to mongodb...');
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
