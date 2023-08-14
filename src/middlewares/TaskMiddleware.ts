import { NextFunction, Request, Response } from 'express';
import TaskRepository from '../repositories/TaskRepository';

type taskType = {
  title: string;
  description?: string;
  status: string;
  taskId: string;
};

type addTaskType = {
  title: string;
  description: string;
  status: string;
  user_id: string;
};

class TaskMiddleware {
  async findAllTasksMiddleware(req: Request, res: Response, next: NextFunction) {
    res.locals.userId = req.session.user ? req.session.user.id : '';
    next();
  }

  addTaskMiddleware(req: Request, res: Response, next: NextFunction) {
    const { title, description, status } = req.body;

    const errors: string[] = [];

    if (!title) errors.push('Invalid title');
    if (!status) errors.push('Invalid status');

    if (title.length < 3 || title.length > 50) errors.push('Field title must have between 3 and 50 characters');

    const data: addTaskType = {
      title,
      description,
      status,
      user_id: req.session.user ? req.session.user.id : '',
    };

    switch (status) {
      case '1':
        data.status = 'ToDo';
        break;
      case '2':
        data.status = 'Doing';
        break;
      case '3':
        data.status = 'Done';
        break;
      default:
        errors.push('Invalid status');
    }

    if (errors.length > 0) {
      req.session.save(() => {
        req.flash('error_msg', errors);
        return res.redirect('/dashboard');
      });
    } else {
      res.locals.data = data;
      next();
    }
  }

  async editTaskMiddleware(req: Request, res: Response, next: NextFunction) {
    const { title, description, status } = req.body;

    const taskId = req.params.id;

    const errors: string[] = [];

    if (!title) errors.push('Invalid title');
    if (!status) errors.push('Invalid status');
    if (!taskId) errors.push('Invalid task id');

    if (title.length < 3 || title.length > 50) errors.push('Field title must have between 3 and 50 characters');

    const data: taskType = {
      title,
      description,
      status,
      taskId,
    };

    switch (status) {
      case '1':
        data.status = 'ToDo';
        break;
      case '2':
        data.status = 'Doing';
        break;
      case '3':
        data.status = 'Done';
        break;
      default:
        errors.push('Invalid status');
    }

    const taskUser = await TaskRepository.findUserId(data.taskId);

    if (req.session.user && req.session.user.id != taskUser) errors.push("You don't have permission for this");

    if (errors.length > 0) {
      req.session.save(() => {
        req.flash('error_msg', errors);
        return res.redirect('/dashboard');
      });
    } else {
      res.locals.data = data;
      next();
    }
  }

  async deleteTaskMiddleware(req: Request, res: Response, next: NextFunction) {
    const taskId = req.params.id;

    const errors: string[] = [];

    const taskUser = await TaskRepository.findUserId(taskId);

    if (req.session.user && req.session.user.id != taskUser) errors.push("You don't have permission for this");

    if (errors.length > 0) {
      req.session.save(() => {
        req.flash('error_msg', errors);
        return res.redirect('/dashboard');
      });
    } else {
      res.locals.data = taskId;
      next();
    }
  }
}

export default new TaskMiddleware();
