'use client';

import { motion } from 'framer-motion';
import { SeatingTable } from '@/lib/types';

interface SeatingPlanProps {
  tables: SeatingTable[];
}

export function SeatingPlan({ tables }: SeatingPlanProps) {
  return (
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
                {table.tableName}
              </h3>
              <p className="text-xs uppercase tracking-widest mt-0.5" style={{ color: 'rgba(176,141,87,0.5)' }}>
                Table {table.tableNumber}
              </p>
            </div>
            <div
              className="flex flex-col items-end text-xs"
              style={{ color: '#8E8A86' }}
            >
              <span style={{ color: '#B08D57' }}>{table.guests.length}</span>
              <span>/ {table.capacity} seats</span>
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
                width: `${(table.guests.length / table.capacity) * 100}%`,
                background: 'linear-gradient(to right, #B08D57, #8C6A3C)',
              }}
            />
          </div>

          <ul className="space-y-1">
            {table.guests.map((guest) => (
              <li
                key={guest}
                className="flex items-center gap-2 text-sm"
                style={{ color: '#C7C0B6' }}
              >
                <span style={{ color: 'rgba(176,141,87,0.3)', fontSize: '0.5rem' }}>◆</span>
                {guest}
              </li>
            ))}
          </ul>

          {table.notes && (
            <p className="mt-4 text-xs italic" style={{ color: 'rgba(176,141,87,0.4)' }}>
              {table.notes}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
