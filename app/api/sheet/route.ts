import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { SessionData, sessionOptions } from '@/lib/session';
import { SHEET_ID, SHEET_URL, SheetData, SheetTab } from '@/lib/sheet';

export const dynamic = 'force-dynamic';

const csvUrl = (gid: string) =>
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;

// RFC 4180 parser: handles quoted cells containing commas, quotes and line breaks.
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuote = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuote) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') {
        inQuote = false;
      } else {
        cell += c;
      }
    } else if (c === '"') {
      inQuote = true;
    } else if (c === ',') {
      row.push(cell);
      cell = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += c;
    }
  }
  if (cell !== '' || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

// Drops empty edges and collapses runs of blank rows into a single spacer row.
function tidy(rows: string[][]): string[][] {
  const trimmed = rows.map((r) => r.map((c) => c.trim()));
  const width = trimmed.reduce((w, r) => {
    const last = r.reduce((l, c, i) => (c ? i + 1 : l), 0);
    return Math.max(w, last);
  }, 0);

  const out: string[][] = [];
  for (const r of trimmed) {
    const cells = Array.from({ length: width }, (_, i) => r[i] ?? '');
    const blank = cells.every((c) => !c);
    if (blank && (out.length === 0 || out[out.length - 1].every((c) => !c))) continue;
    out.push(cells);
  }
  while (out.length && out[out.length - 1].every((c) => !c)) out.pop();
  return out;
}

// The public CSV export has no tab list, so read it from the editor page.
async function discoverTabs(): Promise<{ gid: string; title: string }[]> {
  const res = await fetch(SHEET_URL, { cache: 'no-store', redirect: 'follow' });
  if (!res.ok) throw new Error(`Google Sheets devolvió ${res.status}`);
  const html = await res.text();

  const found = new Map<string, string>();
  const re = /\[(\d+),0,\\"(\d+)\\",\[\{\\"1\\":\[\[0,0,\\"((?:[^"\\]|\\\\.)*?)\\"/g;
  for (const m of html.matchAll(re)) {
    const title = m[3].replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
    found.set(m[2], title.trim());
  }
  if (found.size === 0) throw new Error('No se pudieron detectar las hojas de la planilla');
  return [...found].map(([gid, title]) => ({ gid, title }));
}

export async function GET() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.isAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const descriptors = await discoverTabs();

    const tabs: SheetTab[] = await Promise.all(
      descriptors.map(async ({ gid, title }) => {
        const res = await fetch(csvUrl(gid), { cache: 'no-store', redirect: 'follow' });
        if (!res.ok) throw new Error(`No se pudo leer la hoja "${title}" (${res.status})`);
        return { gid, title, rows: tidy(parseCSV(await res.text())) };
      }),
    );

    const data: SheetData = { tabs, sheetUrl: SHEET_URL, fetchedAt: new Date().toISOString() };
    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error desconocido' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
