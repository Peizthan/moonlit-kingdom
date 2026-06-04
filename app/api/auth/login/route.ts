import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { SessionData, sessionOptions } from '@/lib/session';

export async function POST(req: Request) {
  const body = await req.json() as { username?: string; password?: string };

  if (
    body.username === process.env.ADMIN_USER &&
    body.password === process.env.ADMIN_PASSWORD
  ) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    session.isAdmin = true;
    await session.save();
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { ok: false, error: 'Credenciales incorrectas' },
    { status: 401 },
  );
}
