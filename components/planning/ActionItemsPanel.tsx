'use client';

import { motion } from 'framer-motion';
import { ActionItem } from '@/lib/types';
import { CheckCircle, Clock, AlertCircle, Circle } from 'lucide-react';
import { useAdmin } from '@/lib/AdminContext';
import { EditableField } from '@/components/ui/EditableField';

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

const statusOrder: ActionItem['status'][] = ['not-started', 'in-progress', 'complete', 'blocked'];

export function ActionItemsPanel({ items }: ActionItemsPanelProps) {
  const { isEditMode, getOverride, setOverride } = useAdmin();

  // In edit mode show flat list; in view mode group by status
  const resolved = items.map((item) => ({
    ...item,
    status: getOverride<ActionItem['status']>(`action:${item.id}:status`, item.status),
    title: getOverride<string>(`action:${item.id}:title`, item.title),
    description: getOverride<string>(`action:${item.id}:description`, item.description ?? ''),
    owner: getOverride<string>(`action:${item.id}:owner`, item.owner),
    dueDate: getOverride<string>(`action:${item.id}:dueDate`, item.dueDate),
  }));

  function cycleStatus(item: typeof resolved[0]) {
    const idx = statusOrder.indexOf(item.status);
    setOverride(`action:${item.id}:status`, statusOrder[(idx + 1) % statusOrder.length]);
  }

  const byStatus = {
    'in-progress': resolved.filter((i) => i.status === 'in-progress'),
    'not-started': resolved.filter((i) => i.status === 'not-started'),
    blocked: resolved.filter((i) => i.status === 'blocked'),
    complete: resolved.filter((i) => i.status === 'complete'),
  };

  const displayList = isEditMode
    ? resolved
    : ['in-progress', 'not-started', 'blocked', 'complete'].flatMap(
        (s) => byStatus[s as ActionItem['status']],
      );

  return (
    <div className="space-y-2">
      {displayList.map((item, i) => (
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
            opacity: !isEditMode && item.status === 'complete' ? 0.6 : 1,
          }}
        >
          {/* Status icon — clickable in edit mode */}
          <div
            className={`flex-shrink-0 pt-0.5 ${isEditMode ? 'cursor-pointer' : ''}`}
            title={isEditMode ? 'Clic para cambiar estado' : undefined}
            onClick={isEditMode ? () => cycleStatus(item) : undefined}
          >
            {statusIcons[item.status]}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <EditableField
                id={`action:${item.id}:title`}
                value={item.title}
                tag="span"
                style={{
                  color: item.status === 'complete' && !isEditMode ? '#8E8A86' : '#D8C3A5',
                  textDecoration: !isEditMode && item.status === 'complete' ? 'line-through' : 'none',
                  fontFamily: "'Georgia', serif",
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              />
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
              {isEditMode && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full uppercase tracking-wide cursor-pointer"
                  style={{
                    background: statusBg[item.status],
                    color: '#B08D57',
                    border: '1px solid rgba(176,141,87,0.3)',
                    fontSize: '0.6rem',
                  }}
                  onClick={() => cycleStatus(item)}
                  title="Clic para cambiar estado"
                >
                  {item.status}
                </span>
              )}
            </div>

            {(item.description || isEditMode) && (
              <EditableField
                id={`action:${item.id}:description`}
                value={item.description}
                type="textarea"
                tag="p"
                style={{ color: '#8E8A86', fontSize: '0.75rem' }}
              />
            )}

            <div className="flex flex-wrap gap-4 text-xs mt-2" style={{ color: 'rgba(176,141,87,0.5)' }}>
              <span>
                Responsable:{' '}
                <EditableField
                  id={`action:${item.id}:owner`}
                  value={item.owner}
                  style={{ color: 'rgba(176,141,87,0.5)', fontSize: '0.75rem', display: 'inline' }}
                />
              </span>
              <span>
                Fecha límite:{' '}
                <EditableField
                  id={`action:${item.id}:dueDate`}
                  value={item.dueDate}
                  style={{ color: 'rgba(176,141,87,0.5)', fontSize: '0.75rem', display: 'inline' }}
                />
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
