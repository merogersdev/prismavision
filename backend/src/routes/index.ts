import express from 'express';
import authRouter from './auth';
import userRouter from './user';
import imageRouter from './image';
import isAuthenticated from '../middleware/auth';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/image', imageRouter);
router.use('/user', isAuthenticated, userRouter);

export default router;
