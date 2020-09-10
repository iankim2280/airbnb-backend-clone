import express from 'express';
import dotenv from 'dotenv';
import middleWares from './middlewares';
import globalRouter from './routes';
import { returnErrorJson, isProduct } from './utils';

dotenv.config();
const app = express();

middleWares(app);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// router
app.use('/', globalRouter); // /login

app.use((err, req, res, next) => {
  // nodejs error handler
  const error = err;
  if (isProduct) {
    error.stack = undefined;
  }
  const statusCode = error.statusCode ? error.statusCode : 400;
  if (error) {
    returnErrorJson(res, statusCode, error);
  }
  next();
});

export default app;
