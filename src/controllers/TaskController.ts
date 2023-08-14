import { Request, Response } from 'express';
import TaskRepository from '../repositories/TaskRepository';

type taskType = {
  title: string;
  description?: string;
  status: string;
  user_id: string;
};

class TaskController {
  async add(req: Request, res: Response) {
    const data: taskType = res.locals.data;

    try {
      await TaskRepository.create(data);
      return res.redirect('/dashboard');
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      return res.redirect('/404');
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const tasks = await TaskRepository.findAll(res.locals.userId);
      return tasks;
    } catch (err) {
      if (err instanceof Error) return res.redirect('/404');
    }
  }

  async update(req: Request, res: Response) {
    const data: {
      title: string;
      description?: string;
      status: string;
      taskId: string;
    } = res.locals.data;
    try {
      await TaskRepository.update(data);
      return res.redirect('/dashboard');
    } catch (err) {
      if (err instanceof Error) return res.redirect('/404');
    }
  }

  async delete(req: Request, res: Response) {
    const taskId = res.locals.data;

    try {
      await TaskRepository.deleteOne(taskId);
      return res.redirect('/dashboard');
    } catch (err) {
      if (err instanceof Error) return res.redirect('/404');
    }
  }
}

export default new TaskController();
