import { CorsOptions } from 'cors';

export const allowedOrigins = ['http://localhost:5000'];

const options: CorsOptions = {
  origin: allowedOrigins,
};

export default options;
