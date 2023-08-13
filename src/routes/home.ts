import { Router } from 'express';
import HomeController from '../controllers/HomeController';

const router = Router();

router.get('/', HomeController.index);

router.post('/login', HomeController.login);

router.post('/register', HomeController.register);

export default router;