import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { SessionData, sessionOptions } from '@/lib/session';
import type { SheetData } from '@/lib/sheet';
import { isSheetSource, prepareTab } from '@/lib/sheet-data';
import { sheetSources } from '@/lib/sheet-sources';

export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'private, no-store' };

export async function GET(request: Request) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.isAdmin) return NextResponse.json({ error: 'No autorizado' }, { status: 401, headers });

  const source = new URL(request.url).searchParams.get('source') ?? 'budget';
  if (!isSheetSource(source)) return NextResponse.json({ error: 'Planilla no válida' }, { status: 400, headers });
  const config = sheetSources[source];
  try {
    const tabs = await Promise.all(config.tabs.map(async descriptor => {
      const url = `https://docs.google.com/spreadsheets/d/${config.id}/export?format=csv&gid=${descriptor.gid}`;
      const response = await fetch(url, { cache: 'no-store', redirect: 'follow', signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error(`No se pudo leer «${descriptor.title}» (${response.status}). Revisa el acceso a la planilla.`);
      return prepareTab(await response.text(), response.headers.get('content-type') ?? '', descriptor);
    }));
    const data: SheetData = { source, tabs, sheetUrl: `https://docs.google.com/spreadsheets/d/${config.id}/edit`, fetchedAt: new Date().toISOString() };
    return NextResponse.json(data, { headers });
  } catch (error) {
    const message = error instanceof Error && error.name === 'TimeoutError'
      ? 'Google Sheets tardó demasiado en responder. Vuelve a actualizar.'
      : error instanceof Error ? error.message : 'No se pudo cargar la planilla.';
    return NextResponse.json({ error: message }, { status: 502, headers });
  }
}
