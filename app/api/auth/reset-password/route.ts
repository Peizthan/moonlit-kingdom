import { NextResponse } from 'next/server';
import { hashSecret } from '@/lib/session';
import { matchesRecoveryCode, readAdminProfile, writeAdminProfile } from '@/lib/admin-profile';

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

  const profile = await readAdminProfile();
  const recoveryMatches = matchesRecoveryCode(profile, { username, recoveryCode });

  if (!recoveryMatches) {
    return NextResponse.json(
      { ok: false, error: 'El código de recuperación no coincide.' },
      { status: 401 },
    );
  }

  await writeAdminProfile({
    username,
    passwordHash: hashSecret(newPassword),
    recoveryHash: profile!.recoveryHash!,
    createdAt: profile!.createdAt ?? new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
