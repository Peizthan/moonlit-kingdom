import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'crypto';
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

export function hashSecret(value: string) {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(value, salt, 64).toString('hex');
  return `scrypt$${salt}$${derivedKey}`;
}

export function verifySecret(value: string, storedHash?: string) {
  if (!storedHash) {
    return false;
  }

  if (!storedHash.startsWith('scrypt$')) {
    return createHash('sha256').update(value).digest('hex') === storedHash;
  }

  const [, salt, expected] = storedHash.split('$');
  if (!salt || !expected) {
    return false;
  }

  const derivedKey = scryptSync(value, salt, expected.length / 2);

  try {
    return timingSafeEqual(derivedKey, Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}
