import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCSV, prepareTab, isSheetData, isSheetSource, guestRecords, guestCounts, filterGuests, EMPTY_FILTER } from '../lib/sheet-data.ts';

const descriptor = { gid: '42', title: 'Cálculos', headers: ['Ítem', 'Costo'], numericColumns: [1] };
test('CSV preserves quoted commas, escaped quotes, newlines, accents and formatted text', () => {
  assert.deepEqual(parseCSV('\uFEFFNombre,Costo,Contacto\r\n"Uno, dos","₲ 1,250","+595 000"\r\n"Línea\ncon ""comillas""",0,\r\n'), [
    ['Nombre', 'Costo', 'Contacto'], ['Uno, dos', '₲ 1,250', '+595 000'], ['Línea\ncon "comillas"', '0', '']
  ]);
  assert.throws(() => parseCSV('a,"incompleto'), /incompleto/);
});
test('actual header follows title/empty edges and retains worksheet row numbers and zero', () => {
  const tab = prepareTab(',\r\n,Título\r\n,Ítem,Costo\r\n,Ejemplo,0\r\n,\r\n,Otro,"₲ 1,250"\r\n,\r\n', 'text/csv; charset=utf-8', descriptor);
  assert.equal(tab.headerRow, 1);
  assert.deepEqual(tab.rowNumbers, [2, 3, 4, 5, 6]);
  assert.deepEqual(tab.rows.at(-1), ['Otro', '₲ 1,250']);
  assert.equal(tab.rows[2][1], '0');
});
test('rejects HTML, login/error pages, empty exports and unexpected columns', () => {
  assert.throws(() => prepareTab('<!doctype html><html>Sign in</html>', 'text/csv', descriptor), /CSV/);
  assert.throws(() => prepareTab('Ítem,Costo\nA,0', 'text/html', descriptor), /CSV/);
  assert.throws(() => prepareTab(',,\n', 'text/csv', descriptor), /vacía/);
  assert.throws(() => prepareTab('Ítem,Nueva\nA,0', 'text/csv', descriptor), /estructura/);
  assert.equal(isSheetSource('https://example.org'), false);
  assert.equal(isSheetSource('guests'), true);
});
test('guest counts use the whole list, exclude unnamed slots, and do not infer partner confirmations', () => {
  const rows = [['Lista', 'Grupo', 'Nombre', 'Enviada', 'Confirmado', 'Pareja'], ...Array.from({ length: 120 }, (_, i) => ['Lista', 'Familia', `Persona ${i}`, 'Sin registrar', i === 119 ? 'Sí' : '', i % 2 ? 'Sí' : 'No']), ['Lista', 'Familia', '', '', '', 'Sí']];
  const tab = { gid: '1', title: 'Invitados', rows, headerRow: 0, numericColumns: [], rowNumbers: rows.map((_, i) => i + 1) };
  const records = guestRecords(tab);
  assert.deepEqual(guestCounts(records), { named: 120, partners: 60, total: 180, unnamed: 1, confirmed: 1 });
  assert.equal(records.at(-1).rowNumber, 122);
});
test('filters distinguish empty, No and Sin registrar; search is accent insensitive', () => {
  const records = [
    { rowNumber: 2, cells: ['A', 'Familia', 'Iván', 'Sin registrar', ''] },
    { rowNumber: 3, cells: ['B', 'Amigos', 'Ejemplo', 'No', 'No'] },
    { rowNumber: 4, cells: ['A', 'Familia', '', '', 'Sin registrar'] },
  ];
  assert.equal(filterGuests(records, 'ivan', {}).length, 1);
  assert.equal(filterGuests(records, '', { 4: EMPTY_FILTER })[0].rowNumber, 2);
  assert.equal(filterGuests(records, '', { 4: 'Sin registrar' })[0].rowNumber, 4);
  assert.equal(filterGuests(records, '', { 0: 'A', 3: 'No' }).length, 0);
});
test('client response validation rejects cross-source, malformed metadata and remote edit URLs', () => {
  const tab = prepareTab('Ítem,Costo\nA,0', 'text/csv', descriptor);
  const data = { source: 'budget', tabs: [tab], sheetUrl: 'https://docs.google.com/spreadsheets/d/example/edit', fetchedAt: '2026-10-13T12:00:00Z' };
  assert.equal(isSheetData(data, 'budget'), true);
  assert.equal(isSheetData(data, 'guests'), false);
  assert.equal(isSheetData({ ...data, sheetUrl: 'https://example.org' }, 'budget'), false);
  assert.equal(isSheetData({ ...data, tabs: [{ ...tab, headerRow: 99 }] }, 'budget'), false);
  assert.equal(isSheetData(null, 'budget'), false);
});
