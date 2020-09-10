import express from 'express';
import * as userController from '../../controllers/user';
import auth from '../../middlewares/passport/auth';

const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.get('/logout', auth.authenticated, userController.logout);
router.get('/check', auth.authenticated, userController.checkAuth);
export default router;
