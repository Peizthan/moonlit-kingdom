'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { weddingData } from '@/data/wedding-data';

const { colorPalette, story } = weddingData;
const primaryColors = colorPalette.filter((color) => color.role === 'primary');
const accentColors = colorPalette.filter((color) => color.role === 'accent');
const neutralColors = colorPalette.filter((color) => color.role === 'neutral');
const moodGroups = [
  { label: 'El mundo', keywords: story.moodKeywords.slice(0, 3) },
  { label: 'La materia', keywords: story.moodKeywords.slice(3, 6) },
  { label: 'La experiencia', keywords: story.moodKeywords.slice(6, 9) },
];

export function VisionSection() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = (y: number, delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : delay },
  });

  return (
    <section
      id="vision"
      className="relative overflow-hidden px-6 py-24 md:py-32"
      style={{
        background: 'linear-gradient(160deg, #121C2E 0%, #10261D 60%, #171515 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-24 hidden opacity-[0.12] md:block"
      >
        <svg width="220" height="300" viewBox="0 0 220 300" fill="none">
          <path d="M190 290C140 230 166 157 94 99C69 79 43 64 20 10" stroke="#B08D57" />
          <path d="M123 195C86 194 65 175 59 148C88 151 112 167 123 195Z" stroke="#B08D57" />
          <path d="M150 237C177 211 183 183 173 158C151 177 142 206 150 237Z" stroke="#B08D57" />
          <path d="M79 121C48 119 29 100 25 77C49 80 69 95 79 121Z" stroke="#B08D57" />
          <circle cx="37" cy="34" r="2" fill="#B08D57" />
          <circle cx="179" cy="78" r="1.5" fill="#B08D57" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div {...reveal(10)} className="mb-12 md:mb-16">
          <p
            className="mb-4 text-xs uppercase tracking-[0.35em]"
            style={{ color: 'rgba(176,141,87,0.75)' }}
          >
            Capítulo uno
          </p>
          <h2
            className="max-w-3xl text-4xl font-light leading-tight sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
          >
            Visión y Estética
          </h2>
          <div className="mt-7 h-px w-20" style={{ background: 'rgba(176,141,87,0.55)' }} />
        </motion.div>

        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
          <motion.blockquote
            {...reveal(12, 0.08)}
            className="self-start border-l pl-6 sm:pl-8 md:sticky md:top-24 md:pl-10"
            style={{ borderColor: 'rgba(176,141,87,0.45)' }}
          >
            <p
              className="text-3xl font-light italic leading-snug sm:text-4xl md:text-[2.65rem]"
              style={{ fontFamily: "'Georgia', serif", color: '#F3EBDD' }}
            >
              {story.principle.split('\n').map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </p>
            <span
              aria-hidden="true"
              className="mt-7 block h-px w-12"
              style={{ background: 'rgba(176,141,87,0.55)' }}
            />
          </motion.blockquote>

          <div className="space-y-6">
            {story.vision.split('\n\n').map((paragraph, index) => (
              <motion.p
                key={paragraph}
                {...reveal(8, 0.12 + index * 0.06)}
                className="max-w-2xl text-base font-light leading-[1.9] sm:text-lg"
                style={{ color: '#C7C0B6', fontFamily: "'Georgia', serif" }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        {story.manifesto && (
          <motion.p
            {...reveal(8, 0.15)}
            className="mx-auto mt-16 max-w-4xl text-center text-sm uppercase leading-loose tracking-[0.12em] sm:mt-20 sm:text-base sm:tracking-[0.18em]"
            style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif" }}
          >
            {story.manifesto}
          </motion.p>
        )}

        <div className="mx-auto mt-14 max-w-5xl border-y py-8 sm:mt-16 sm:py-10"
          style={{ borderColor: 'rgba(176,141,87,0.2)' }}
        >
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-5">
            {moodGroups.map(({ label, keywords }) => (
              <div key={label} className="text-center sm:text-left">
                <p
                  className="mb-3 text-[0.65rem] uppercase tracking-[0.25em]"
                  style={{ color: 'rgba(176,141,87,0.65)' }}
                >
                  {label}
                </p>
                <p
                  className="text-sm leading-relaxed sm:text-base"
                  style={{ color: '#C7C0B6', fontFamily: "'Georgia', serif" }}
                >
                  {keywords.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-24">
          <OrnamentalDivider variant="star" />

          <div id="palette" className="mt-14 sm:mt-16">
            <motion.h3
              {...reveal(8)}
              className="mb-12 text-center text-xl font-light uppercase tracking-[0.18em] sm:text-2xl"
              style={{ color: '#B08D57', fontFamily: "'Georgia', serif" }}
            >
              La Paleta de Colores
            </motion.h3>

            <ColorGroup label="Primarios" colors={primaryColors} columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-5" />
            <ColorGroup label="Acentos" colors={accentColors} columns="grid-cols-2 sm:grid-cols-4" />
            <ColorGroup label="Neutrales" colors={neutralColors} columns="mx-auto grid-cols-2 max-w-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ColorGroup({
  label,
  colors,
  columns,
}: {
  label: string;
  colors: typeof colorPalette;
  columns: string;
}) {
  return (
    <div className="mb-10 last:mb-0">
      <p
        className="mb-5 text-center text-[0.65rem] uppercase tracking-[0.3em]"
        style={{ color: 'rgba(176,141,87,0.55)' }}
      >
        {label}
      </p>
      <div className={`grid gap-x-5 gap-y-7 ${columns}`}>
        {colors.map((color, index) => (
          <ColorSwatch key={color.name} color={color} delay={index * 0.04} />
        ))}
      </div>
    </div>
  );
}

function ColorSwatch({
  color,
  delay,
}: {
  color: { name: string; hex: string; description: string };
  delay: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : delay }}
      className="group"
    >
      <div
        className="mb-3 aspect-square w-full border"
        style={{ backgroundColor: color.hex, borderColor: 'rgba(176,141,87,0.2)' }}
      />
      <p className="mb-1 text-xs font-medium sm:text-sm" style={{ color: '#D8C3A5' }}>
        {color.name}
      </p>
      <p className="text-xs" style={{ color: '#8E8A86' }}>
        {color.hex}
      </p>
      <p className="mt-2 text-xs leading-snug text-pretty" style={{ color: 'rgba(199,192,182,0.8)' }}>
        {color.description}
      </p>
    </motion.div>
  );
}
