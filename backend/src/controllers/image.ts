import { RequestHandler } from "express";
import vision from "@google-cloud/vision";
import createHttpError from "http-errors";

// Creates a client
const client = new vision.ImageAnnotatorClient();

/*
METHOD: POST
DESC: Sends URL to Vision API for label annotations.
ACCESS: Private
*/

export const postProcessImage: RequestHandler = async (req, res, next) => {
  const { url } = req.body;
  const { id } = res.locals.jwt;
  try {
    if (!url) throw Error("No image file found");

    const [result] = await client.labelDetection(url);
    const labels = result.labelAnnotations;
    console.log("Labels:");
    labels?.forEach((label) => console.log(label.description));
    res.status(200).json(labels);
  } catch (error) {
    console.error(error);
    next(createHttpError(500, "Cannot process image"));
  }
};
