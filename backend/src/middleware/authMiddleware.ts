import jwt, { JwtPayload } from "jsonwebtoken";
import { RequestHandler, Request } from "express";
import { PrismaClient } from "@prisma/client";
import env from "../util/validateEnv";
import createHttpError from "http-errors";

const prisma = new PrismaClient();

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw Error("No Token");

    const decoded = jwt.verify(token, env.JWT_SECRET);
    (req as CustomRequest).token = decoded;

    const userExists = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        password: false,
        email: false,
      },
    });

    if (userExists) {
      next();
    } else {
      throw Error("Invalid Token");
    }
  } catch (err) {
    next(createHttpError(401, "Unauthorized"));
  }
};
