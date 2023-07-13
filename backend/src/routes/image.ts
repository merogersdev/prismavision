import express from 'express';

import { postProcessImage } from '../controllers/image';

const router = express.Router();

router.post('/', postProcessImage);

export default router;
