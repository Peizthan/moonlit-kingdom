import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { AdminProfileData, SessionData, adminProfileOptions, hashSecret, sessionOptions } from '@/lib/session';

export async function POST(req: Request) {
  const body = await req.json() as { username?: string; password?: string };
  const username = body.username?.trim();
  const password = body.password?.trim();

  const profile = await getIronSession<AdminProfileData>(await cookies(), adminProfileOptions);
  const hasProfile = Boolean(profile.username && profile.passwordHash);

  const profileMatches =
    hasProfile &&
    profile.username === username &&
    profile.passwordHash === hashSecret(password ?? '');

  const envMatches =
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD;

  if (profileMatches || envMatches) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    session.isAdmin = true;
    await session.save();
    return NextResponse.json({ ok: true });
  }

  if (!hasProfile) {
    return NextResponse.json(
      { ok: false, error: 'No hay perfil admin todavía. Crealo primero con el botón correspondiente.' },
      { status: 401 },
    );
  }

  return NextResponse.json(
    { ok: false, error: 'Credenciales incorrectas' },
    { status: 401 },
  );
}
