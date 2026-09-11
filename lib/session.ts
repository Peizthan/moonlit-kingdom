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

// iron-session defaults ttl (and therefore the cookie's max-age) to 14 days.
// The login session can reasonably expire, but the admin *profile* (the saved
// username/password/recovery-code) must not — otherwise it silently
// disappears after two weeks and looks like the account was "erased".
const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;
const TEN_YEARS_IN_SECONDS = 60 * 60 * 24 * 365 * 10;

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

export const adminProfileOptions: SessionOptions = {
  password: sessionSecret,
  cookieName: 'moonlit-admin-profile',
  ttl: TEN_YEARS_IN_SECONDS,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  },
};

export function hashSecret(value: string) {
  return createHash('sha256').update(value).digest('hex');
}
