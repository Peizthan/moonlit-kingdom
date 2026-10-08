'use client';

import { motion } from 'framer-motion';
import { Vendor } from '@/lib/types';
import { useAdmin } from '@/lib/AdminContext';
import { EditableField } from '@/components/ui/EditableField';
import { AddButton, DeleteButton } from '@/components/ui/ListControls';

interface VendorTableProps {
  vendors: Vendor[];
  readOnly?: boolean;
  onAdd?: () => void;
  onDelete?: (id: string) => void;
}

const statusColors: Record<Vendor['status'], string> = {
  confirmed: '#1D4A3A',
  booked: 'var(--tone-base)',
  enquiry: '#4E1F2D',
  declined: 'var(--tone-muted)',
};

const statusText: Record<Vendor['status'], string> = {
  confirmed: 'Confirmado',
  booked: 'Reservado',
  enquiry: 'Consulta',
  declined: 'Rechazado',
};

const statusOrder: Vendor['status'][] = ['enquiry', 'booked', 'confirmed', 'declined'];

export function VendorTable({ vendors, readOnly = false, onAdd, onDelete }: VendorTableProps) {
  const { isEditMode, getOverride, setOverride } = useAdmin();
  const canEdit = isEditMode && !readOnly;

  function cycleStatus(v: Vendor) {
    const current = getOverride<Vendor['status']>(`vendor:${v.id}:status`, v.status);
    const idx = statusOrder.indexOf(current);
    setOverride(`vendor:${v.id}:status`, statusOrder[(idx + 1) % statusOrder.length]);
  }

  return (
    <div>
      {canEdit && onAdd && (
        <div className="flex justify-end p-3" style={{ borderBottom: '1px solid rgb(var(--tone-line)/0.1)' }}>
          <AddButton label="Agregar proveedor" onClick={onAdd} />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ borderBottom: '1px solid rgb(var(--tone-line)/0.2)' }}>
              {['Rol', 'Empresa', 'Contacto', 'Teléfono', 'Estado', ''].map((h) => (
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
            {vendors.map((v, i) => (
              <motion.tr
                key={v.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="hover:bg-[rgb(var(--tone-line)/0.04)] transition-colors duration-200"
                style={{ borderBottom: '1px solid rgb(var(--tone-line)/0.08)' }}
              >
                <td className="py-3 px-4 text-xs uppercase tracking-wide" style={{ color: 'var(--tone-accent)' }}>
                  {canEdit ? <EditableField id={`vendor:${v.id}:role`} value={v.role} style={{ color: 'var(--tone-accent)', textTransform: 'uppercase', fontSize: '0.75rem' }} /> : getOverride<string>(`vendor:${v.id}:role`, v.role)}
                </td>
                <td className="py-3 px-4 font-medium" style={{ color: 'var(--tone-fg)' }}>
                  {canEdit ? <EditableField id={`vendor:${v.id}:company`} value={v.company} style={{ color: 'var(--tone-fg)', fontWeight: '500' }} /> : <span style={{ color: 'var(--tone-fg)', fontWeight: 500 }}>{getOverride<string>(`vendor:${v.id}:company`, v.company)}</span>}
                </td>
                <td className="py-3 px-4" style={{ color: 'var(--tone-muted)' }}>
                  {canEdit ? <EditableField id={`vendor:${v.id}:contact`} value={v.contact} style={{ color: 'var(--tone-muted)' }} /> : <span style={{ color: 'var(--tone-muted)' }}>{getOverride<string>(`vendor:${v.id}:contact`, v.contact)}</span>}
                  {canEdit ? (
                    <EditableField id={`vendor:${v.id}:email`} value={v.email} tag="div" className="mt-0.5" style={{ color: 'var(--tone-accent)', fontSize: '0.75rem' }} />
                  ) : (
                    <div className="text-xs" style={{ color: 'var(--tone-accent)' }}>{getOverride<string>(`vendor:${v.id}:email`, v.email)}</div>
                  )}
                </td>
                <td className="py-3 px-4 text-xs" style={{ color: 'var(--tone-muted)' }}>
                  {canEdit ? <EditableField id={`vendor:${v.id}:phone`} value={v.phone} style={{ color: 'var(--tone-muted)', fontSize: '0.75rem' }} /> : <span style={{ color: 'var(--tone-muted)', fontSize: '0.75rem' }}>{getOverride<string>(`vendor:${v.id}:phone`, v.phone)}</span>}
                </td>
                <td className="py-3 px-4">
                  {(() => {
                    const s = getOverride<Vendor['status']>(`vendor:${v.id}:status`, v.status);
                    return (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full uppercase tracking-wide ${canEdit ? 'cursor-pointer' : ''}`}
                        title={canEdit ? 'Clic para cambiar estado' : undefined}
                        onClick={canEdit ? () => cycleStatus(v) : undefined}
                        style={{
                          backgroundColor: `${statusColors[s]}40`,
                          color: 'var(--tone-soft)',
                          border: `1px solid ${statusColors[s]}60`,
                          fontSize: '0.65rem',
                        }}
                      >
                        {statusText[s]}
                      </span>
                    );
                  })()}
                </td>
                <td className="py-3 px-4 text-center">
                  {canEdit && onDelete && <DeleteButton onClick={() => onDelete(v.id)} title="Eliminar proveedor" confirmMessage="¿Eliminar este proveedor?" />}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {vendors.length === 0 && (
        <p className="py-12 text-sm text-center" style={{ color: 'var(--tone-muted)' }}>
          Todav?a no hay proveedores. Activ? el modo edici?n para agregar.
        </p>
      )}
    </div>
  );
}
