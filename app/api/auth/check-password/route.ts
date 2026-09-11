import { NextResponse } from 'next/server';
import { matchesAdminProfile, readAdminProfile } from '@/lib/admin-profile';

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

  const profile = await readAdminProfile();
  const profileMatches = matchesAdminProfile(profile, { username, password });

  const envMatches =
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD;

  return NextResponse.json({
    ok: profileMatches || envMatches,
    hasProfile: Boolean(profile?.username && profile.passwordHash),
  });
}
