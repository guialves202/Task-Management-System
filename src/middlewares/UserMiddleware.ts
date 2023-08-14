import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';

type registerType = {
  name: string;
  email: string;
  password: string;
};

class UserMiddleware {
  async registerMiddleware(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;

    const errors: string[] = [];

    if (!name) errors.push('Invalid name');
    if (!email) errors.push('Invalid e-mail');
    if (!password) errors.push('Invalid password');

    if (name.length < 3 || name.length > 50) errors.push('Field name must have between 3 and 50 characters');
    if (email.length < 3 || email.length > 50) errors.push('Field e-mail must have between 3 and 50 characters');
    if (password.length < 3 || password.length > 50) errors.push('Field password must have between 3 and 50 characters');

    const user = await UserRepository.findByEmail(email);
    if (user) errors.push('E-mail already in use');

    if (errors.length > 0) {
      req.session.save(() => {
        req.flash('error_msg', errors);
        return res.redirect('/user/register');
      });
    } else {
      const data: registerType = {
        name,
        email,
        password: bcrypt.hashSync(password),
      };
      res.locals.data = data;
      next();
    }
  }

  async loginMiddleware(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const errors: string[] = [];

    if (!email) errors.push('Invalid e-mail');
    if (!password) errors.push('Invalid password');

    if (email.length < 3 || email.length > 50) errors.push('Field e-mail must have between 3 and 50 characters');
    if (password.length < 3 || password.length > 50) errors.push('Field password must have between 3 and 50 characters');

    const user = await UserRepository.findByEmail(email);
    if (!user) errors.push("This account doesn't exist");

    if (user && !bcrypt.compareSync(password, user.password)) errors.push('Invalid password');

    if (errors.length > 0) {
      req.session.save(() => {
        req.flash('error_msg', errors);
        return res.redirect('/user/login');
      });
    } else {
      res.locals.data = user;
      next();
    }
  }
}

export default new UserMiddleware();
