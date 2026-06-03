'use client';

import { motion } from 'framer-motion';
import { Vendor } from '@/lib/types';

interface VendorTableProps {
  vendors: Vendor[];
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

export function VendorTable({ vendors }: VendorTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(176,141,87,0.2)' }}>
            {['Rol', 'Empresa', 'Contacto', 'Teléfono', 'Estado', 'Contrato', 'Seña'].map((h) => (
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
                {v.role}
              </td>
              <td className="py-3 px-4 font-medium" style={{ color: '#D8C3A5' }}>
                {v.company}
              </td>
              <td className="py-3 px-4" style={{ color: '#8E8A86' }}>
                <div>{v.contact}</div>
                <div className="text-xs" style={{ color: 'rgba(176,141,87,0.7)' }}>{v.email}</div>
              </td>
              <td className="py-3 px-4 text-xs" style={{ color: '#8E8A86' }}>
                {v.phone}
              </td>
              <td className="py-3 px-4">
                <span
                  className="text-xs px-2 py-0.5 rounded-full uppercase tracking-wide"
                  style={{
                    backgroundColor: `${statusColors[v.status]}40`,
                    color: '#C7C0B6',
                    border: `1px solid ${statusColors[v.status]}60`,
                    fontSize: '0.65rem',
                  }}
                >
                  {statusText[v.status]}
                </span>
              </td>
              <td className="py-3 px-4 text-center text-sm">
                <span style={{ color: v.contractSigned ? '#B08D57' : '#4E1F2D' }}>
                  {v.contractSigned ? '✓' : '○'}
                </span>
              </td>
              <td className="py-3 px-4 text-center text-sm">
                <span style={{ color: v.depositPaid ? '#B08D57' : '#4E1F2D' }}>
                  {v.depositPaid ? '✓' : '○'}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
