import { Status } from '@prisma/client';
import prisma from '../database/prisma';

type taskType = {
  title: string;
  description?: string;
  user_id: string;
  status: string;
};

class TaskRepository {
  async create(data: taskType) {
    const task = await prisma.tasks.create({
      data: {
        title: data.title,
        description: data.description,
        user_id: data.user_id,
        status: data.status as Status,
      },
    });
    return task;
  }

  async findAll(id: string) {
    const tasks = await prisma.tasks.findMany({
      where: {
        user_id: id,
      },
    });
    return tasks;
  }

  async findUserId(taskId: string) {
    const task = await prisma.tasks.findUnique({
      where: {
        id: taskId,
      },
    });
    if (task) return task.user_id;
  }

  async deleteOne(id: string) {
    await prisma.tasks.delete({
      where: {
        id: id,
      },
    });
  }

  async update(data: { title: string; description?: string; status: string; taskId: string }) {
    await prisma.tasks.update({
      where: {
        id: data.taskId,
      },
      data: {
        title: data.title,
        description: data.description,
        status: data.status as Status,
      },
    });
  }
}

export default new TaskRepository();
