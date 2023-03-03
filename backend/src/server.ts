import 'dotenv/config';
import pc from 'picocolors';
import express from 'express';
import userRoutes from './routes/user';
import imageRoutes from './routes/image';
import statRoutes from './routes/stat';
import morgan from 'morgan';
import createHttpError from 'http-errors';
import errorHandler from './middleware/errorHandler';
import env from './util/validateEnv';
import cors from 'cors';

const app = express();

// Parse JSON
app.use(express.json());
app.use(cors());

// Log incoming requests in DEV mode
if (env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

// Routes
app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/stats', statRoutes);

// 404 Catch
app.use((_req, _res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

// Error Handler
app.use(errorHandler);

// Listen
app.listen(env.PORT, () => {
  console.log(pc.blue(`> Server listening on port: ${env.PORT}...`));
});
