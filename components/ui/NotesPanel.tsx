'use client';

import { motion } from 'framer-motion';
import { MeetingNote } from '@/lib/types';

interface NotesPanelProps {
  notes: MeetingNote[];
}

export function NotesPanel({ notes }: NotesPanelProps) {
  return (
    <div className="space-y-6">
      {notes.map((note, i) => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="rounded-sm border p-6"
          style={{
            borderColor: 'rgba(176,141,87,0.15)',
            background: 'linear-gradient(135deg, rgba(29,74,58,0.15) 0%, rgba(18,28,46,0.25) 100%)',
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-medium mb-1" style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif" }}>
                {note.title}
              </h3>
              <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(176,141,87,0.6)' }}>
                {note.date}
              </p>
            </div>
            <div className="text-xs" style={{ color: '#8E8A86' }}>
              {note.attendees.join(' · ')}
            </div>
          </div>

          <p className="text-sm mb-4 leading-relaxed" style={{ color: '#8E8A86' }}>
            {note.summary}
          </p>

          {note.decisions.length > 0 && (
            <div className="mb-3">
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#B08D57' }}>
                Decisiones Tomadas
              </p>
              <ul className="space-y-1">
                {note.decisions.map((d, di) => (
                  <li key={di} className="flex gap-2 text-sm" style={{ color: '#C7C0B6' }}>
                    <span style={{ color: 'rgba(176,141,87,0.5)' }}>◆</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {note.actionItems.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#B08D57' }}>
                Acciones a Tomar
              </p>
              <ul className="space-y-1">
                {note.actionItems.map((a, ai) => (
                  <li key={ai} className="flex gap-2 text-sm" style={{ color: '#C7C0B6' }}>
                    <span style={{ color: 'rgba(176,141,87,0.5)' }}>→</span>
                    {a}
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
