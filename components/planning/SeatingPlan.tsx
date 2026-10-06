'use client';

import { motion } from 'framer-motion';
import { SeatingTable } from '@/lib/types';
import { useAdmin } from '@/lib/AdminContext';
import { EditableField } from '@/components/ui/EditableField';
import { AddButton, DeleteButton } from '@/components/ui/ListControls';

interface SeatingPlanProps {
  tables: SeatingTable[];
  onAdd?: () => void;
  onDelete?: (id: string) => void;
}

export function SeatingPlan({ tables, onAdd, onDelete }: SeatingPlanProps) {
  const { isEditMode, getOverride, setOverride } = useAdmin();

  const guestsKey = (t: SeatingTable) => `seating:${t.id}:guests`;
  const guestsOf = (t: SeatingTable) => getOverride<string[]>(guestsKey(t), t.guests);
  const capacityOf = (t: SeatingTable) => getOverride<number>(`seating:${t.id}:capacity`, t.capacity);

  function addGuest(t: SeatingTable) {
    setOverride(guestsKey(t), [...guestsOf(t), '']);
  }
  function updateGuest(t: SeatingTable, index: number, name: string) {
    setOverride(guestsKey(t), guestsOf(t).map((g, i) => (i === index ? name : g)));
  }
  function removeGuest(t: SeatingTable, index: number) {
    setOverride(guestsKey(t), guestsOf(t).filter((_, i) => i !== index));
  }

  return (
    <div>
      {isEditMode && onAdd && (
        <div className="flex justify-end mb-4">
          <AddButton label="Agregar mesa" onClick={onAdd} />
        </div>
      )}
      {tables.length === 0 && (
        <p className="py-12 text-sm text-center" style={{ color: '#8E8A86' }}>
          Todav?a no hay mesas. Activ? el modo edici?n para agregar.
        </p>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tables.map((table, i) => (
          <motion.div
            key={table.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-sm border p-5"
            style={{
              borderColor: 'rgba(176,141,87,0.2)',
              background: 'linear-gradient(135deg, rgba(29,74,58,0.2) 0%, rgba(18,28,46,0.3) 100%)',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3
                  className="text-base font-medium"
                  style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif" }}
                >
                  <EditableField id={`seating:${table.id}:tableName`} value={table.tableName} style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif", fontWeight: '500' }} />
                </h3>
                <p className="text-xs uppercase tracking-widest mt-0.5" style={{ color: 'rgba(176,141,87,0.5)' }}>
                  Mesa {table.tableNumber}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="flex flex-col items-end text-xs"
                  style={{ color: '#8E8A86' }}
                >
                  <span style={{ color: '#B08D57' }}>{guestsOf(table).length}</span>
                  <span className="flex items-center gap-1">
                    /{' '}
                    <EditableField
                      id={`seating:${table.id}:capacity`}
                      value={table.capacity}
                      type="number"
                      style={{ color: '#8E8A86', fontSize: '0.75rem', width: '3.5rem' }}
                    />{' '}
                    lugares
                  </span>
                </div>
                {isEditMode && onDelete && (
                  <DeleteButton onClick={() => onDelete(table.id)} title="Eliminar mesa" confirmMessage="¿Eliminar esta mesa?" />
                )}
              </div>
            </div>

            {/* Guest capacity bar */}
            <div
              className="h-1 rounded-full mb-4 overflow-hidden"
              style={{ background: 'rgba(176,141,87,0.1)' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${capacityOf(table) > 0 ? Math.min(100, (guestsOf(table).length / capacityOf(table)) * 100) : 0}%`,
                  background: 'linear-gradient(to right, #B08D57, #8C6A3C)',
                }}
              />
            </div>

            <ul className="space-y-1">
              {guestsOf(table).map((guest, gi) => (
                <li
                  key={gi}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: '#C7C0B6' }}
                >
                  <span style={{ color: 'rgba(176,141,87,0.3)', fontSize: '0.5rem' }}>◆</span>
                  {isEditMode ? (
                    <>
                      <input
                        type="text"
                        defaultValue={guest}
                        placeholder="Nombre del invitado"
                        onBlur={(e) => updateGuest(table, gi, e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLElement).blur()}
                        className="flex-1 min-w-0"
                        style={{
                          background: 'rgba(176,141,87,0.06)',
                          border: '1px solid rgba(176,141,87,0.4)',
                          borderRadius: '2px',
                          padding: '2px 6px',
                          outline: 'none',
                          color: '#C7C0B6',
                          fontSize: '0.875rem',
                        }}
                      />
                      <DeleteButton onClick={() => removeGuest(table, gi)} title="Quitar invitado" confirmMessage="¿Quitar este invitado?" />
                    </>
                  ) : (
                    <span>{guest}</span>
                  )}
                </li>
              ))}
            </ul>

            {isEditMode && (
              <div className="mt-3">
                <AddButton label="Agregar invitado" onClick={() => addGuest(table)} />
              </div>
            )}

            {(table.notes || isEditMode) && (
              <p className="mt-4 text-xs italic" style={{ color: 'rgba(176,141,87,0.4)' }}>
                <EditableField id={`seating:${table.id}:notes`} value={table.notes ?? ''} type="textarea" style={{ color: 'rgba(176,141,87,0.4)', fontSize: '0.75rem', fontStyle: 'italic' }} />
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
