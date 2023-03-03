import express from "express";
import extractJWT from "../middleware/extractJWT";

import { postProcessImage } from "../controllers/image";

const router = express.Router();

router.post("/", postProcessImage);
router.get("/", extractJWT);

export default router;
