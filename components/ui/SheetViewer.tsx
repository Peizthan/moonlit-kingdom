'use client';

import { useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import type { SheetData, SheetTab } from '@/lib/sheet';

export interface SheetViewerProps {
  data: SheetData | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function SheetControls({ data, loading, error, onRefresh, activeGid }: SheetViewerProps & { activeGid?: string }) {
  return <div className="mb-5 space-y-3">
    <div className="flex flex-wrap items-center gap-3">
      <button onClick={onRefresh} disabled={loading} className="mk-sheet-button disabled:opacity-60">
        <RefreshCw size={15} aria-hidden="true" className={loading ? 'animate-spin' : ''} />
        {loading ? 'Actualizando…' : 'Actualizar'}
      </button>
      {data && <a href={`${data.sheetUrl}${activeGid ? `#gid=${activeGid}` : ''}`} target="_blank" rel="noopener noreferrer" className="mk-sheet-button">
        <ExternalLink size={15} aria-hidden="true" /> Editar en Google Sheets
      </a>}
    </div>
    {error && <p role="alert" className="mk-sheet-error p-4 text-sm">
      {error}{data ? ' Mostrando la última versión cargada.' : ''}
    </p>}
    <p role="status" aria-live="polite" className="text-sm" style={{ color: 'var(--tone-muted)' }}>
      {loading ? (data ? 'Actualizando la planilla…' : 'Cargando planilla…') : data
        ? `Última lectura: ${new Date(data.fetchedAt).toLocaleString('es-PY', { timeZone: 'America/Asuncion' })}.`
        : error ? 'No hay datos cargados. Puedes volver a actualizar.' : 'Sin datos.'}
    </p>
  </div>;
}

export function SheetTable({ tab }: { tab: SheetTab }) {
  const headers = tab.rows[tab.headerRow];
  const body = tab.rows.slice(tab.headerRow + 1);
  const preamble = tab.rows.slice(0, tab.headerRow);
  return <>
    {preamble.length > 0 && <div className="mb-3 space-y-2 text-base font-medium">
      {preamble.map((row, i) => <p key={i}>{row.filter(Boolean).join(' · ')}</p>)}
    </div>}
    <div className="mk-sheet-scroll" tabIndex={0} role="region" aria-label={`${tab.title}: tabla con desplazamiento horizontal`}>
      <table className="mk-sheet-table">
        <caption className="sr-only">{tab.title}. Valores tal como aparecen en Google Sheets.</caption>
        <thead><tr>{headers.map((cell, c) => <th key={c} scope="col" className={tab.numericColumns.includes(c) ? 'mk-numeric' : undefined}>{cell}</th>)}</tr></thead>
        <tbody>{body.map((row, r) => {
          const spacer = row.every(cell => !cell);
          const total = row.some(cell => /^total(?:\s|$)/i.test(cell));
          return spacer ? <tr key={r} aria-hidden="true"><td colSpan={headers.length} className="mk-sheet-spacer" /></tr>
            : <tr key={r} className={total ? 'mk-sheet-total' : undefined}>{row.map((cell, c) => <td key={c} className={tab.numericColumns.includes(c) && /^[\s₲$€£+\-\d.,%]+$/.test(cell) ? 'mk-numeric mk-number-value' : undefined}>{cell}</td>)}</tr>;
        })}</tbody>
      </table>
    </div>
    <p className="mt-2 text-sm" style={{ color: 'var(--tone-muted)' }}>En pantallas pequeñas, desplaza la tabla para ver todas las columnas.</p>
  </>;
}

export function SheetViewer(props: SheetViewerProps) {
  const [activeGid, setActiveGid] = useState<string | null>(null);
  const tabs = props.data?.tabs ?? [];
  const active = tabs.find(tab => tab.gid === activeGid) ?? tabs[0];
  return <div>
    <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Hojas de la planilla">
      {tabs.map(tab => <button key={tab.gid} onClick={() => setActiveGid(tab.gid)} aria-pressed={active?.gid === tab.gid} className="mk-sheet-button">{tab.title}</button>)}
    </div>
    <SheetControls {...props} activeGid={active?.gid} />
    {active && <SheetTable tab={active} />}
    {props.data && <p className="mt-4 text-sm" style={{ color: 'var(--tone-muted)' }}>Vista de solo lectura. Edita la planilla en Google Sheets y actualiza aquí para ver los cambios.</p>}
  </div>;
}
