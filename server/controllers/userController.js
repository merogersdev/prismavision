// Async Handler
const asyncHandler = require('express-async-handler');

// Bcrypt
const bcrypt = require('bcrypt');

// JWT
const jwt = require('jsonwebtoken');

// Prisma
const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();

// --- Login User | Public --- //
const postLoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Error: Missing fields');
  }

  const userExists = await user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      id: true,
      password: true,
      images: true,
    },
  });

  if (!userExists) {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  const match = await bcrypt.compare(password, userExists.password);

  console.log(match);

  if (match) {
    res.status(200).json({
      user: {
        email: userExists.email,
        token: jwt.sign({ id: userExists.id }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        }),
        images: userExists.images,
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid password');
  }
});

// --- Register User | Public --- //
const postRegisterUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Missing fields');
  }

  const userExists = await user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
    },
  });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const newUser = await user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10),
    },
    select: {
      email: true,
      id: false,
      password: false,
    },
  });

  if (newUser) {
    res.status(201).json({
      user: {
        email: newUser.email,
        token: jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        }),
      },
    });
  } else {
    res.status(400);
    throw new Error('Cannot create user: invalid data');
  }
});

// --- Get All Users | Public --- //
const getAllUsers = asyncHandler(async (_req, res) => {
  const users = await user.findMany({
    select: {
      email: true,
      images: true,
    },
  });

  if (users) {
    res.status(200).json({ users });
  } else {
    res.status(400);
    throw new Error('Could not get users');
  }
});

module.exports = { postRegisterUser, getAllUsers, postLoginUser };
