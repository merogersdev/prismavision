import { NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import env from '../util/env';

import createError from 'http-errors';

import { TokenRequest, TokenResponse } from '../types';

const isAuthenticated = (
  req: TokenRequest,
  res: TokenResponse,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization;
  const { refreshToken } = req.cookies;

  if (!accessToken) {
    return next(createError(401, 'Access Denied. No Authentication token'));
  }

  if (!refreshToken) {
    return next(createError(401, 'Access Denied. No refresh token'));
  }

  try {
    //! Fix Any - Bad.
    const decoded: any = jwt.verify(accessToken, env.CRYPTO_SECRET);

    req.user = decoded.user;

    const newAccessToken = jwt.sign({ user: decoded.user }, env.CRYPTO_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });
    res.header('Authorization', newAccessToken);
    next();
  } catch (error) {
    return next(createError(400, 'Invalid Tokens'));
  }
};

export const isOwner: RequestHandler = (req, _res, next) => {
  const { id } = req.params;
  const accessToken = req.headers.authorization;

  if (!id) {
    return next(createError(401, 'Access Denied. No User Specified'));
  }

  if (!accessToken) {
    return next(createError(401, 'Access Denied. No Authentication token'));
  }

  try {
    //! Fix Any - Bad
    const decoded: any = jwt.verify(accessToken, env.CRYPTO_SECRET);

    if (decoded.id !== Number(id)) {
      return next(createError(401, 'Access Denied. Not owner'));
    }

    return next();
  } catch (error) {
    return next(createError(400, 'Access Denied'));
  }
};

export default isAuthenticated;
