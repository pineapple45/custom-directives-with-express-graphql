import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express, { Express, Request, Response, NextFunction } from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schemas';
import rootResolver from './graphql/resolvers';
import mongoose from 'mongoose';
const app: Express = express();

app.use(cors());

// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use('/graphql', (req: Request, res: Response) => {
  return graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true,
    context: { req, res },
  })(req, res);
});

const PORT =
  process.env.NODE_ENV === 'production'
    ? process.env.PORT
    : process.env.PORT_DEV;

const MONGO_URI = process.env.MONGO_URI as string;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connected to mongodb...');
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
