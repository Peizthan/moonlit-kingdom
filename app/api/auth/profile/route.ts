import { NextResponse } from 'next/server';
import { hashSecret } from '@/lib/session';
import { readAdminProfile, writeAdminProfile } from '@/lib/admin-profile';

export async function GET() {
  const profile = await readAdminProfile();
  const hasProfile = Boolean(profile?.username && profile.passwordHash);

  return NextResponse.json({
    hasProfile,
    username: profile?.username ?? null,
    createdAt: profile?.createdAt ?? null,
  });
}

export async function POST(req: Request) {
  const body = (await req.json()) as {
    username?: string;
    password?: string;
    recoveryCode?: string;
  };

  const username = body.username?.trim();
  const password = body.password?.trim();
  const recoveryCode = body.recoveryCode?.trim();

  if (!username || !password || !recoveryCode) {
    return NextResponse.json(
      { ok: false, error: 'Completá usuario, contraseña y código de recuperación.' },
      { status: 400 },
    );
  }

  const existingProfile = await readAdminProfile();
  await writeAdminProfile({
    username,
    passwordHash: hashSecret(password),
    recoveryHash: hashSecret(recoveryCode),
    createdAt: existingProfile?.createdAt ?? new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
