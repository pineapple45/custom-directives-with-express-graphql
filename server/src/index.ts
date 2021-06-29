import * as dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
const app: Express = express();

const PORT =
  process.env.NODE_ENV === 'production'
    ? process.env.PORT
    : process.env.PORT_DEV;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
