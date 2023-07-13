import { RequestHandler } from 'express';
import vision from '@google-cloud/vision';

// Creates a client
const client = new vision.ImageAnnotatorClient();

/*
METHOD:   POST
DESC:     Sends URL to Vision API for label annotations.
ACCESS:   Private
*/

const postProcessImage: RequestHandler = async (req, res, next) => {
  const { url } = req.body;
  try {
    if (!url) throw Error('No image file found');
    const [result] = await client.labelDetection(url);
    const labels = result.labelAnnotations;
    res.status(200).json(labels);
  } catch (error) {
    next(error);
  }
};

export default postProcessImage;
