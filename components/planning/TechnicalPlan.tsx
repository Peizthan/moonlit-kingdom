'use client';

import { motion } from 'framer-motion';
import { TechnicalItem } from '@/lib/types';

interface TechnicalPlanProps {
  items: TechnicalItem[];
}

const statusColors: Record<TechnicalItem['status'], string> = {
  confirmed: '#1D4A3A',
  pending: '#4E1F2D',
  tbc: '#121C2E',
};

function groupByCategory(items: TechnicalItem[]) {
  return items.reduce<Record<string, TechnicalItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

export function TechnicalPlan({ items }: TechnicalPlanProps) {
  const grouped = groupByCategory(items);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(176,141,87,0.2)' }}>
            {['Categoría', 'Artículo', 'Cant.', 'Proveedor', 'Estado', 'Notas'].map((h) => (
              <th
                key={h}
                className="text-left py-3 px-4 text-xs uppercase tracking-widest"
                style={{ color: '#B08D57' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([cat, catItems]) => (
            <>
              <tr key={`cat-${cat}`}>
                <td
                  colSpan={6}
                  className="py-2.5 px-4 text-xs uppercase tracking-widest"
                  style={{
                    color: '#B08D57',
                    background: 'rgba(176,141,87,0.04)',
                    borderTop: '1px solid rgba(176,141,87,0.12)',
                  }}
                >
                  {cat}
                </td>
              </tr>
              {catItems.map((item, i) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="hover:bg-[rgba(176,141,87,0.04)] transition-colors duration-200"
                  style={{ borderBottom: '1px solid rgba(176,141,87,0.07)' }}
                >
                  <td className="py-2.5 px-4 text-xs" style={{ color: 'rgba(176,141,87,0.4)' }}>
                    {item.category}
                  </td>
                  <td className="py-2.5 px-4" style={{ color: '#D8C3A5' }}>
                    {item.item}
                  </td>
                  <td className="py-2.5 px-4 text-center" style={{ color: '#B08D57' }}>
                    {item.quantity}
                  </td>
                  <td className="py-2.5 px-4 text-xs" style={{ color: '#8E8A86' }}>
                    {item.supplier ?? '—'}
                  </td>
                  <td className="py-2.5 px-4">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full uppercase tracking-wide"
                      style={{
                        background: `${statusColors[item.status]}50`,
                        color: '#C7C0B6',
                        border: `1px solid ${statusColors[item.status]}`,
                        fontSize: '0.6rem',
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-xs" style={{ color: '#8E8A86' }}>
                    {item.notes ?? '—'}
                  </td>
                </motion.tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
