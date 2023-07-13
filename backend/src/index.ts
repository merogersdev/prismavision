import 'dotenv/config';
import pc from 'picocolors';
import express from 'express';
import morgan from 'morgan';
import createHttpError from 'http-errors';
import errorHandler from './middleware/error';
import env from './util/env';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import options from './util/cors';

import indexRouter from './routes/';

const app = express();

// Primary Middleware
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(cors(options));

// Log incoming requests in DEV mode
if (env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

// Index Router
app.use('/api/v1/', indexRouter);

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
