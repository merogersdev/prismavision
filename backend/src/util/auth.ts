import crypto from 'crypto';
import env from './env';

export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(env.CRYPTO_SECRET)
    .digest('hex');
};

export const random = () => crypto.randomBytes(128).toString('base64');
