import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import checkLoggedMiddleware from '../middlewares/checkLoggedMiddleware';
import TaskMiddleware from '../middlewares/TaskMiddleware';

const router = Router();

router.use(checkLoggedMiddleware.onlyLogged);

router.post('/add', TaskMiddleware.addTaskMiddleware, TaskController.add);

router.post('/edit/:id', TaskMiddleware.editTaskMiddleware, TaskController.update);

router.post('/delete/:id', TaskMiddleware.deleteTaskMiddleware, TaskController.delete);

export default router;
