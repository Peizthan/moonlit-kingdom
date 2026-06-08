'use client';

import { motion } from 'framer-motion';
import { Decision } from '@/lib/types';
import { useAdmin } from '@/lib/AdminContext';
import { EditableField } from '@/components/ui/EditableField';

interface DecisionLogTableProps {
  decisions: Decision[];
}

const statusColors: Record<Decision['status'], string> = {
  final: '#1D4A3A',
  provisional: '#4E1F2D',
  'under-review': '#121C2E',
};

const statusLabels: Record<Decision['status'], string> = {
  final: 'Final',
  provisional: 'Provisional',
  'under-review': 'En revisión',
};

const statusOrder: Decision['status'][] = ['provisional', 'under-review', 'final'];

export function DecisionLogTable({ decisions }: DecisionLogTableProps) {
  const { isEditMode, getOverride, setOverride } = useAdmin();

  function cycleStatus(d: Decision) {
    const current = getOverride<Decision['status']>(`decision:${d.id}:status`, d.status);
    const idx = statusOrder.indexOf(current);
    setOverride(`decision:${d.id}:status`, statusOrder[(idx + 1) % statusOrder.length]);
  }

  return (
    <div className="space-y-3">
      {decisions.map((d, i) => (
        <motion.div
          key={d.id}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="rounded-sm border p-4 hover:border-[rgba(176,141,87,0.3)] transition-colors duration-300"
          style={{
            borderColor: 'rgba(176,141,87,0.12)',
            background: 'rgba(18,28,46,0.25)',
          }}
        >
          <div className="flex flex-wrap items-start gap-3 mb-2">
            <div className="flex-1">
              <p className="font-medium text-sm" style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif" }}>
                <EditableField id={`decision:${d.id}:decision`} value={d.decision} style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif", fontWeight: '500', fontSize: '0.875rem' }} />
              </p>
            </div>
            {(() => {
              const s = getOverride<Decision['status']>(`decision:${d.id}:status`, d.status);
              return (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0 ${isEditMode ? 'cursor-pointer' : ''}`}
                  title={isEditMode ? 'Clic para cambiar estado' : undefined}
                  onClick={isEditMode ? () => cycleStatus(d) : undefined}
                  style={{
                    backgroundColor: `${statusColors[s]}60`,
                    color: '#C7C0B6',
                    border: `1px solid ${statusColors[s]}`,
                    fontSize: '0.65rem',
                  }}
                >
                  {statusLabels[s]}
                </span>
              );
            })()}
          </div>
          {d.rationale && (
            <p className="text-sm mb-2" style={{ color: '#8E8A86' }}>
              <EditableField id={`decision:${d.id}:rationale`} value={d.rationale} type="textarea" style={{ color: '#8E8A86', fontSize: '0.875rem' }} />
            </p>
          )}
          <div className="flex flex-wrap gap-4 text-xs" style={{ color: 'rgba(176,141,87,0.5)' }}>
            <span>{d.date}</span>
            <span>{d.category}</span>
            <span>Decidió: {d.decidedBy}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
