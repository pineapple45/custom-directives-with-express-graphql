import * as dotenv from 'dotenv';
dotenv.config();

export enum Role {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  AUTH_USER = 'AUTH_USER',
}
export const backendUrl =
  process.env.NODE_ENV === 'production'
    ? (process.env.REACT_APP_BACKEND_URL as string)
    : (process.env.REACT_APP_BACKEND_URL_DEV as string);
