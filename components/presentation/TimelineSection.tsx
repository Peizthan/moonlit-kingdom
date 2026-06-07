'use client';

import { motion } from 'framer-motion';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { TimelineBlock } from '@/components/ui/TimelineBlock';
import { weddingData } from '@/data/wedding-data';

const { timeline } = weddingData;

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative py-32 px-6"
      style={{
        background: 'linear-gradient(160deg, #121C2E 0%, #10261D 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-xs uppercase tracking-[0.35em] mb-8"
          style={{ color: 'rgba(176,141,87,0.7)' }}
        >
          Capítulo Tres
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center text-4xl md:text-6xl font-light mb-6"
          style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
        >
          Programa del Día
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center text-sm uppercase tracking-[0.2em] mb-16"
          style={{ color: '#8E8A86' }}
        >
          Sábado, 21 de agosto de 2027 · Salón Veteranos, Club Centenario
        </motion.p>

        <div
          className="rounded-sm border p-6 md:p-10"
          style={{
            borderColor: 'rgba(176,141,87,0.15)',
            background: 'rgba(18,28,46,0.3)',
          }}
        >
          <TimelineBlock events={timeline} />
        </div>
      </div>

      <OrnamentalDivider variant="star" className="max-w-3xl mx-auto mt-12" />
    </section>
  );
}
