import express from "express";

import {
  getStats
} from "../controllers/stat";

const router = express.Router();

router.get('/', getStats)

export default router;