'use client';

import { motion } from 'framer-motion';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { weddingData } from '@/data/wedding-data';

const { story, couple } = weddingData;

export function StorySection() {
  return (
    <section
      id="story"
      className="relative py-32 px-6"
      style={{
        background: 'linear-gradient(160deg, #10261D 0%, #121C2E 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-xs uppercase tracking-[0.35em] mb-8"
          style={{ color: 'rgba(176,141,87,0.7)' }}
        >
          Capítulo Uno
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center text-4xl md:text-6xl font-light mb-16"
          style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
        >
          Nuestra Historia
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* How We Met */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span style={{ color: '#B08D57', fontSize: '1.2rem' }}>✦</span>
              <h3
                className="text-lg font-light uppercase tracking-[0.15em]"
                style={{ color: '#B08D57' }}
              >
                Cómo Nos Conocimos
              </h3>
            </div>
            <p
              className="text-base leading-loose"
              style={{ color: '#C7C0B6', fontFamily: "'Georgia', serif" }}
            >
              {story.howWeMet}
            </p>
          </motion.div>

          {/* The Proposal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span style={{ color: '#B08D57', fontSize: '1.2rem' }}>☽</span>
              <h3
                className="text-lg font-light uppercase tracking-[0.15em]"
                style={{ color: '#B08D57' }}
              >
                La Propuesta
              </h3>
            </div>
            <p
              className="text-base leading-loose"
              style={{ color: '#C7C0B6', fontFamily: "'Georgia', serif" }}
            >
              {story.proposal}
            </p>
          </motion.div>
        </div>

        <OrnamentalDivider variant="floral" className="mt-16" />

        {/* Names */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center mt-4"
        >
          <p
            className="text-3xl md:text-4xl font-light"
            style={{ fontFamily: "'Georgia', serif", color: 'rgba(176,141,87,0.5)' }}
          >
            {couple.partner1}
            <span className="mx-6" style={{ color: 'rgba(176,141,87,0.3)' }}>&</span>
            {couple.partner2}
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.25em]" style={{ color: '#8E8A86' }}>
            {couple.weddingDate}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
