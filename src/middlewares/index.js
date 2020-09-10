import helmet from 'helmet';
import logger from 'morgan';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './db';

import './passport';

export default app => {
  db();

  app.use(passport.initialize());
  app.use(helmet());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
};
