'use client';

import { motion } from 'framer-motion';
import { TechnicalItem } from '@/lib/types';
import { useAdmin } from '@/lib/AdminContext';
import { EditableField } from '@/components/ui/EditableField';
import { AddButton, DeleteButton } from '@/components/ui/ListControls';

interface TechnicalPlanProps {
  items: TechnicalItem[];
  onAdd?: () => void;
  onDelete?: (id: string) => void;
}

const statusColors: Record<TechnicalItem['status'], string> = {
  confirmed: '#1D4A3A',
  pending: '#4E1F2D',
  tbc: 'var(--tone-base)',
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

export function TechnicalPlan({ items, onAdd, onDelete }: TechnicalPlanProps) {
  const grouped = groupByCategory(items);
  const { isEditMode, getOverride, setOverride } = useAdmin();

  function cycleStatus(item: TechnicalItem) {
    const current = getOverride<TechnicalItem['status']>(`tech:${item.id}:status`, item.status);
    const idx = statusOrder.indexOf(current);
    setOverride(`tech:${item.id}:status`, statusOrder[(idx + 1) % statusOrder.length]);
  }

  return (
    <div>
      {isEditMode && onAdd && (
        <div className="flex justify-end p-3" style={{ borderBottom: '1px solid rgb(var(--tone-line)/0.1)' }}>
          <AddButton label="Agregar ítem" onClick={onAdd} />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ borderBottom: '1px solid rgb(var(--tone-line)/0.2)' }}>
              {['Categoría', 'Artículo', 'Cant.', 'Proveedor', 'Estado', 'Notas', ''].map((h) => (
                <th
                  key={h}
                  className="text-left py-3 px-4 text-xs uppercase tracking-widest"
                  style={{ color: 'var(--tone-accent)' }}
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
                    colSpan={7}
                    className="py-2.5 px-4 text-xs uppercase tracking-widest"
                    style={{
                      color: 'var(--tone-accent)',
                      background: 'rgb(var(--tone-line)/0.04)',
                      borderTop: '1px solid rgb(var(--tone-line)/0.12)',
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
                    className="hover:bg-[rgb(var(--tone-line)/0.04)] transition-colors duration-200"
                    style={{ borderBottom: '1px solid rgb(var(--tone-line)/0.07)' }}
                  >
                    <td className="py-2.5 px-4 text-xs" style={{ color: 'var(--tone-accent)' }}>
                      {item.category}
                    </td>
                    <td className="py-2.5 px-4" style={{ color: 'var(--tone-fg)' }}>
                      <EditableField id={`tech:${item.id}:item`} value={item.item} style={{ color: 'var(--tone-fg)', fontSize: '0.875rem' }} />
                    </td>
                    <td className="py-2.5 px-4 text-center" style={{ color: 'var(--tone-accent)' }}>
                      {item.quantity}
                    </td>
                    <td className="py-2.5 px-4 text-xs" style={{ color: 'var(--tone-muted)' }}>
                      <EditableField id={`tech:${item.id}:supplier`} value={item.supplier ?? '—'} style={{ color: 'var(--tone-muted)', fontSize: '0.75rem' }} />
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
                              color: 'var(--tone-soft)',
                              border: `1px solid ${statusColors[s]}`,
                              fontSize: '0.6rem',
                            }}
                          >
                            {statusLabels[s]}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="py-2.5 px-4 text-xs" style={{ color: 'var(--tone-muted)' }}>
                      <EditableField id={`tech:${item.id}:notes`} value={item.notes ?? ''} style={{ color: 'var(--tone-muted)', fontSize: '0.75rem' }} />
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      {isEditMode && onDelete && (
                        <DeleteButton onClick={() => onDelete(item.id)} title="Eliminar ítem" confirmMessage="¿Eliminar este ítem técnico?" />
                      )}
                    </td>
                  </motion.tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
      {items.length === 0 && (
        <p className="py-12 text-sm text-center" style={{ color: 'var(--tone-muted)' }}>
          Todavía no hay ítems técnicos. Activá el modo edición para agregar.
        </p>
      )}
    </div>
  );
}
