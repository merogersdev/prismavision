import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../util/env';
import prisma from '../../prisma/client';

const saltRounds: number = 10;

/*
METHOD:   GET
DESC:     Gets all users from DB
ACCESS:   Public
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
    console.error(error);
    next(error);
  }
};

/*
METHOD:   POST
DESC:     Creates new users in DB
ACCESS:   Public
*/

export const postNewUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) throw Error('Email required');
    if (!password) throw Error('Password required');

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
    if (userExists) throw Error('User already exists');

    bcrypt.hash(
      password,
      saltRounds,
      async function (error: unknown, hash: string) {
        if (error) throw Error('Failed to hash password');
        await prisma.user.create({
          data: {
            email,
            password: hash,
          },
        });
        res.status(201).json({ message: 'User Created Successfully' });
      }
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/*
METHOD:    POST
DESC:      Hashes password and creates new user in DB
ACCESS:    Public
*/

export const postLoginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) throw Error('Email required');
    if (!password) throw Error('Password required');
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    if (!userExists) throw Error('User does not exist');
    bcrypt.compare(
      password,
      userExists?.password || '',
      function (err, result) {
        if (err) throw Error('Failed to hash password');
        if (result) {
          res.status(200).json({
            user: {
              email: userExists.email,
              id: userExists.id,
            },
            token: jwt.sign({ id: userExists?.id || '' }, env.JWT_SECRET, {
              expiresIn: '1d',
            }),
          });
        } else {
          res.status(400).json({ error: 'Invalid user credentials' });
        }
      }
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/*
METHOD: GET
DESC: Gets user details
ACCESS: Private
*/

export const getUserDetails: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) throw Error('No user ID found');
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        email: true,
        images: true,
      },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
