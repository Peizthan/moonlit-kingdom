import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { AdminProfileData, adminProfileOptions, hashSecret } from '@/lib/session';

export async function POST(req: Request) {
  const body = (await req.json()) as { username?: string; password?: string };
  const username = body.username?.trim();
  const password = body.password?.trim();

  if (!username || !password) {
    return NextResponse.json(
      { ok: false, error: 'Ingresá usuario y contraseña para verificar.' },
      { status: 400 },
    );
  }

  const profile = await getIronSession<AdminProfileData>(await cookies(), adminProfileOptions);
  const profileMatches =
    Boolean(profile.username && profile.passwordHash) &&
    profile.username === username &&
    profile.passwordHash === hashSecret(password);

  const envMatches =
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD;

  return NextResponse.json({
    ok: profileMatches || envMatches,
    hasProfile: Boolean(profile.username && profile.passwordHash),
  });
}
