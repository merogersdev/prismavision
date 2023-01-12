// Async Handler
const asyncHandler = require('express-async-handler');

// JWT
const jwt = require('jsonwebtoken');

// Prisma
const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();

// Protect Route Middleware
const protectRoute = asyncHandler(async (req, res, next) => {
  let token;
  const authToken = req.headers.authorization;

  if (authToken && authToken.startsWith('Bearer')) {
    try {
      // Get token
      token = authToken.split(' ')[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get User from token via Prisma Client
      req.user = await user.findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          password: false,
          email: false,
        },
      });

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Unauthorized: Invalid token');
    }
  }

  // If no token is sent, send error
  if (!token) {
    res.status(401);
    throw new Error('Unauthorized: No token');
  }
});

module.exports = { protectRoute };
