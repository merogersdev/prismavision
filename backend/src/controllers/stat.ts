import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
METHOD: GET
DESC: Gets total numbers for users and images
ACCESS: Public
*/

export const getStats: RequestHandler = async (_req, res, next) => {
  try {
    const totalUsers = await prisma.user.findMany({});
    const totalImages = await prisma.image.findMany({});
    res.status(200).json({
      stats: {
        users: totalUsers.length,
        images: totalImages.length,
      },
    });
  } catch (error) {
    next(error);
  }
};
