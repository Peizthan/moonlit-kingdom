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
  booked: '#121C2E',
  enquiry: '#4E1F2D',
  declined: '#8E8A86',
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

  function toggleBool(v: Vendor, field: 'contractSigned' | 'depositPaid') {
    const current = getOverride<boolean>(`vendor:${v.id}:${field}`, v[field]);
    setOverride(`vendor:${v.id}:${field}`, !current);
  }

  return (
    <div>
      {canEdit && onAdd && (
        <div className="flex justify-end p-3" style={{ borderBottom: '1px solid rgba(176,141,87,0.1)' }}>
          <AddButton label="Agregar proveedor" onClick={onAdd} />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(176,141,87,0.2)' }}>
              {['Rol', 'Empresa', 'Contacto', 'Teléfono', 'Estado', 'Contrato', 'Seña', ''].map((h) => (
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
            {vendors.map((v, i) => (
              <motion.tr
                key={v.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="hover:bg-[rgba(176,141,87,0.04)] transition-colors duration-200"
                style={{ borderBottom: '1px solid rgba(176,141,87,0.08)' }}
              >
                <td className="py-3 px-4 text-xs uppercase tracking-wide" style={{ color: '#B08D57' }}>
                  {canEdit ? <EditableField id={`vendor:${v.id}:role`} value={v.role} style={{ color: '#B08D57', textTransform: 'uppercase', fontSize: '0.75rem' }} /> : getOverride<string>(`vendor:${v.id}:role`, v.role)}
                </td>
                <td className="py-3 px-4 font-medium" style={{ color: '#D8C3A5' }}>
                  {canEdit ? <EditableField id={`vendor:${v.id}:company`} value={v.company} style={{ color: '#D8C3A5', fontWeight: '500' }} /> : <span style={{ color: '#D8C3A5', fontWeight: 500 }}>{getOverride<string>(`vendor:${v.id}:company`, v.company)}</span>}
                </td>
                <td className="py-3 px-4" style={{ color: '#8E8A86' }}>
                  {canEdit ? <EditableField id={`vendor:${v.id}:contact`} value={v.contact} style={{ color: '#8E8A86' }} /> : <span style={{ color: '#8E8A86' }}>{getOverride<string>(`vendor:${v.id}:contact`, v.contact)}</span>}
                  {canEdit ? (
                    <EditableField id={`vendor:${v.id}:email`} value={v.email} tag="div" className="mt-0.5" style={{ color: 'rgba(176,141,87,0.7)', fontSize: '0.75rem' }} />
                  ) : (
                    <div className="text-xs" style={{ color: 'rgba(176,141,87,0.7)' }}>{getOverride<string>(`vendor:${v.id}:email`, v.email)}</div>
                  )}
                </td>
                <td className="py-3 px-4 text-xs" style={{ color: '#8E8A86' }}>
                  {canEdit ? <EditableField id={`vendor:${v.id}:phone`} value={v.phone} style={{ color: '#8E8A86', fontSize: '0.75rem' }} /> : <span style={{ color: '#8E8A86', fontSize: '0.75rem' }}>{getOverride<string>(`vendor:${v.id}:phone`, v.phone)}</span>}
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
                          color: '#C7C0B6',
                          border: `1px solid ${statusColors[s]}60`,
                          fontSize: '0.65rem',
                        }}
                      >
                        {statusText[s]}
                      </span>
                    );
                  })()}
                </td>
                <td className="py-3 px-4 text-center text-sm">
                  {(() => {
                    const signed = getOverride<boolean>(`vendor:${v.id}:contractSigned`, v.contractSigned);
                    return (
                      <span
                        className={canEdit ? 'cursor-pointer' : ''}
                        title={canEdit ? 'Clic para alternar' : undefined}
                        onClick={canEdit ? () => toggleBool(v, 'contractSigned') : undefined}
                        style={{ color: signed ? '#B08D57' : '#4E1F2D' }}
                      >
                        {signed ? '✓' : '○'}
                      </span>
                    );
                  })()}
                </td>
                <td className="py-3 px-4 text-center text-sm">
                  {(() => {
                    const paid = getOverride<boolean>(`vendor:${v.id}:depositPaid`, v.depositPaid);
                    return (
                      <span
                        className={canEdit ? 'cursor-pointer' : ''}
                        title={canEdit ? 'Clic para alternar' : undefined}
                        onClick={canEdit ? () => toggleBool(v, 'depositPaid') : undefined}
                        style={{ color: paid ? '#B08D57' : '#4E1F2D' }}
                      >
                        {paid ? '✓' : '○'}
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
    </div>
  );
}
