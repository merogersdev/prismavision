import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import env from "../util/validateEnv";

const saltRounds = 10;
const prisma = new PrismaClient();

/*
METHOD: GET
DESC: Gets all users from DB
ACCESS: Public
*/

export const getAllUsers: RequestHandler = async (_req, res, next) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

/*
METHOD: POST
DESC: Creates new users in DB
ACCESS: Public
*/

export const postNewUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email) throw Error("Email required");
    if (!password) throw Error("Password required");
    bcrypt.hash(
      password,
      saltRounds,
      async function (error: unknown, hash: string) {
        if (error) throw Error("Failed to hash password");
        await prisma.user.create({
          data: {
            email,
            password: hash,
          },
        });
        res.sendStatus(201);
      }
    );
  } catch (error) {
    next(error);
  }
};

/*
METHOD: POST
DESC: Hashes password and creates new user in DB
ACCESS: Public
*/

export const postLoginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email) throw Error("Email required");
    if (!password) throw Error("Password required");

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        images: true,
      },
    });

    if (!userExists) throw Error("User does not exist");

    bcrypt.compare(
      password,
      userExists?.password || "",
      function (err, result) {
        if (err) throw Error("Failed to hash password");
        if (result) {
          const loggedInUser = {
            email,
            token: jwt.sign({ id: userExists?.id || "" }, env.JWT_SECRET, {
              expiresIn: "1d",
            }),
            images: userExists?.images,
          };
          res.status(200).json(loggedInUser);
        } else {
          res.status(400).json({ error: "Invalid user credentials" });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};
