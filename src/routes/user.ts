import { Router } from 'express';
import UserController from '../controllers/UserController';
import checkLoggedMiddleware from '../middlewares/checkLoggedMiddleware';

const router = Router();

router.post('/logout', UserController.logout);

router.use(checkLoggedMiddleware.onlyNotLogged);

router.get('/register', UserController.registerPage);

router.get('/login', UserController.loginPage);

router.post('/register', UserController.register);

router.post('/login', UserController.login);

export default router;
