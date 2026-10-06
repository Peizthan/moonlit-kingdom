import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { SessionData, sessionOptions } from '@/lib/session';
import { clearOverrides, readOverrides, writeOverrides } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

async function isAdmin() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  return session.isAdmin === true;
}

function fail(err: unknown) {
  console.error('[overrides]', err);
  return NextResponse.json({ ok: false, error: 'No se pudo acceder al almacenamiento.' }, { status: 500 });
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    return NextResponse.json({ ok: true, overrides: await readOverrides() });
  } catch (err) {
    return fail(err);
  }
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    const body = (await req.json()) as { changes?: unknown };
    const changes = body.changes;
    if (!changes || typeof changes !== 'object' || Array.isArray(changes)) {
      return NextResponse.json({ ok: false, error: 'Formato inválido.' }, { status: 400 });
    }
    return NextResponse.json({ ok: true, overrides: await writeOverrides(changes as Record<string, unknown>) });
  } catch (err) {
    return fail(err);
  }
}

export async function DELETE() {
  if (!(await isAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    await clearOverrides();
    return NextResponse.json({ ok: true, overrides: {} });
  } catch (err) {
    return fail(err);
  }
}
