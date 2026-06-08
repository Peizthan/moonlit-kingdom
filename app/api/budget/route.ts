import { NextResponse } from 'next/server';
import { BudgetCategory } from '@/lib/types';

const SHEET_ID = '19oh3G4ShAIgGQdotny-xmqVFFDqWB4RfuIc-qOM0gaE';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

// Column name aliases (normalized: lowercase, no accents/spaces)
const COL_MAP: Record<string, keyof BudgetCategory | '_skip'> = {
  categoria:      'category',
  category:       'category',
  subcategoria:   'subcategory',
  subcategory:    'subcategory',
  item:           'subcategory',
  proveedor:      'vendor',
  vendor:         'vendor',
  empresa:        'vendor',
  estimado:       'estimated',
  estimated:      'estimated',
  presupuesto:    'estimated',
  real:           'actual',
  actual:         'actual',
  sena:           'deposit',
  seña:           'deposit',
  deposito:       'deposit',
  depósito:       'deposit',
  deposit:        'deposit',
  senapagada:     'depositPaid',
  señapagada:     'depositPaid',
  depositpaid:    'depositPaid',
  depositopagado: 'depositPaid',
  estado:         'status',
  status:         'status',
  notas:          'notes',
  notes:          'notes',
};

function normalizeHeader(h: string): string {
  return h
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/\s+/g, '')             // strip spaces
    .replace(/[^a-z0-9]/g, '');      // strip non-alphanumeric
}

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const cols: string[] = [];
    let inQuote = false;
    let cell = '';
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQuote && line[i + 1] === '"') { cell += '"'; i++; }
        else { inQuote = !inQuote; }
      } else if (c === ',' && !inQuote) {
        cols.push(cell);
        cell = '';
      } else {
        cell += c;
      }
    }
    cols.push(cell);
    rows.push(cols);
  }
  return rows;
}

function normalizeStatus(raw: string): BudgetCategory['status'] {
  const s = raw.toLowerCase().trim();
  if (s === 'confirmed' || s === 'confirmado') return 'confirmed';
  if (s === 'paid' || s === 'pagado')           return 'paid';
  if (s === 'enquiry' || s === 'consulta')      return 'enquiry';
  return 'pending';
}

function parseBool(raw: string): boolean {
  const s = raw.toLowerCase().trim();
  return s === 'true' || s === 'si' || s === 'sí' || s === 'yes' || s === '1';
}

export async function GET() {
  try {
    const res = await fetch(CSV_URL, {
      next: { revalidate: 300 }, // refresh every 5 minutes
      redirect: 'follow',
    });

    if (!res.ok) throw new Error(`Google Sheets returned ${res.status}`);

    const text = await res.text();
    const rows = parseCSV(text);
    if (rows.length < 2) throw new Error('Sheet appears empty');

    // Map header columns
    const headers = rows[0].map(normalizeHeader);
    const fieldIndex: Partial<Record<keyof BudgetCategory, number>> = {};
    headers.forEach((h, i) => {
      const mapped = COL_MAP[h];
      if (mapped && mapped !== '_skip') {
        fieldIndex[mapped] = i;
      }
    });

    if (fieldIndex.category === undefined || fieldIndex.estimated === undefined) {
      throw new Error(
        'Sheet must have at minimum a "Categoria" and "Estimado" column. ' +
        `Headers found: ${rows[0].join(', ')}`
      );
    }

    const items: BudgetCategory[] = [];
    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      const category = row[fieldIndex.category!]?.trim();
      const estimatedRaw = row[fieldIndex.estimated!]?.trim().replace(/[^0-9.-]/g, '');
      if (!category || !estimatedRaw) continue; // skip empty/total rows

      const estimated = parseFloat(estimatedRaw);
      if (isNaN(estimated)) continue;

      const item: BudgetCategory = {
        id: `sheet-${r}`,
        category,
        estimated,
        status: 'pending',
      };

      if (fieldIndex.subcategory !== undefined)
        item.subcategory = row[fieldIndex.subcategory]?.trim() || undefined;
      if (fieldIndex.vendor !== undefined)
        item.vendor = row[fieldIndex.vendor]?.trim() || undefined;
      if (fieldIndex.actual !== undefined) {
        const v = parseFloat(row[fieldIndex.actual]?.trim().replace(/[^0-9.-]/g, '') ?? '');
        if (!isNaN(v) && v > 0) item.actual = v;
      }
      if (fieldIndex.deposit !== undefined) {
        const v = parseFloat(row[fieldIndex.deposit]?.trim().replace(/[^0-9.-]/g, '') ?? '');
        if (!isNaN(v) && v > 0) item.deposit = v;
      }
      if (fieldIndex.depositPaid !== undefined)
        item.depositPaid = parseBool(row[fieldIndex.depositPaid]?.trim() ?? '');
      if (fieldIndex.status !== undefined)
        item.status = normalizeStatus(row[fieldIndex.status]?.trim() ?? '');
      if (fieldIndex.notes !== undefined)
        item.notes = row[fieldIndex.notes]?.trim() || undefined;

      items.push(item);
    }

    return NextResponse.json({ items, source: 'sheet', fetchedAt: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json(
      { items: null, source: 'error', error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
