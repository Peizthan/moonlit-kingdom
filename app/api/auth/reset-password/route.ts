import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { AdminProfileData, adminProfileOptions, hashSecret } from '@/lib/session';

export async function POST(req: Request) {
  const body = (await req.json()) as {
    username?: string;
    recoveryCode?: string;
    newPassword?: string;
  };

  const username = body.username?.trim();
  const recoveryCode = body.recoveryCode?.trim();
  const newPassword = body.newPassword?.trim();

  if (!username || !recoveryCode || !newPassword) {
    return NextResponse.json(
      { ok: false, error: 'Completá usuario, código de recuperación y nueva contraseña.' },
      { status: 400 },
    );
  }

  const profile = await getIronSession<AdminProfileData>(await cookies(), adminProfileOptions);

  const recoveryMatches =
    Boolean(profile.username && profile.recoveryHash) &&
    profile.username === username &&
    profile.recoveryHash === hashSecret(recoveryCode);

  if (!recoveryMatches) {
    return NextResponse.json(
      { ok: false, error: 'El código de recuperación no coincide.' },
      { status: 401 },
    );
  }

  profile.passwordHash = hashSecret(newPassword);
  profile.createdAt = profile.createdAt ?? new Date().toISOString();
  await profile.save();

  return NextResponse.json({ ok: true });
}
