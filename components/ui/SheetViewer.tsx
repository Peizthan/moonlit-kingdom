'use client';

import { useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import type { SheetData } from '@/lib/sheet';

interface SheetViewerProps {
  data: SheetData | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

const gold = 'rgb(var(--tone-line)/0.6)';

export function SheetViewer({ data, loading, error, onRefresh }: SheetViewerProps) {
  const [activeGid, setActiveGid] = useState<string | null>(null);

  const tabs = data?.tabs ?? [];
  const active = tabs.find((t) => t.gid === activeGid) ?? tabs[0];
  const editHref = data ? `${data.sheetUrl}${active ? `#gid=${active.gid}` : ''}` : null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.gid}
              onClick={() => setActiveGid(tab.gid)}
              className="px-4 py-2 text-xs uppercase tracking-[0.15em] border rounded-sm transition-all duration-300"
              style={{
                color: tab.gid === active?.gid ? 'var(--tone-accent)' : 'var(--tone-muted)',
                borderColor: tab.gid === active?.gid ? 'rgb(var(--tone-line)/0.5)' : 'rgb(var(--tone-line)/0.15)',
                background: tab.gid === active?.gid ? 'rgb(var(--tone-line)/0.1)' : 'transparent',
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.15em] border rounded-sm disabled:opacity-50"
            style={{ color: 'var(--tone-fg)', borderColor: 'rgb(var(--tone-line)/0.25)' }}
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            Actualizar
          </button>
          {editHref && (
            <a
              href={editHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.15em] border rounded-sm"
              style={{ color: 'var(--tone-accent)', borderColor: 'rgb(var(--tone-line)/0.4)', background: 'rgb(var(--tone-line)/0.12)' }}
            >
              <ExternalLink size={12} />
              Editar en Google Sheets
            </a>
          )}
        </div>
      </div>

      {error && (
        <p
          className="text-xs py-3 px-4 mb-4 rounded-sm"
          style={{ color: 'var(--tone-fg)', background: 'rgba(78,31,45,0.4)', border: '1px solid rgba(78,31,45,0.6)' }}
        >
          ⚠ {error}
          {data ? ' — mostrando la última versión cargada.' : ''}
        </p>
      )}

      {loading && !data && (
        <p className="text-sm py-12 text-center" style={{ color: 'var(--tone-muted)' }}>
          Cargando planilla…
        </p>
      )}

      {active && (
        <div
          className="rounded-sm border overflow-x-auto"
          style={{ borderColor: 'rgb(var(--tone-line)/0.15)', background: 'rgb(var(--tone-surface)/0.3)' }}
        >
          {active.rows.length === 0 ? (
            <p className="text-sm py-12 text-center" style={{ color: 'var(--tone-muted)' }}>
              Esta hoja está vacía.
            </p>
          ) : (
            <table className="w-full text-sm border-collapse">
              <tbody>
                {active.rows.map((row, r) => {
                  const spacer = row.every((c) => !c);
                  return (
                    <tr
                      key={r}
                      style={{
                        borderBottom: '1px solid rgb(var(--tone-line)/0.08)',
                        height: spacer ? 16 : undefined,
                      }}
                    >
                      {row.map((cell, c) => (
                        <td
                          key={c}
                          className="px-4 py-2 align-top whitespace-pre-wrap"
                          style={{
                            color: r === 0 ? gold : c === 0 ? 'var(--tone-fg)' : 'var(--tone-soft)',
                            fontWeight: r === 0 ? 500 : 400,
                            letterSpacing: r === 0 ? '0.08em' : undefined,
                            textTransform: r === 0 ? 'uppercase' : undefined,
                            fontSize: r === 0 ? '0.7rem' : undefined,
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {data && (
        <p className="text-xs mt-3" style={{ color: 'var(--tone-muted)' }}>
          ✓ Sincronizado con Google Sheets · {new Date(data.fetchedAt).toLocaleTimeString('es-PY')}. Los
          cambios se editan en la planilla y se ven aquí al actualizar.
        </p>
      )}
    </div>
  );
}
