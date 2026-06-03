'use client';

import { motion } from 'framer-motion';
import { Decision } from '@/lib/types';

interface DecisionLogTableProps {
  decisions: Decision[];
}

const statusColors: Record<Decision['status'], string> = {
  final: '#1D4A3A',
  provisional: '#4E1F2D',
  'under-review': '#121C2E',
};

export function DecisionLogTable({ decisions }: DecisionLogTableProps) {
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
                {d.decision}
              </p>
            </div>
            <span
              className="text-xs px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0"
              style={{
                backgroundColor: `${statusColors[d.status]}60`,
                color: '#C7C0B6',
                border: `1px solid ${statusColors[d.status]}`,
                fontSize: '0.65rem',
              }}
            >
              {d.status}
            </span>
          </div>
          {d.rationale && (
            <p className="text-sm mb-2" style={{ color: '#8E8A86' }}>{d.rationale}</p>
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
