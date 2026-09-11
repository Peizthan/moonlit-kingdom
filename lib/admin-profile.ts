import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { AdminProfileData, hashSecret } from '@/lib/session';

const adminProfilePath = path.join(process.cwd(), 'data', 'admin-profile.json');

export async function readAdminProfile(): Promise<AdminProfileData | null> {
  try {
    const raw = await readFile(adminProfilePath, 'utf8');
    const parsed = JSON.parse(raw) as AdminProfileData;

    if (!parsed.username || !parsed.passwordHash || !parsed.recoveryHash) {
      return null;
    }

    return parsed;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

export async function writeAdminProfile(profile: Required<Pick<AdminProfileData, 'username' | 'passwordHash' | 'recoveryHash'>> & Pick<AdminProfileData, 'createdAt'>) {
  await mkdir(path.dirname(adminProfilePath), { recursive: true });
  await writeFile(adminProfilePath, JSON.stringify(profile, null, 2), 'utf8');
}

export function matchesAdminProfile(
  profile: AdminProfileData | null,
  credentials: { username?: string; password?: string },
) {
  if (!profile?.username || !profile.passwordHash || !credentials.username || !credentials.password) {
    return false;
  }

  return profile.username === credentials.username && profile.passwordHash === hashSecret(credentials.password);
}

export function matchesRecoveryCode(
  profile: AdminProfileData | null,
  credentials: { username?: string; recoveryCode?: string },
) {
  if (!profile?.username || !profile.recoveryHash || !credentials.username || !credentials.recoveryCode) {
    return false;
  }

  return profile.username === credentials.username && profile.recoveryHash === hashSecret(credentials.recoveryCode);
}
