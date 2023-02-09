import express from "express";
import extractJWT from "../middleware/extractJWT";

import {
  getAllUsers,
  postLoginUser,
  postNewUser,
  getUserDetails,
} from "../controllers/user";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", postNewUser);

router.post("/login", postLoginUser);

router.get("/:id", extractJWT, getUserDetails);

export default router;
