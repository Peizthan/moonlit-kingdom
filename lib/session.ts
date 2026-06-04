import { createHash } from 'crypto';
import { SessionOptions } from 'iron-session';

export interface SessionData {
  isAdmin?: boolean;
}

export interface AdminProfileData {
  username?: string;
  passwordHash?: string;
  recoveryHash?: string;
  createdAt?: string;
}

const sessionSecret = process.env.SESSION_SECRET ?? 'moonlit-kingdom-session-secret-2027';

export const sessionOptions: SessionOptions = {
  password: sessionSecret,
  cookieName: 'moonlit-admin',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  },
};

export const adminProfileOptions: SessionOptions = {
  password: sessionSecret,
  cookieName: 'moonlit-admin-profile',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  },
};

export function hashSecret(value: string) {
  return createHash('sha256').update(value).digest('hex');
}
