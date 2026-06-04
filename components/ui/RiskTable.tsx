'use client';

import { motion } from 'framer-motion';
import { RiskItem } from '@/lib/types';

interface RiskTableProps {
  risks: RiskItem[];
}

const impactColors = {
  high: '#B08D57',
  medium: '#8C6A3C',
  low: '#1D4A3A',
};

const statusColors = {
  open: '#4E1F2D',
  mitigated: '#1D4A3A',
  closed: '#8E8A86',
};

export function RiskTable({ risks }: RiskTableProps) {
  return (
    <div className="space-y-3">
      {risks.map((risk, i) => (
        <motion.div
          key={risk.id}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="rounded-sm border p-4"
          style={{
            borderColor: 'rgba(176,141,87,0.15)',
            background: 'rgba(18,28,46,0.3)',
          }}
        >
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <h4 className="flex-1 font-medium text-sm" style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif" }}>
              {risk.risk}
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
              <span
                className="text-xs px-2 py-0.5 rounded-full uppercase tracking-wide"
                style={{
                  backgroundColor: `${statusColors[risk.status]}60`,
                  color: '#C7C0B6',
                  border: `1px solid ${statusColors[risk.status]}`,
                  fontSize: '0.65rem',
                }}
              >
                {{ open: 'Abierto', mitigated: 'Mitigado', closed: 'Cerrado' }[risk.status] ?? risk.status}
              </span>
            </div>
          </div>
          <p className="text-sm mb-2" style={{ color: '#8E8A86' }}>
            <span className="text-xs uppercase tracking-wide" style={{ color: 'rgba(176,141,87,0.6)' }}>Mitigación: </span>
            {risk.mitigation}
          </p>
          <p className="text-xs" style={{ color: 'rgba(176,141,87,0.5)' }}>
            Responsable: {risk.owner} · Categoría: {risk.category}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
