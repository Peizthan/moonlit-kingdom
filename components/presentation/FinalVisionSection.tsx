'use client';

import { motion } from 'framer-motion';
import { weddingData } from '@/data/wedding-data';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { StarField } from '@/components/layout/StarField';
import Link from 'next/link';

const { couple, story } = weddingData;

export function FinalVisionSection() {
  return (
    <section
      id="final-vision"
      className="relative py-40 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #10261D 0%, #121C2E 50%, #171515 100%)',
      }}
    >
      <StarField count={80} />

      {/* Centred glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(176,141,87,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-10 animate-float inline-block"
        >
          <span className="text-5xl" style={{ color: 'rgba(176,141,87,0.5)' }}>☽</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.4em] mb-8"
          style={{ color: 'rgba(176,141,87,0.6)' }}
        >
          Visión Final
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-light mb-10 text-glow-gold"
          style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
        >
          Moonlit Kingdom
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl font-light leading-relaxed mb-16 max-w-3xl mx-auto"
          style={{ fontFamily: "'Georgia', serif", color: '#C7C0B6' }}
        >
          {story.vision}
        </motion.p>

        <OrnamentalDivider variant="star" className="max-w-sm mx-auto" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12"
        >
          <p
            className="text-3xl md:text-4xl font-light mb-3"
            style={{ fontFamily: "'Georgia', serif", color: 'rgba(176,141,87,0.6)' }}
          >
            {couple.partner1}
            <span className="mx-6" style={{ color: 'rgba(176,141,87,0.3)' }}>&</span>
            {couple.partner2}
          </p>
          <p className="text-sm uppercase tracking-[0.25em] mb-10" style={{ color: '#8E8A86' }}>
            {couple.weddingDate} · {couple.location}
          </p>

          <Link
            href="/dashboard"
            className="inline-block px-10 py-4 text-xs uppercase tracking-[0.25em] border transition-all duration-400 hover:bg-[rgba(176,141,87,0.1)]"
            style={{
              borderColor: 'rgba(176,141,87,0.4)',
              color: '#B08D57',
            }}
          >
            Abrir Panel de Planificación
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
