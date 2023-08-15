import { NextFunction, Request, Response } from 'express';

class checkLoggedMiddleware {
  onlyLogged(req: Request, res: Response, next: NextFunction) {
    if (!req.session.user) {
      req.flash('error_msg', 'You must sign in to access this area');
      return res.redirect('/');
    }
    next();
  }

  onlyNotLogged(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) {
      req.flash('error_msg', 'You are already logged');
      return res.redirect('/dashboard');
    }
    next();
  }
}

export default new checkLoggedMiddleware();
