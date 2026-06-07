'use client';

import { motion } from 'framer-motion';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { weddingData } from '@/data/wedding-data';

const { colorPalette, story } = weddingData;

const primaryColors = colorPalette.filter((c) => c.role === 'primary');
const accentColors = colorPalette.filter((c) => c.role === 'accent');
const neutralColors = colorPalette.filter((c) => c.role === 'neutral');

export function VisionSection() {
  return (
    <section
      id="vision"
      className="relative py-32 px-6"
      style={{
        background: 'linear-gradient(160deg, #121C2E 0%, #10261D 60%, #171515 100%)',
      }}
    >
      {/* Subtle radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(176,141,87,0.04) 0%, transparent 70%)',
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
          Capítulo Uno
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center text-4xl md:text-6xl font-light mb-8"
          style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
        >
          Visión y Estética
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-16"
          style={{ color: '#8E8A86', fontFamily: "'Georgia', serif" }}
        >
          {story.vision}
        </motion.p>

        {/* Mood keywords */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-20"
        >
          {story.moodKeywords.map((kw, i) => (
            <motion.span
              key={kw}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="text-xs uppercase tracking-widest px-5 py-2 rounded-full border"
              style={{
                borderColor: 'rgba(176,141,87,0.25)',
                color: 'rgba(176,141,87,0.8)',
                background: 'rgba(176,141,87,0.05)',
              }}
            >
              {kw}
            </motion.span>
          ))}
        </motion.div>

        <OrnamentalDivider variant="star" />

        {/* Color Palette */}
        <div id="palette" className="mt-16">
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center text-2xl font-light mb-12 uppercase tracking-[0.15em]"
            style={{ color: '#B08D57' }}
          >
            La Paleta de Colores
          </motion.h3>

          {/* Primary */}
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] mb-6 text-center" style={{ color: 'rgba(176,141,87,0.5)' }}>
              Primarios
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {primaryColors.map((c, i) => (
                <ColorSwatch key={c.name} color={c} delay={i * 0.07} />
              ))}
            </div>
          </div>

          {/* Accents */}
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] mb-6 text-center" style={{ color: 'rgba(176,141,87,0.5)' }}>
              Acentos
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {accentColors.map((c, i) => (
                <ColorSwatch key={c.name} color={c} delay={i * 0.07} />
              ))}
            </div>
          </div>

          {/* Neutrals */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-6 text-center" style={{ color: 'rgba(176,141,87,0.5)' }}>
              Neutrales
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              {neutralColors.map((c, i) => (
                <ColorSwatch key={c.name} color={c} delay={i * 0.07} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ColorSwatch({
  color,
  delay,
}: {
  color: { name: string; hex: string; description: string };
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div
        className="w-full aspect-square rounded-sm mb-3 border transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: color.hex, borderColor: 'rgba(176,141,87,0.15)' }}
      />
      <p
        className="text-xs font-medium mb-1"
        style={{ color: '#D8C3A5' }}
      >
        {color.name}
      </p>
      <p className="text-xs mb-1" style={{ color: '#8E8A86' }}>
        {color.hex}
      </p>
      <p className="text-xs leading-snug hidden group-hover:block" style={{ color: 'rgba(142,138,134,0.8)' }}>
        {color.description}
      </p>
    </motion.div>
  );
}
