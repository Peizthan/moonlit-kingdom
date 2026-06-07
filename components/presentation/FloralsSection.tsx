'use client';

import { motion } from 'framer-motion';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { weddingData } from '@/data/wedding-data';

const { florals } = weddingData;

export function FloralsSection() {
  return (
    <section
      id="florals"
      className="relative py-32 px-6"
      style={{
        background: 'linear-gradient(160deg, #10261D 0%, #1D4A3A 40%, #10261D 100%)',
      }}
    >
      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(16,38,29,0.7) 100%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-xs uppercase tracking-[0.35em] mb-8"
          style={{ color: 'rgba(176,141,87,0.7)' }}
        >
          Capítulo Cuatro
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center text-4xl md:text-6xl font-light mb-16"
          style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
        >
          Flores y Decoración
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {florals.map((floral, i) => (
            <motion.div
              key={floral.area}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-sm border p-6 group hover:border-[rgba(176,141,87,0.3)] transition-all duration-400"
              style={{
                borderColor: 'rgba(176,141,87,0.15)',
                background: 'linear-gradient(135deg, rgba(16,38,29,0.6) 0%, rgba(18,28,46,0.4) 100%)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span style={{ color: 'rgba(176,141,87,0.5)' }}>✿</span>
                <h3
                  className="text-base font-medium"
                  style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif" }}
                >
                  {floral.area}
                </h3>
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ color: '#8E8A86' }}>
                {floral.description}
              </p>

              <div className="mb-3">
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(176,141,87,0.5)' }}>
                  Flores
                </p>
                <div className="flex flex-wrap gap-1">
                  {floral.flowers.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(176,141,87,0.08)',
                        border: '1px solid rgba(176,141,87,0.15)',
                        color: '#C7C0B6',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(176,141,87,0.5)' }}>
                  Follaje
                </p>
                <div className="flex flex-wrap gap-1">
                  {floral.foliage.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(29,74,58,0.3)',
                        border: '1px solid rgba(29,74,58,0.5)',
                        color: '#8E8A86',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {floral.notes && (
                <p className="mt-4 text-xs italic" style={{ color: 'rgba(176,141,87,0.5)' }}>
                  Nota: {floral.notes}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <OrnamentalDivider variant="floral" className="max-w-6xl mx-auto mt-16" />
    </section>
  );
}
