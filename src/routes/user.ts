import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.get('/register', UserController.registerPage);

router.get('/login', UserController.loginPage);

router.post('/register', UserController.register);

router.post('/login', UserController.login);

export default router;
