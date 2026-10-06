import { SessionOptions } from 'iron-session';

export interface SessionData {
  isAdmin?: boolean;
}

const sessionSecret = process.env.SESSION_SECRET ?? 'moonlit-kingdom-session-secret-2027';

const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;

export const sessionOptions: SessionOptions = {
  password: sessionSecret,
  cookieName: 'moonlit-admin',
  ttl: THIRTY_DAYS_IN_SECONDS,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  },
};
