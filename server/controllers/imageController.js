// Async Handler
const asyncHandler = require('express-async-handler');

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Prisma
const { PrismaClient } = require('@prisma/client');
const { image } = new PrismaClient();

const postNewImage = asyncHandler(async (req, res) => {
  const { file } = req.body;
  const { id } = req.user;

  if (!file) {
    res.status(400);
    throw new Error('No images specified');
  }

  if (!id) {
    res.status(400);
    throw new Error('No user specified');
  }

  const [result] = await client.labelDetection(file);

  if (!result) {
    res.status(400);
    throw new Error('Failed to get image details');
  }

  // Get description and likelyhood score from top result
  const { description, score } = result.labelAnnotations[0];
  const percentage = Math.round(score * 100);

  // Create
  const newImage = await image.create({
    data: {
      user_id: id,
      description,
      percentage,
    },
  });

  // Return error if image details could not be added to DB
  if (!newImage) {
    res.status(400);
    throw new Error('Could not save image details to database');
  }

  res.json(newImage);
});

module.exports = {
  postNewImage,
};
