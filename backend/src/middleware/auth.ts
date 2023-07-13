import { NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import env from '../util/env';
import { TokenRequest, TokenResponse } from '../types';

const isAuthenticated = (req: TokenRequest, res: TokenResponse, next: NextFunction) => {
  const accessToken = req.headers.authorization;
  const { refreshToken } = req.cookies;

  if (!accessToken) {
    return next(createError(401, 'Access Denied. No Authentication token'));
  }

  if (!refreshToken) {
    return next(createError(401, 'Access Denied. No refresh token'));
  }

  try {
    const decoded = jwt.verify(accessToken, env.CRYPTO_SECRET) as jwt.JwtPayload;

    req.user = decoded.id;

    const newAccessToken = jwt.sign({ user: decoded.id }, env.CRYPTO_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });
    res.header('Authorization', newAccessToken);
    return next();
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
    const decoded = jwt.verify(accessToken, env.CRYPTO_SECRET) as jwt.JwtPayload;

    if (decoded.id !== Number(id)) {
      return next(createError(401, 'Access Denied. Not owner'));
    }

    return next();
  } catch (error) {
    return next(createError(400, 'Access Denied'));
  }
};

export default isAuthenticated;
