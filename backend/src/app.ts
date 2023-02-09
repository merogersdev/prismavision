import express from "express";
import userRoutes from "./routes/user";
import imageRoutes from "./routes/image";
import morgan from "morgan";
import createHttpError from "http-errors";

import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

// async function main() {
//   const allUsers = await prisma.user.findMany();
//   console.log(allUsers);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// Routes
app.use("/api/users", userRoutes);
app.use("/api/images", imageRoutes);

// 404 Catch
app.use((_req, _res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// Error Handler
app.use(errorHandler);

export default app;
