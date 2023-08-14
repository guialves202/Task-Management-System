import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';

type registerType = {
  name: string;
  email: string;
  password: string;
};

type userType = {
  id: string;
  name: string;
  email: string;
  password: string;
};

class UserController {
  registerPage(req: Request, res: Response) {
    res.render('layouts/main', { cssPath: '/css/login-register.css', page: '../register.ejs' });
  }

  loginPage(req: Request, res: Response) {
    res.render('layouts/main', { cssPath: '/css/login-register.css', page: '../login.ejs' });
  }

  async register(req: Request, res: Response) {
    const data: registerType = res.locals.data;
    try {
      await UserRepository.create(data);
      return res.redirect('/home');
    } catch (err) {
      if (err instanceof Error) return res.redirect('/404');
    }
  }

  async login(req: Request, res: Response) {
    const user: userType = res.locals.data;
    if (user) {
      req.session.user = user;
      req.session.save(function () {
        return res.redirect('/dashboard');
      });
    }
  }

  logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) console.log(err);
    });
    return res.redirect('/home');
  }
}

export default new UserController();
