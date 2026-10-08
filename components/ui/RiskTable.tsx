'use client';

import { motion } from 'framer-motion';
import { RiskItem } from '@/lib/types';
import { useAdmin } from '@/lib/AdminContext';
import { EditableField } from '@/components/ui/EditableField';
import { AddButton, DeleteButton } from '@/components/ui/ListControls';

interface RiskTableProps {
  risks: RiskItem[];
  onAdd?: () => void;
  onDelete?: (id: string) => void;
}

const impactColors = {
  high: 'var(--tone-accent)',
  medium: '#8C6A3C',
  low: '#1D4A3A',
};

const statusColors = {
  open: '#4E1F2D',
  mitigated: '#1D4A3A',
  closed: 'var(--tone-muted)',
};

const statusLabels = { open: 'Abierto', mitigated: 'Mitigado', closed: 'Cerrado' };
const statusOrder: RiskItem['status'][] = ['open', 'mitigated', 'closed'];

export function RiskTable({ risks, onAdd, onDelete }: RiskTableProps) {
  const { isEditMode, getOverride, setOverride } = useAdmin();

  function cycleStatus(risk: RiskItem) {
    const current = getOverride<RiskItem['status']>(`risk:${risk.id}:status`, risk.status);
    const idx = statusOrder.indexOf(current);
    setOverride(`risk:${risk.id}:status`, statusOrder[(idx + 1) % statusOrder.length]);
  }

  return (
    <div className="space-y-3">
      {isEditMode && onAdd && (
        <div className="flex justify-end">
          <AddButton label="Agregar riesgo" onClick={onAdd} />
        </div>
      )}
      {risks.length === 0 && (
        <p className="py-12 text-sm text-center" style={{ color: 'var(--tone-muted)' }}>
          Todav?a no hay riesgos. Activ? el modo edici?n para agregar.
        </p>
      )}
      {risks.map((risk, i) => (
        <motion.div
          key={risk.id}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="rounded-sm border p-4"
          style={{
            borderColor: 'rgb(var(--tone-line)/0.15)',
            background: 'rgb(var(--tone-surface)/0.3)',
          }}
        >
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <h4 className="flex-1 font-medium text-sm" style={{ color: 'var(--tone-fg)', fontFamily: 'var(--mk-font-display)' }}>
              <EditableField id={`risk:${risk.id}:risk`} value={risk.risk} style={{ color: 'var(--tone-fg)', fontFamily: 'var(--mk-font-display)', fontWeight: '500', fontSize: '0.875rem' }} />
            </h4>
            <div className="flex gap-2 flex-shrink-0">
              <span
                className="text-xs px-2 py-0.5 rounded-full uppercase tracking-wide"
                style={{
                  backgroundColor: `${impactColors[risk.impact]}25`,
                  color: impactColors[risk.impact],
                  border: `1px solid ${impactColors[risk.impact]}40`,
                  fontSize: '0.65rem',
                }}
              >
                Impacto: {risk.impact}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full uppercase tracking-wide"
                style={{
                  backgroundColor: `${impactColors[risk.likelihood]}25`,
                  color: impactColors[risk.likelihood],
                  border: `1px solid ${impactColors[risk.likelihood]}40`,
                  fontSize: '0.65rem',
                }}
              >
                Probabilidad: {risk.likelihood}
              </span>
              {(() => {
                const s = getOverride<RiskItem['status']>(`risk:${risk.id}:status`, risk.status);
                return (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full uppercase tracking-wide ${isEditMode ? 'cursor-pointer' : ''}`}
                    title={isEditMode ? 'Clic para cambiar estado' : undefined}
                    onClick={isEditMode ? () => cycleStatus(risk) : undefined}
                    style={{
                      backgroundColor: `${statusColors[s]}60`,
                      color: 'var(--tone-soft)',
                      border: `1px solid ${statusColors[s]}`,
                      fontSize: '0.65rem',
                    }}
                  >
                    {statusLabels[s]}
                  </span>
                );
              })()}
              {isEditMode && onDelete && (
                <DeleteButton onClick={() => onDelete(risk.id)} title="Eliminar riesgo" confirmMessage="¿Eliminar este riesgo?" />
              )}
            </div>
          </div>
          <p className="text-sm mb-2" style={{ color: 'var(--tone-muted)' }}>
            <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--tone-accent)' }}>Mitigación: </span>
            <EditableField id={`risk:${risk.id}:mitigation`} value={risk.mitigation} type="textarea" style={{ color: 'var(--tone-muted)', fontSize: '0.875rem' }} />
          </p>
          <p className="text-xs" style={{ color: 'var(--tone-accent)' }}>
            Responsable: {risk.owner} · Categoría: {risk.category}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
