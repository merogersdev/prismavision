import { RequestHandler } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, updateUserById } from '../util/user';
import { hashString } from '../util/crypto';
import env from '../util/env';

// --- Log in User --- //
export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (email === undefined || email.length < 6 || !email.includes('@')) {
      return next(createError(400, 'Missing or invalid email'));
    }

    if (password === undefined || password.length < 6) {
      return next(
        createError(400, 'Password must be longer than 6 characters')
      );
    }
    const user = await getUserByEmail(email);
    if (user === null) return next(createError(404, 'User not found'));
    const expectedHash = hashString(user.salt, password);
    if (user.password !== expectedHash)
      return next(createError(401, 'Invalid password'));

    const accessToken = jwt.sign({ id: user.id }, env.CRYPTO_SECRET, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign({ id: user.id }, env.CRYPTO_SECRET, {
      expiresIn: '1d',
    });

    const sessionUser = await updateUserById(user.id, {
      sessionToken: refreshToken,
    });

    const userData = {
      id: sessionUser.id,
      name: sessionUser.name,
      email: sessionUser.email,
    };

    res.header('Authorization', accessToken);

    res.cookie('refreshToken', refreshToken, {
      secure: env.NODE_ENV !== 'development',
      httpOnly: true,
      sameSite: 'strict',
    });

    return res.status(200).json({ user: userData });
  } catch (error) {
    console.log(error);
    return next(createError(500, 'Failed to log in user'));
  }
};

// --- Register User --- //
export const registerUser: RequestHandler = async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    if (email === undefined || email.length < 6 || !email.includes('@')) {
      return next(createError(400, 'Missing or invalid email'));
    }

    if (name === undefined || name.length < 1)
      return next(createError(400, 'Name must be longer than 1 character'));

    if (password === undefined || password.length < 6) {
      return next(
        createError(400, 'Password must be longer than 6 characters')
      );
    }
    const newUser = await createUser({ email, name, password });

    return res.status(200).json({ newUser });
  } catch (error) {
    console.log(error);
    return next(createError(500, 'Failed to register user'));
  }
};

// --- Refresh Token --- //

export const refresh: RequestHandler = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(createError(401, 'Access denied. No refresh token'));
  }

  try {
    //! Any - Bad
    const decoded: any = jwt.verify(refreshToken, process.env.SECRET);
    const accessToken = jwt.sign({ user: decoded.id }, process.env.SECRET, {
      expiresIn: '1h',
    });

    res.header('Authorization', accessToken).send(decoded.id);
  } catch (error) {
    return next(createError(400, 'Invalid refresh token'));
  }
};
