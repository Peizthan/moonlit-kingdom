import type { SheetData, SheetSource, SheetTab } from './sheet';

export function isSheetSource(value: string): value is SheetSource {
  return value === 'budget' || value === 'guests';
}

/** RFC 4180: retain formatted text, quoted newlines, commas and escaped quotes. */
export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  const csv = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    if (quoted) {
      if (c === '"' && csv[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') {
      if (cell !== '') throw new Error('CSV inválido');
      quoted = true;
    } else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && csv[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (quoted) throw new Error('CSV incompleto');
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

interface TabDescriptor {
  gid: string;
  title: string;
  headers: string[];
  numericColumns: number[];
}
const normalized = (value: string) => value.trim().toLocaleLowerCase('es');

export function prepareTab(text: string, contentType: string, descriptor: TabDescriptor): SheetTab {
  if (!/^(text\/(csv|plain)|application\/(csv|octet-stream))/i.test(contentType) ||
      /^\s*(<!doctype|<html|<head|<body)/i.test(text)) {
    throw new Error(`Google Sheets no devolvió datos CSV para «${descriptor.title}». Revisa el acceso a la planilla.`);
  }
  const raw = parseCSV(text).map(row => row.map(cell => cell.trim()));
  const firstRow = raw.findIndex(row => row.some(Boolean));
  if (firstRow < 0) throw new Error(`La hoja «${descriptor.title}» está vacía.`);
  let end = raw.length;
  while (end > firstRow && raw[end - 1].every(cell => !cell)) end--;
  const used = raw.slice(firstRow, end);
  const left = Math.min(...used.filter(row => row.some(Boolean)).map(row => row.findIndex(Boolean)));
  const right = Math.max(...used.map(row => row.reduce((last, cell, index) => cell ? index + 1 : last, 0)));
  const rows = used.map(row => Array.from({ length: right - left }, (_, i) => row[i + left] ?? ''));
  const headerRow = rows.findIndex(row => descriptor.headers.every((header, i) => normalized(row[i] ?? '') === normalized(header)));
  if (headerRow < 0 || rows[headerRow].length !== descriptor.headers.length) {
    throw new Error(`La estructura de «${descriptor.title}» cambió. Revisa sus columnas en Google Sheets.`);
  }
  return { gid: descriptor.gid, title: descriptor.title, rows, headerRow,
    numericColumns: descriptor.numericColumns, rowNumbers: rows.map((_, i) => firstRow + i + 1) };
}

export function isSheetData(value: unknown, source: SheetSource): value is SheetData {
  if (!value || typeof value !== 'object') return false;
  const data = value as Partial<SheetData>;
  return data.source === source && typeof data.sheetUrl === 'string' &&
    /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[\w-]+\/edit$/.test(data.sheetUrl) &&
    typeof data.fetchedAt === 'string' && Number.isFinite(Date.parse(data.fetchedAt)) &&
    Array.isArray(data.tabs) && data.tabs.length > 0 && data.tabs.every(tab =>
      typeof tab.gid === 'string' && typeof tab.title === 'string' && Array.isArray(tab.rows) &&
      tab.rows.length > 0 && tab.rows.every(row => Array.isArray(row) && row.every(cell => typeof cell === 'string')) &&
      Number.isInteger(tab.headerRow) && tab.headerRow >= 0 && tab.headerRow < tab.rows.length &&
      Array.isArray(tab.numericColumns) && tab.numericColumns.every(Number.isInteger) &&
      Array.isArray(tab.rowNumbers) && tab.rowNumbers.length === tab.rows.length && tab.rowNumbers.every(Number.isInteger));
}

export interface GuestRecord { rowNumber: number; cells: string[] }
export function guestRecords(tab: SheetTab): GuestRecord[] {
  return tab.rows.slice(tab.headerRow + 1).flatMap((cells, i) => cells.some(Boolean)
    ? [{ rowNumber: tab.rowNumbers[tab.headerRow + 1 + i], cells }] : []);
}

export function guestCounts(records: GuestRecord[]) {
  const named = records.filter(record => Boolean(record.cells[2]));
  const partners = named.filter(record => record.cells[5] === 'Sí').length;
  return { named: named.length, partners, total: named.length + partners,
    unnamed: records.length - named.length, confirmed: named.filter(record => record.cells[4] === 'Sí').length };
}

export const EMPTY_FILTER = '__empty__';
export function filterGuests(records: GuestRecord[], query: string, filters: Record<number, string>) {
  const search = query.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
  return records.filter(({ cells }) => Object.entries(filters).every(([column, value]) => !value ||
    (value === EMPTY_FILTER ? !cells[Number(column)] : cells[Number(column)] === value)) &&
    (!search || cells.join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').includes(search)));
}
