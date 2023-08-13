import { Request, Response } from 'express';
import UserService from '../services/UserService';

type dataType = {
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
    const { name, email, password } = req.body || {};
    const data: dataType = {
      name,
      email,
      password,
    };
    try {
      const user = await UserService.register(data);
      console.log(user);
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      return res.redirect('/404');
    }
  }

  async login(req: Request, res: Response) {
    return;
  }
}

export default new UserController();
