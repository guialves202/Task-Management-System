import { Router } from 'express';
import DashboardController from '../controllers/DashboardController';

const router = Router();

router.get('/', DashboardController.index);

export default router;
