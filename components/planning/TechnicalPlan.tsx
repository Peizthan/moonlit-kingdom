'use client';

import { motion } from 'framer-motion';
import { TechnicalItem } from '@/lib/types';
import { useAdmin } from '@/lib/AdminContext';
import { EditableField } from '@/components/ui/EditableField';

interface TechnicalPlanProps {
  items: TechnicalItem[];
}

const statusColors: Record<TechnicalItem['status'], string> = {
  confirmed: '#1D4A3A',
  pending: '#4E1F2D',
  tbc: '#121C2E',
};

const statusLabels: Record<TechnicalItem['status'], string> = {
  confirmed: 'Confirmado',
  pending: 'Pendiente',
  tbc: 'Por confirmar',
};

const statusOrder: TechnicalItem['status'][] = ['pending', 'tbc', 'confirmed'];

function groupByCategory(items: TechnicalItem[]) {
  return items.reduce<Record<string, TechnicalItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

export function TechnicalPlan({ items }: TechnicalPlanProps) {
  const grouped = groupByCategory(items);
  const { isEditMode, getOverride, setOverride } = useAdmin();

  function cycleStatus(item: TechnicalItem) {
    const current = getOverride<TechnicalItem['status']>(`tech:${item.id}:status`, item.status);
    const idx = statusOrder.indexOf(current);
    setOverride(`tech:${item.id}:status`, statusOrder[(idx + 1) % statusOrder.length]);
  }

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
                    <EditableField id={`tech:${item.id}:item`} value={item.item} style={{ color: '#D8C3A5', fontSize: '0.875rem' }} />
                  </td>
                  <td className="py-2.5 px-4 text-center" style={{ color: '#B08D57' }}>
                    {item.quantity}
                  </td>
                  <td className="py-2.5 px-4 text-xs" style={{ color: '#8E8A86' }}>
                    <EditableField id={`tech:${item.id}:supplier`} value={item.supplier ?? '—'} style={{ color: '#8E8A86', fontSize: '0.75rem' }} />
                  </td>
                  <td className="py-2.5 px-4">
                    {(() => {
                      const s = getOverride<TechnicalItem['status']>(`tech:${item.id}:status`, item.status);
                      return (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full uppercase tracking-wide ${isEditMode ? 'cursor-pointer' : ''}`}
                          title={isEditMode ? 'Clic para cambiar estado' : undefined}
                          onClick={isEditMode ? () => cycleStatus(item) : undefined}
                          style={{
                            background: `${statusColors[s]}50`,
                            color: '#C7C0B6',
                            border: `1px solid ${statusColors[s]}`,
                            fontSize: '0.6rem',
                          }}
                        >
                          {statusLabels[s]}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="py-2.5 px-4 text-xs" style={{ color: '#8E8A86' }}>
                    <EditableField id={`tech:${item.id}:notes`} value={item.notes ?? ''} style={{ color: '#8E8A86', fontSize: '0.75rem' }} />
                  </td>
                </motion.tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
