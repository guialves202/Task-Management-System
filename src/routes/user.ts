import { Router } from 'express';
import UserController from '../controllers/UserController';
import checkLoggedMiddleware from '../middlewares/checkLoggedMiddleware';
import UserMiddleware from '../middlewares/UserMiddleware';

const router = Router();

// Log Out
router.post('/logout', UserController.logout);

// Use middleware for just not logged users access this routes
router.use(checkLoggedMiddleware.onlyNotLogged);

// Get Routes
router.get('/register', UserController.registerPage);

router.get('/login', UserController.loginPage);

// Post Routes
router.post('/register', UserMiddleware.registerMiddleware, UserController.register);

router.post('/login', UserMiddleware.loginMiddleware, UserController.login);

export default router;
