'use client';

import { motion } from 'framer-motion';
import { MeetingNote } from '@/lib/types';
import { useAdmin } from '@/lib/AdminContext';
import { EditableField } from '@/components/ui/EditableField';
import { AddButton, DeleteButton } from '@/components/ui/ListControls';

interface NotesPanelProps {
  notes: MeetingNote[];
  onAdd?: () => void;
  onDelete?: (id: string) => void;
}

export function NotesPanel({ notes, onAdd, onDelete }: NotesPanelProps) {
  const { isEditMode, getOverride } = useAdmin();
  return (
    <div className="space-y-6">
      {isEditMode && onAdd && (
        <div className="flex justify-end">
          <AddButton label="Agregar acta" onClick={onAdd} />
        </div>
      )}
      {notes.length === 0 && (
        <p className="py-12 text-sm text-center" style={{ color: 'var(--tone-muted)' }}>
          Todav?a no hay actas. Activ? el modo edici?n para agregar.
        </p>
      )}
      {notes.map((note, i) => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="rounded-sm border p-6"
          style={{
            borderColor: 'rgb(var(--tone-line)/0.15)',
            background: 'linear-gradient(135deg, rgba(29,74,58,0.15) 0%, rgb(var(--tone-surface)/0.25) 100%)',
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-medium mb-1" style={{ color: 'var(--tone-fg)', fontFamily: 'var(--mk-font-display)' }}>
                <EditableField id={`note:${note.id}:title`} value={note.title} style={{ color: 'var(--tone-fg)', fontFamily: 'var(--mk-font-display)', fontWeight: '500' }} />
              </h3>
              <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--tone-accent)' }}>
                {note.date}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs" style={{ color: 'var(--tone-muted)' }}>
                {note.attendees.join(' · ')}
              </div>
              {isEditMode && onDelete && (
                <DeleteButton onClick={() => onDelete(note.id)} title="Eliminar acta" confirmMessage="¿Eliminar esta acta?" />
              )}
            </div>
          </div>

          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--tone-muted)' }}>
            <EditableField id={`note:${note.id}:summary`} value={note.summary} type="textarea" style={{ color: 'var(--tone-muted)', fontSize: '0.875rem' }} />
          </p>

          {note.decisions.length > 0 && (
            <div className="mb-3">
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--tone-accent)' }}>
                Decisiones Tomadas
              </p>
              <ul className="space-y-1">
                {note.decisions.map((d, di) => (
                  <li key={di} className="flex gap-2 text-sm" style={{ color: 'var(--tone-soft)' }}>
                    <span style={{ color: 'var(--tone-accent)' }}>◆</span>
                    <EditableField id={`note:${note.id}:decision:${di}`} value={d} style={{ color: 'var(--tone-soft)', fontSize: '0.875rem' }} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {note.actionItems.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--tone-accent)' }}>
                Acciones a Tomar
              </p>
              <ul className="space-y-1">
                {note.actionItems.map((a, ai) => (
                  <li key={ai} className="flex gap-2 text-sm" style={{ color: 'var(--tone-soft)' }}>
                    <span style={{ color: 'var(--tone-accent)' }}>→</span>
                    <EditableField id={`note:${note.id}:action:${ai}`} value={a} style={{ color: 'var(--tone-soft)', fontSize: '0.875rem' }} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
