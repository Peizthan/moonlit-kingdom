'use client';

import { motion } from 'framer-motion';
import { ActionItem } from '@/lib/types';
import { CheckCircle, Clock, AlertCircle, Circle } from 'lucide-react';
import { useAdmin } from '@/lib/AdminContext';
import { EditableField } from '@/components/ui/EditableField';
import { AddButton, DeleteButton } from '@/components/ui/ListControls';

interface ActionItemsPanelProps {
  items: ActionItem[];
  onAdd?: () => void;
  onDelete?: (id: string) => void;
}

const priorityColors: Record<ActionItem['priority'], string> = {
  high: 'var(--tone-accent)',
  medium: '#8C6A3C',
  low: 'var(--tone-muted)',
};

const statusIcons: Record<ActionItem['status'], React.ReactNode> = {
  complete: <CheckCircle size={14} style={{ color: 'var(--tone-accent)' }} />,
  'in-progress': <Clock size={14} style={{ color: '#8C6A3C' }} />,
  'not-started': <Circle size={14} style={{ color: 'var(--tone-muted)' }} />,
  blocked: <AlertCircle size={14} style={{ color: '#4E1F2D' }} />,
};

const statusBg: Record<ActionItem['status'], string> = {
  complete: 'rgb(var(--tone-line)/0.08)',
  'in-progress': 'rgba(140,106,60,0.1)',
  'not-started': 'rgb(var(--tone-line)/0.06)',
  blocked: 'rgba(78,31,45,0.15)',
};

const statusOrder: ActionItem['status'][] = ['not-started', 'in-progress', 'complete', 'blocked'];

export function ActionItemsPanel({ items, onAdd, onDelete }: ActionItemsPanelProps) {
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
      {isEditMode && onAdd && (
        <div className="flex justify-end mb-2">
          <AddButton label="Agregar acción" onClick={onAdd} />
        </div>
      )}
      {displayList.length === 0 && (
        <p className="py-12 text-sm text-center" style={{ color: 'var(--tone-muted)' }}>
          Todav?a no hay acciones. Activ? el modo edici?n para agregar.
        </p>
      )}
      {displayList.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="flex gap-4 items-start p-4 rounded-sm mb-2 border transition-all duration-300 hover:border-[rgb(var(--tone-line)/0.25)]"
          style={{
            background: statusBg[item.status],
            borderColor: 'rgb(var(--tone-line)/0.1)',
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
                  color: item.status === 'complete' && !isEditMode ? 'var(--tone-muted)' : 'var(--tone-fg)',
                  textDecoration: !isEditMode && item.status === 'complete' ? 'line-through' : 'none',
                  fontFamily: 'var(--mk-font-display)',
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
                  background: 'rgb(var(--tone-line)/0.1)',
                  color: 'var(--tone-muted)',
                  border: '1px solid rgb(var(--tone-line)/0.2)',
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
                    color: 'var(--tone-accent)',
                    border: '1px solid rgb(var(--tone-line)/0.3)',
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
                style={{ color: 'var(--tone-muted)', fontSize: '0.75rem' }}
              />
            )}

            <div className="flex flex-wrap gap-4 text-xs mt-2" style={{ color: 'var(--tone-accent)' }}>
              <span>
                Responsable:{' '}
                <EditableField
                  id={`action:${item.id}:owner`}
                  value={item.owner}
                  style={{ color: 'var(--tone-accent)', fontSize: '0.75rem', display: 'inline' }}
                />
              </span>
              <span>
                Fecha límite:{' '}
                <EditableField
                  id={`action:${item.id}:dueDate`}
                  value={item.dueDate}
                  style={{ color: 'var(--tone-accent)', fontSize: '0.75rem', display: 'inline' }}
                />
              </span>
            </div>
          </div>

          {isEditMode && onDelete && (
            <DeleteButton onClick={() => onDelete(item.id)} title="Eliminar acción" confirmMessage="¿Eliminar esta acción?" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
