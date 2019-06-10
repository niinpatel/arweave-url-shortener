import { APP_NAME } from '../config/globals';

export const randomShortUrlString = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('');
};

export const currentUnixTime = () => Math.round(new Date().getTime() / 1000);

export const getAppName = () => {
  if (process.env.NODE_ENV === 'development') {
    return `${APP_NAME}-dev`;
  }
  return APP_NAME;
};
