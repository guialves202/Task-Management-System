import { Request, Response } from 'express';
import TaskRepository from '../repositories/TaskRepository';

class DashboardController {
  async index(req: Request, res: Response) {
    if (req.session.user) {
      const tasks = await TaskRepository.findAll(req.session.user.id);

      const colorMode = req.session.colorMode ? req.session.colorMode : 'light-mode';
      res.render('layouts/main', { cssPath: '/css/dashboard.css', page: '../dashboard.ejs', tasks: tasks, colorMode: colorMode });
    }
  }
}

export default new DashboardController();
