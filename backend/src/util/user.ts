import prisma from '../../prisma/client';
import { hashString, randomString } from './crypto';

const getUsers = () => prisma.user.findMany({
  select: {
    id: false,
    name: true,
    email: true,
    password: false,
    salt: false,
    sessionToken: false,
    createdAt: true,
    updatedAt: false,
  },
});

export const getUserByEmail = (email: string) => prisma.user.findUnique({
  where: { email },
});

// export const getUserBySessionToken = async (sessionToken: string) =>
//   await prisma.user.findUnique({ where: { sessionToken } });

export const getUserById = (id: number) => prisma.user.findUnique({ where: { id } });

export const createUser = (values: {
  email: string;
  name: string;
  password: string;
}) => {
  const salt = randomString();
  return prisma.user.create({
    data: {
      email: values.email,
      name: values.name,
      password: hashString(salt, values.password),
      salt,
      sessionToken: '',
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: false,
      salt: false,
      sessionToken: true,
    },
  });
};

export const deleteUserById = async (id: number) => prisma.user.delete({
  where: {
    id,
  },
});

export const updateUserById = (
  id: number,
  values: {
    [key: string]: string;
  },
) => prisma.user.update({
  where: {
    id,
  },
  data: {
    ...values,
  },
  select: {
    id: true,
    email: true,
    name: true,
    password: false,
    salt: false,
    sessionToken: true,
    createdAt: true,
    updatedAt: true,
  },
});

export default getUsers;
