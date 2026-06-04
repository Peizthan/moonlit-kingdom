'use client';

import { motion } from 'framer-motion';
import { BudgetCategory } from '@/lib/types';

interface BudgetTableProps {
  items: BudgetCategory[];
  showActual?: boolean;
  rate?: number;
}

const statusColors: Record<BudgetCategory['status'], string> = {
  confirmed: '#1D4A3A',
  pending: '#4E1F2D',
  enquiry: '#121C2E',
  paid: '#B08D57',
};

const statusText: Record<BudgetCategory['status'], string> = {
  confirmed: 'Confirmado',
  pending: 'Pendiente',
  enquiry: 'Consulta',
  paid: 'Pagado',
};

function formatCurrency(amount: number | undefined, rate: number): string {
  if (amount === undefined) return '—';
  return new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG', maximumFractionDigits: 0 }).format(
    Math.round(amount * rate),
  );
}

function groupByCategory(items: BudgetCategory[]) {
  return items.reduce<Record<string, BudgetCategory[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

export function BudgetTable({ items, showActual = false, rate = 1 }: BudgetTableProps) {
  const grouped = groupByCategory(items);
  const total = items.reduce((sum, i) => sum + i.estimated, 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(176,141,87,0.2)' }}>
            <th className="text-left py-3 px-4 text-xs uppercase tracking-widest" style={{ color: '#B08D57' }}>Categoría</th>
            <th className="text-left py-3 px-4 text-xs uppercase tracking-widest" style={{ color: '#B08D57' }}>Proveedor</th>
            <th className="text-right py-3 px-4 text-xs uppercase tracking-widest" style={{ color: '#B08D57' }}>Estimado</th>
            {showActual && <th className="text-right py-3 px-4 text-xs uppercase tracking-widest" style={{ color: '#B08D57' }}>Real</th>}
            <th className="text-right py-3 px-4 text-xs uppercase tracking-widest" style={{ color: '#B08D57' }}>Seña</th>
            <th className="text-center py-3 px-4 text-xs uppercase tracking-widest" style={{ color: '#B08D57' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([category, categoryItems], gi) => (
            <>
              <tr key={`cat-${gi}`}>
                <td
                  colSpan={showActual ? 6 : 5}
                  className="py-3 px-4 text-xs uppercase tracking-widest font-medium"
                  style={{
                    color: '#B08D57',
                    background: 'rgba(176,141,87,0.05)',
                    borderTop: '1px solid rgba(176,141,87,0.15)',
                  }}
                >
                  {category}
                </td>
              </tr>
              {categoryItems.map((item, i) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="group hover:bg-[rgba(176,141,87,0.04)] transition-colors duration-200"
                  style={{ borderBottom: '1px solid rgba(176,141,87,0.08)' }}
                >
                  <td className="py-2.5 px-4" style={{ color: '#D8C3A5' }}>
                    {item.subcategory || item.category}
                  </td>
                  <td className="py-2.5 px-4 text-xs" style={{ color: '#8E8A86' }}>
                    {item.vendor || '—'}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono" style={{ color: '#D8C3A5' }}>
                    {formatCurrency(item.estimated, rate)}
                  </td>
                  {showActual && (
                    <td className="py-2.5 px-4 text-right font-mono" style={{ color: '#8E8A86' }}>
                      {formatCurrency(item.actual, rate)}
                    </td>
                  )}
                  <td className="py-2.5 px-4 text-right font-mono text-xs" style={{ color: '#8E8A86' }}>
                    {item.deposit ? formatCurrency(item.deposit, rate) : '—'}
                    {item.depositPaid && (
                      <span className="ml-1 text-xs" style={{ color: '#B08D57' }}>✓</span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full uppercase tracking-wide"
                      style={{
                        backgroundColor: `${statusColors[item.status]}40`,
                        color: item.status === 'paid' ? '#B08D57' : '#C7C0B6',
                        border: `1px solid ${statusColors[item.status]}60`,
                        fontSize: '0.65rem',
                      }}
                    >
                      {statusText[item.status]}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </>
          ))}
          {/* Total row */}
          <tr style={{ borderTop: '1px solid rgba(176,141,87,0.3)' }}>
            <td colSpan={2} className="py-4 px-4 text-sm uppercase tracking-widest" style={{ color: '#B08D57' }}>
              Presupuesto Total Estimado
            </td>
            <td className="py-4 px-4 text-right text-lg font-light" style={{ color: '#B08D57', fontFamily: "'Georgia', serif" }}>
              {formatCurrency(total, rate)}
            </td>
            {showActual && <td />}
            <td /><td />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
