import { Router } from 'express';
import DashboardController from '../controllers/DashboardController';
import TaskMiddleware from '../middlewares/TaskMiddleware';
import checkLoggedMiddleware from '../middlewares/checkLoggedMiddleware';

const router = Router();

router.get('/', checkLoggedMiddleware.onlyLogged, TaskMiddleware.findAllTasksMiddleware, DashboardController.index);

export default router;
