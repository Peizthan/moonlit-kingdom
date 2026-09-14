'use client';

import { motion } from 'framer-motion';
import { BudgetCategory } from '@/lib/types';
import { useAdmin } from '@/lib/AdminContext';
import { AddButton, DeleteButton } from '@/components/ui/ListControls';

interface BudgetTableProps {
  items: BudgetCategory[];
  showActual?: boolean;
  rate?: number;
  onAdd?: () => void;
  onDelete?: (id: string) => void;
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

const statusOrder: BudgetCategory['status'][] = ['pending', 'enquiry', 'confirmed', 'paid'];

const inputStyle = {
  background: 'rgba(176,141,87,0.06)',
  border: '1px solid rgba(176,141,87,0.3)',
  padding: '2px 6px',
  width: '100%',
};

export function BudgetTable({ items, showActual = false, rate = 1, onAdd, onDelete }: BudgetTableProps) {
  const grouped = groupByCategory(items);
  const { isEditMode, getOverride, setOverride } = useAdmin();

  function resolvedItem(item: BudgetCategory) {
    return {
      ...item,
      category: getOverride<string>(`budget:${item.id}:category`, item.category),
      subcategory: getOverride<string>(`budget:${item.id}:subcategory`, item.subcategory ?? ''),
      estimated: getOverride<number>(`budget:${item.id}:estimated`, item.estimated),
      actual: getOverride<number | undefined>(`budget:${item.id}:actual`, item.actual),
      deposit: getOverride<number | undefined>(`budget:${item.id}:deposit`, item.deposit),
      status: getOverride<BudgetCategory['status']>(`budget:${item.id}:status`, item.status),
      vendor: getOverride<string>(`budget:${item.id}:vendor`, item.vendor ?? ''),
    };
  }

  function cycleStatus(item: BudgetCategory) {
    const current = getOverride<BudgetCategory['status']>(`budget:${item.id}:status`, item.status);
    const idx = statusOrder.indexOf(current);
    setOverride(`budget:${item.id}:status`, statusOrder[(idx + 1) % statusOrder.length]);
  }

  function renameCategory(categoryItems: BudgetCategory[], newValue: string) {
    categoryItems.forEach((item) => setOverride(`budget:${item.id}:category`, newValue));
  }

  const total = items.reduce((sum, i) => sum + resolvedItem(i).estimated, 0);

  return (
    <div>
      {isEditMode && onAdd && (
        <div className="flex justify-end p-3" style={{ borderBottom: '1px solid rgba(176,141,87,0.1)' }}>
          <AddButton label="Agregar ítem" onClick={onAdd} />
        </div>
      )}
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
              <th className="py-3 px-4" />
            </tr>
          </thead>
          <tbody>
            {Object.entries(grouped).map(([category, categoryItems], gi) => (
              <tbody key={`grp-${gi}`}>
                <tr key={`cat-${gi}`}>
                  <td
                    colSpan={showActual ? 7 : 6}
                    className="py-3 px-4 text-xs uppercase tracking-widest font-medium"
                    style={{
                      color: '#B08D57',
                      background: 'rgba(176,141,87,0.05)',
                      borderTop: '1px solid rgba(176,141,87,0.15)',
                    }}
                  >
                    {isEditMode ? (
                      <input
                        style={{ ...inputStyle, color: '#B08D57', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', maxWidth: '20rem' }}
                        defaultValue={category}
                        onBlur={(e) => {
                          if (e.target.value && e.target.value !== category) renameCategory(categoryItems, e.target.value);
                        }}
                      />
                    ) : (
                      category
                    )}
                  </td>
                </tr>
                {categoryItems.map((item, i) => {
                  const r = resolvedItem(item);
                  return (
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
                        {isEditMode ? (
                          <input
                            style={{ ...inputStyle, color: '#D8C3A5', fontSize: '0.875rem' }}
                            defaultValue={r.subcategory || r.category}
                            onBlur={(e) => setOverride(`budget:${item.id}:subcategory`, e.target.value)}
                          />
                        ) : (
                          r.subcategory || r.category
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-xs" style={{ color: '#8E8A86' }}>
                        {isEditMode ? (
                          <input
                            style={{ ...inputStyle, color: '#8E8A86', fontSize: '0.75rem' }}
                            defaultValue={r.vendor}
                            onBlur={(e) => setOverride(`budget:${item.id}:vendor`, e.target.value)}
                          />
                        ) : (r.vendor || '—')}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono" style={{ color: '#D8C3A5' }}>
                        {isEditMode ? (
                          <input
                            type="number"
                            style={{ ...inputStyle, color: '#D8C3A5', fontSize: '0.8rem', width: '7rem', textAlign: 'right' }}
                            defaultValue={r.estimated}
                            onBlur={(e) => setOverride(`budget:${item.id}:estimated`, parseFloat(e.target.value) || r.estimated)}
                          />
                        ) : formatCurrency(r.estimated, rate)}
                      </td>
                      {showActual && (
                        <td className="py-2.5 px-4 text-right font-mono" style={{ color: '#8E8A86' }}>
                          {isEditMode ? (
                            <input
                              type="number"
                              style={{ ...inputStyle, color: '#8E8A86', fontSize: '0.8rem', width: '7rem', textAlign: 'right' }}
                              defaultValue={r.actual ?? ''}
                              onBlur={(e) => setOverride(`budget:${item.id}:actual`, parseFloat(e.target.value))}
                            />
                          ) : formatCurrency(r.actual, rate)}
                        </td>
                      )}
                      <td className="py-2.5 px-4 text-right font-mono text-xs" style={{ color: '#8E8A86' }}>
                        {isEditMode ? (
                          <input
                            type="number"
                            style={{ ...inputStyle, color: '#8E8A86', fontSize: '0.8rem', width: '7rem', textAlign: 'right' }}
                            defaultValue={r.deposit ?? ''}
                            onBlur={(e) => setOverride(`budget:${item.id}:deposit`, parseFloat(e.target.value))}
                          />
                        ) : (
                          <>
                            {r.deposit ? formatCurrency(r.deposit, rate) : '—'}
                            {item.depositPaid && <span className="ml-1 text-xs" style={{ color: '#B08D57' }}>✓</span>}
                          </>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full uppercase tracking-wide ${isEditMode ? 'cursor-pointer' : ''}`}
                          title={isEditMode ? 'Clic para cambiar estado' : undefined}
                          onClick={isEditMode ? () => cycleStatus(item) : undefined}
                          style={{
                            backgroundColor: `${statusColors[r.status]}40`,
                            color: r.status === 'paid' ? '#B08D57' : '#C7C0B6',
                            border: `1px solid ${statusColors[r.status]}60`,
                            fontSize: '0.65rem',
                          }}
                        >
                          {statusText[r.status]}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        {isEditMode && onDelete && (
                          <DeleteButton onClick={() => onDelete(item.id)} title="Eliminar ítem" confirmMessage="¿Eliminar este ítem del presupuesto?" />
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            ))}
          </tbody>
          <tbody>
            {/* Total row */}
            <tr style={{ borderTop: '1px solid rgba(176,141,87,0.3)' }}>
              <td colSpan={2} className="py-4 px-4 text-sm uppercase tracking-widest" style={{ color: '#B08D57' }}>
                Presupuesto Total Estimado
              </td>
              <td className="py-4 px-4 text-right text-lg font-light" style={{ color: '#B08D57', fontFamily: "'Georgia', serif" }}>
                {formatCurrency(total, rate)}
              </td>
              {showActual && <td />}
              <td /><td /><td />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
