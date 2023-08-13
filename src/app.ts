import 'dotenv/config';

import express from 'express';
import { Express } from 'express';
import homeRoutes from './routes/home';
import userRoutes from './routes/user';
import path from 'path';
import cors from 'cors';
import flash from 'connect-flash';
import helmet from 'helmet';
import csrf from 'csurf';
import { Request, Response } from 'express';
import GlobalMiddleware from './middlewares/GlobalMiddleware';
import CsrfMiddleware from './middlewares/CsrfMiddleware';
import session from 'express-session';

class App {
  app: Express;
  constructor() {
    this.app = express();
    this.config();
    this.middlewares();
    this.routes();
  }

  config() {
    const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '..', 'views'));
    this.app.use(express.static(path.join(__dirname, '..', 'public')));
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: SEVEN_DAYS,
          httpOnly: true,
        },
      }),
    );
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(csrf());
    this.app.use(cors());
    this.app.use(flash());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(GlobalMiddleware.localVariables);
    this.app.use(CsrfMiddleware.csrfMiddleware);
    this.app.use(CsrfMiddleware.checkCsrfError);
  }

  routes() {
    this.app.use('/home', homeRoutes);
    this.app.use('/user', userRoutes);
    this.app.get('/404', (req: Request, res: Response) => {
      return res.render('404');
    });
  }
}

export default new App().app;
