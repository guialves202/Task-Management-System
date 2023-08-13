import { Request, Response, NextFunction } from 'express';

class GlobalMiddleware {
  localVariables(req: Request, res: Response, next: NextFunction) {
    res.locals.error_msg = req.flash('error_msg');
    res.locals.success_msg = req.flash('success_msg');
    next();
  }
}

export default new GlobalMiddleware();
