import express from "express";

import { getAllUsers, postLoginUser, postNewUser } from "../controllers/user";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", postNewUser);

router.post("/login", postLoginUser);

export default router;
