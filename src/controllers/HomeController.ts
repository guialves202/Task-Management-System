import { Request, Response } from 'express';

class HomeController {
  index(req: Request, res: Response) {
    res.render('layouts/main', { cssPath: '/css/home.css', page: '../index.ejs' });
  }
}

export default new HomeController();
