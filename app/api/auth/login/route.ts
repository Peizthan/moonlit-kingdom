import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { createHash, timingSafeEqual } from 'crypto';
import { SessionData, sessionOptions } from '@/lib/session';

function digest(value: string) {
  return createHash('sha256').update(value).digest();
}

export async function POST(req: Request) {
  let password = '';
  try {
    const body = (await req.json()) as { password?: unknown };
    password = typeof body.password === 'string' ? body.password.trim() : '';
  } catch {
    return NextResponse.json({ ok: false, error: 'Solicitud inválida' }, { status: 400 });
  }

  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'ADMIN_PASSWORD no está configurada en el servidor.' },
      { status: 500 },
    );
  }

  if (!password || !timingSafeEqual(digest(password), digest(expected))) {
    return NextResponse.json({ ok: false, error: 'Contraseña incorrecta' }, { status: 401 });
  }

  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.isAdmin = true;
  await session.save();
  return NextResponse.json({ ok: true });
}
