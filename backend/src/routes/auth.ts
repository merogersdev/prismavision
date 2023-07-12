import express from 'express';
import extractJWT from '../middleware/extractJWT';

import { registerUser, loginUser } from '../controllers/auth';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);

export default router;
