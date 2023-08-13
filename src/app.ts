import 'dotenv/config';

import express from 'express';
import { Express } from 'express';
import homeRoutes from './routes/home';
import path from 'path';
import cors from 'cors';
import flash from 'connect-flash';
import helmet from 'helmet';
import csrf from 'csurf';

class App {
  app: Express;
  constructor() {
    this.app = express();
    this.middlewares();
    this.config();
    this.routes();
  };

  config() {
    // this.app.use(helmet());
    // this.app.use(csrf());
    this.app.use(cors());
    this.app.use(flash());
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '..', 'views'));
    this.app.use(express.static(path.join(__dirname, '..' , 'public')))
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  };

  routes() {
    this.app.use('/home', homeRoutes);
  };
};

export default new App().app;