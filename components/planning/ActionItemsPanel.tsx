'use client';

import { motion } from 'framer-motion';
import { ActionItem } from '@/lib/types';
import { CheckCircle, Clock, AlertCircle, Circle } from 'lucide-react';

interface ActionItemsPanelProps {
  items: ActionItem[];
}

const priorityColors: Record<ActionItem['priority'], string> = {
  high: '#B08D57',
  medium: '#8C6A3C',
  low: '#8E8A86',
};

const statusIcons: Record<ActionItem['status'], React.ReactNode> = {
  complete: <CheckCircle size={14} style={{ color: '#B08D57' }} />,
  'in-progress': <Clock size={14} style={{ color: '#8C6A3C' }} />,
  'not-started': <Circle size={14} style={{ color: '#8E8A86' }} />,
  blocked: <AlertCircle size={14} style={{ color: '#4E1F2D' }} />,
};

const statusBg: Record<ActionItem['status'], string> = {
  complete: 'rgba(176,141,87,0.08)',
  'in-progress': 'rgba(140,106,60,0.1)',
  'not-started': 'rgba(142,138,134,0.06)',
  blocked: 'rgba(78,31,45,0.15)',
};

export function ActionItemsPanel({ items }: ActionItemsPanelProps) {
  const byStatus = {
    'in-progress': items.filter((i) => i.status === 'in-progress'),
    'not-started': items.filter((i) => i.status === 'not-started'),
    complete: items.filter((i) => i.status === 'complete'),
    blocked: items.filter((i) => i.status === 'blocked'),
  };

  return (
    <div className="space-y-2">
      {['in-progress', 'not-started', 'blocked', 'complete'].map((status) => (
        <div key={status}>
          {byStatus[status as ActionItem['status']].map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex gap-4 items-start p-4 rounded-sm mb-2 border transition-all duration-300 hover:border-[rgba(176,141,87,0.25)]"
              style={{
                background: statusBg[item.status],
                borderColor: 'rgba(176,141,87,0.1)',
                opacity: item.status === 'complete' ? 0.6 : 1,
              }}
            >
              <div className="flex-shrink-0 pt-0.5">
                {statusIcons[item.status]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: item.status === 'complete' ? '#8E8A86' : '#D8C3A5',
                      textDecoration: item.status === 'complete' ? 'line-through' : 'none',
                      fontFamily: "'Georgia', serif",
                    }}
                  >
                    {item.title}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full uppercase tracking-wide"
                    style={{
                      background: `${priorityColors[item.priority]}25`,
                      color: priorityColors[item.priority],
                      border: `1px solid ${priorityColors[item.priority]}40`,
                      fontSize: '0.6rem',
                    }}
                  >
                    {item.priority}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full uppercase tracking-wide"
                    style={{
                      background: 'rgba(142,138,134,0.1)',
                      color: '#8E8A86',
                      border: '1px solid rgba(142,138,134,0.2)',
                      fontSize: '0.6rem',
                    }}
                  >
                    {item.category}
                  </span>
                </div>
                {item.description && (
                  <p className="text-xs mb-2" style={{ color: '#8E8A86' }}>{item.description}</p>
                )}
                <div className="flex flex-wrap gap-4 text-xs" style={{ color: 'rgba(176,141,87,0.5)' }}>
                  <span>Responsable: {item.owner}</span>
                  <span>Fecha límite: {item.dueDate}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}
