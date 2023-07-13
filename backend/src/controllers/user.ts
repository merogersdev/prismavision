import { RequestHandler, Response, NextFunction } from 'express';
import createError from 'http-errors';
import getUsers, { deleteUserById, getUserById } from '../util/user';

import { TokenRequest } from '../types';

// --- Get All Users --- //
const getAllUsers: RequestHandler = async (_req, res, next) => {
  try {
    const users = await getUsers();
    if (users.length === 0) next(createError(404, 'No Users found'));
    return res.status(200).json(users);
  } catch (error) {
    return next(createError(500, 'Failed to get all users'));
  }
};

// --- Get User by ID --- //
export const getUserProfile: RequestHandler = async (
  req: TokenRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await getUserById(+id);
    if (user === null) return next(createError(404, 'User not found'));
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return next(createError(500, 'Failed to get user profile'));
  }
};

// --- Delete User by ID --- //
export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserById(+id);
    if (user === null) return next(createError(404, 'User not found '));
    await deleteUserById(+id);
    return res.status(200);
  } catch (error) {
    return next(createError(500, 'Failed to delete user'));
  }
};

export default getAllUsers;
