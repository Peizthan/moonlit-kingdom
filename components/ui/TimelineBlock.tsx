'use client';

import { motion } from 'framer-motion';
import { TimelineEvent } from '@/lib/types';

interface TimelineBlockProps {
  events: TimelineEvent[];
}

const categoryColors: Record<TimelineEvent['category'], string> = {
  ceremony: '#B08D57',
  reception: '#8C6A3C',
  preparation: '#1D4A3A',
  logistics: '#8E8A86',
  entertainment: '#4E1F2D',
};

const categoryLabels: Record<TimelineEvent['category'], string> = {
  ceremony: 'Ceremonia',
  reception: 'Recepción',
  preparation: 'Preparación',
  logistics: 'Logística',
  entertainment: 'Entretenimiento',
};

export function TimelineBlock({ events }: TimelineBlockProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-[88px] top-0 bottom-0 w-px hidden md:block"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(176,141,87,0.3), transparent)' }}
      />
      <div className="space-y-1">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="flex gap-6 items-start py-4 px-4 rounded-sm border border-transparent hover:border-[rgba(176,141,87,0.15)] transition-all duration-300 group"
            style={{ background: 'transparent' }}
          >
            {/* Time */}
            <div
              className="w-16 text-right flex-shrink-0 pt-1"
              style={{ color: '#B08D57', fontFamily: "'Georgia', serif", fontSize: '0.875rem' }}
            >
              {event.time}
            </div>
            {/* Dot */}
            <div className="relative flex-shrink-0 hidden md:flex items-start pt-2">
              <div
                className="w-2 h-2 rounded-full border-2 group-hover:scale-125 transition-transform duration-300"
                style={{
                  borderColor: categoryColors[event.category],
                  background: 'transparent',
                }}
              />
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h4
                  className="font-medium text-sm"
                  style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif" }}
                >
                  {event.title}
                </h4>
                <span
                  className="text-xs px-2 py-0.5 rounded-full uppercase tracking-wide"
                  style={{
                    backgroundColor: `${categoryColors[event.category]}20`,
                    color: categoryColors[event.category],
                    border: `1px solid ${categoryColors[event.category]}40`,
                    fontSize: '0.65rem',
                  }}
                >
                  {categoryLabels[event.category]}
                </span>
              </div>
              <p className="text-sm mb-1" style={{ color: '#8E8A86' }}>
                {event.description}
              </p>
              {event.location && (
                <p className="text-xs" style={{ color: 'rgba(176,141,87,0.6)' }}>
                  ◎ {event.location}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
