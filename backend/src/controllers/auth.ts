import { RequestHandler } from 'express';
import { prisma } from '../../prisma/client';
import createHttpError from 'http-errors';
import { authentication, random } from '../util/auth';

export const registerUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, 'Missing Fields'));
  }

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: email.toString(),
      },
      select: {
        id: true,
        email: true,
        salt: true,
      },
    });

    if (userExists !== null) {
      return next(createHttpError(400, 'User already exists'));
    }
    const salt = random();

    await prisma.user.create({
      data: {
        email,
        salt,
        hash: authentication(salt, password),
        token: authentication(salt, userExists.id.toString()),
      },
    });

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, 'Missing Fields'));
  }
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: email.toString(),
      },
      select: {
        email: true,
        hash: true,
        salt: true,
        id: true,
        token: true,
      },
    });

    if (userExists === null) {
      return next(createHttpError(404, 'User not found'));
    }

    const expectedHash = authentication(userExists.salt, password);

    if (userExists.hash != expectedHash) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: email.toString(),
      },
      data: {
        token: authentication(userExists.salt, userExists.id.toString()),
      },
    });

    res.cookie(
      'PrismaVision',
      authentication(userExists.salt, userExists.id.toString()),
      {
        domain: 'localhost',
        path: '/',
      }
    );

    return res.status(200).json({
      user: {
        id: userExists.id,
        email: userExists.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
