import { cleanEnv, port, str } from 'envalid';

export default cleanEnv(process.env, {
  DATABASE_URL: str(),
  CLIENT_URL: str(),
  PORT: port(),
  JWT_SECRET: str(),
  CRYPTO_SECRET: str(),
  // GOOGLE_APPLICATION_CREDENTIALS: str(),
  NODE_ENV: str({ choices: ['development', 'production'] }),
});
