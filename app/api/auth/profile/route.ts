import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { AdminProfileData, adminProfileOptions, hashSecret } from '@/lib/session';

export async function GET() {
  const profile = await getIronSession<AdminProfileData>(await cookies(), adminProfileOptions);
  const hasProfile = Boolean(profile.username && profile.passwordHash);

  return NextResponse.json({
    hasProfile,
    username: profile.username ?? null,
    createdAt: profile.createdAt ?? null,
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

  const profile = await getIronSession<AdminProfileData>(await cookies(), adminProfileOptions);
  profile.username = username;
  profile.passwordHash = hashSecret(password);
  profile.recoveryHash = hashSecret(recoveryCode);
  profile.createdAt = profile.createdAt ?? new Date().toISOString();
  await profile.save();

  return NextResponse.json({ ok: true });
}
