import { Request, Response } from 'express';

class DashboardController {
  index(req: Request, res: Response) {
    res.render('layouts/main', { cssPath: '/css/dashboard.css', page: '../dashboard.ejs' });
  }
}

export default new DashboardController();
