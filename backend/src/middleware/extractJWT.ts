import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import env from "../util/validateEnv";

const extractJWT: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, env.JWT_SECRET, (error, decoded) => {
      if (error) throw Error("Invalid token");
      res.locals.jwt = decoded;
      next();
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default extractJWT;
