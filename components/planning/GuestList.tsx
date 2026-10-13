'use client';

import { useMemo, useState } from 'react';
import { SheetControls, SheetTable, type SheetViewerProps } from '@/components/ui/SheetViewer';
import { EMPTY_FILTER, filterGuests, guestCounts, guestRecords } from '@/lib/sheet-data';

const filterColumns = [0, 1, 3, 4];
const pageSize = 50;
const summaryKey = (value: string) => value.replace(/[“”]/g, '"').toLocaleLowerCase('es');
const blank = (value: string) => value || '—';

export function GuestList(props: SheetViewerProps) {
  const [view, setView] = useState<'list' | 'summary'>('list');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<number, string>>({});
  const [unnamedOnly, setUnnamedOnly] = useState(false);
  const [page, setPage] = useState(0);
  const tab = props.data?.tabs.find(tab => tab.title === 'Invitados');
  const summary = props.data?.tabs.find(tab => tab.title === 'Resumen');
  const records = useMemo(() => tab ? guestRecords(tab) : [], [tab]);
  const counts = useMemo(() => guestCounts(records), [records]);
  const filtered = useMemo(() => filterGuests(records, query, filters).filter(record => !unnamedOnly || !record.cells[2]), [records, query, filters, unnamedOnly]);
  const lastPage = Math.max(0, Math.ceil(filtered.length / pageSize) - 1);
  const activePage = Math.min(page, lastPage);
  const visible = filtered.slice(activePage * pageSize, (activePage + 1) * pageSize);
  const headers = tab?.rows[tab.headerRow] ?? [];
  const metrics = [
    { label: 'Nombres en lista', value: counts.named },
    { label: 'Parejas con “Sí”', value: counts.partners },
    { label: 'Total de invitados', value: counts.total },
    { label: 'Espacios sin nombre', value: counts.unnamed },
  ];

  return <div>
    <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Hojas de invitados">
      <button className="mk-sheet-button" aria-pressed={view === 'list'} onClick={() => setView('list')}>Invitados</button>
      <button className="mk-sheet-button" aria-pressed={view === 'summary'} onClick={() => setView('summary')}>Resumen</button>
    </div>
    <SheetControls {...props} activeGid={view === 'list' ? tab?.gid : summary?.gid} />
    {view === 'summary' && summary && <SheetTable tab={summary} />}
    {view === 'list' && tab && <>
      <dl className="mk-guest-metrics mb-4 grid gap-3">
        {metrics.map(metric => <div key={metric.label} className="mk-data-surface border p-4">
          <dt className="text-sm" style={{ color: 'var(--tone-soft)' }}>{metric.label}</dt>
          <dd className="mk-display mt-1 text-3xl font-semibold tabular-nums">{summary?.rows.find(row => summaryKey(row[0]) === summaryKey(metric.label))?.[1] ?? '—'}</dd>
        </div>)}
      </dl>
      <p className="mb-6 text-sm" style={{ color: 'var(--tone-muted)' }}>Indicadores de la hoja Resumen. Cada registro con nombre cuenta una persona; cada pareja con “Sí” suma una más. La confirmación corresponde al registro, sin asumir la confirmación de su pareja. El resumen de la planilla se conserva en la pestaña Resumen.</p>
      <div className="mk-data-surface mb-6 space-y-4 border p-4 sm:p-5">
        <label className="block text-sm font-medium">Buscar en la lista
          <input type="search" value={query} onChange={event => { setQuery(event.target.value); setPage(0); }} placeholder="Nombre, grupo, mesa…" className="mk-sheet-input mt-2" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filterColumns.map(column => {
            const options = [...new Set(records.map(record => record.cells[column]))].filter(Boolean).sort((a, b) => a.localeCompare(b, 'es'));
            return <label key={column} className="block text-sm font-medium">{headers[column]}
              <select className="mk-sheet-input mt-2" value={filters[column] ?? ''} onChange={event => { setFilters({ ...filters, [column]: event.target.value }); setPage(0); }}>
                <option value="">Todos</option>
                {options.map(value => <option key={value} value={value}>{value}</option>)}
                <option value={EMPTY_FILTER}>Celda vacía</option>
              </select>
            </label>;
          })}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" checked={unnamedOnly} onChange={event => { setUnnamedOnly(event.target.checked); setPage(0); }} /> Solo espacios sin nombre</label>
          <button className="mk-sheet-button" onClick={() => { setQuery(''); setFilters({}); setUnnamedOnly(false); setPage(0); }}>Limpiar filtros</button>
        </div>
      </div>
      <p role="status" aria-live="polite" className="mb-3 text-sm">{filtered.length} de {records.length} registros · {counts.confirmed} registros confirmados en la lista completa.</p>
      {filtered.length === 0 ? <p className="mk-data-surface border p-8">No hay registros que coincidan con los filtros.</p> : <>
        <div className="mk-sheet-scroll hidden lg:block" tabIndex={0} role="region" aria-label="Lista de invitados con desplazamiento horizontal">
          <table className="mk-sheet-table mk-guest-table">
            <caption className="sr-only">Invitados. Todas las columnas de la planilla.</caption>
            <thead><tr>{headers.map((header, i) => <th scope="col" key={i}>{header}</th>)}</tr></thead>
            <tbody>{visible.map(record => <tr key={record.rowNumber}>{record.cells.map((cell, i) => <td key={i}>{blank(cell)}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <div className="space-y-3 lg:hidden">
          {visible.map(record => <details key={record.rowNumber} className="mk-data-surface border">
            <summary className="cursor-pointer px-4 py-4">
              <span className="font-semibold">{record.cells[2] || `Espacio sin nombre · fila ${record.rowNumber}`}</span>
              <span className="mt-1 block text-sm" style={{ color: 'var(--tone-soft)' }}>{blank(record.cells[0])} · {blank(record.cells[1])}</span>
              <span className="mt-2 block text-sm">Invitación: {blank(record.cells[3])} · Confirmado: {blank(record.cells[4])}</span>
              <span className="mt-2 block text-sm underline">Ver todos los datos</span>
            </summary>
            <dl className="grid gap-3 border-t px-4 py-4 sm:grid-cols-2" style={{ borderColor: 'var(--tone-rule)' }}>
              {headers.map((header, i) => <div key={i}><dt className="text-sm font-semibold">{header}</dt><dd className="mt-1 whitespace-pre-wrap break-words text-base">{blank(record.cells[i])}</dd></div>)}
            </dl>
          </details>)}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm">Registros {activePage * pageSize + 1}–{Math.min((activePage + 1) * pageSize, filtered.length)} de {filtered.length}</p>
          <div className="flex flex-wrap items-center gap-3">
            <button className="mk-sheet-button" disabled={activePage === 0} onClick={() => setPage(activePage - 1)}>Anterior</button>
            <span className="text-sm">{activePage + 1} / {lastPage + 1}</span>
            <button className="mk-sheet-button" disabled={activePage === lastPage} onClick={() => setPage(activePage + 1)}>Siguiente</button>
          </div>
        </div>
      </>}
      <p className="mt-4 text-sm" style={{ color: 'var(--tone-muted)' }}>— indica una celda vacía. “Sin registrar” se conserva tal como aparece en la planilla. En escritorio, desplaza la tabla para ver todas las columnas; en móvil, abre cada registro.</p>
    </>}
  </div>;
}
