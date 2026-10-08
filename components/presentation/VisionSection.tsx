'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { ChapterHeading } from '@/components/brand/ChapterHeading';
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
      className="relative overflow-hidden px-6 pb-24 pt-6 md:pb-32"
    >
      <div className="relative mx-auto max-w-6xl">
        <ChapterHeading eyebrow="Capítulo uno" title="Visión y Estética" />
        <div className="mb-12 md:mb-16" />

        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
          <motion.blockquote
            {...reveal(12, 0.08)}
            className="self-start border-l pl-6 sm:pl-8 md:sticky md:top-24 md:pl-10"
            style={{ borderColor: 'var(--tone-rule)' }}
          >
            <p className="mk-quote text-[clamp(2rem,5vw,3.1rem)]">
              {story.principle.split('\n').map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </p>
            <span aria-hidden="true" className="mk-rule mt-7 w-12" />
          </motion.blockquote>

          <div className="space-y-6">
            {story.vision.split('\n\n').map((paragraph, index) => (
              <motion.p
                key={paragraph}
                {...reveal(8, 0.12 + index * 0.06)}
                className="mk-prose max-w-2xl"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        {story.manifesto && (
          <motion.p
            {...reveal(8, 0.15)}
            className="mk-chapter-title mx-auto mt-16 max-w-4xl text-center text-[clamp(1.3rem,3vw,1.9rem)] uppercase leading-relaxed tracking-[0.1em] sm:mt-20"
            style={{ fontWeight: 600, color: 'var(--tone-fg)' }}
          >
            {story.manifesto}
          </motion.p>
        )}

        <div className="mx-auto mt-14 max-w-5xl border-y py-8 sm:mt-16 sm:py-10"
          style={{ borderColor: 'var(--tone-rule)' }}
        >
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-5">
            {moodGroups.map(({ label, keywords }) => (
              <div key={label} className="text-center sm:text-left">
                <p className="mk-label mb-3">{label}</p>
                <p className="mk-prose" style={{ fontSize: '1.2rem', lineHeight: 1.5 }}>
                  {keywords.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-24">
          <OrnamentalDivider variant="star" />

          <div id="palette" className="mt-14 scroll-mt-24 sm:mt-16">
            <motion.h3
              {...reveal(8)}
              className="mk-chapter-title mb-12 text-center text-[clamp(1.7rem,4vw,2.5rem)]"
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
      <p className="mk-label mb-5 text-center">{label}</p>
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
        style={{ backgroundColor: color.hex, borderColor: 'var(--tone-rule)' }}
      />
      <p className="mb-1 text-sm font-semibold" style={{ color: 'var(--tone-strong)' }}>
        {color.name}
      </p>
      <p className="text-xs tabular-nums" style={{ color: 'var(--tone-muted)' }}>
        {color.hex}
      </p>
      <p className="mt-2 text-xs leading-snug text-pretty" style={{ color: 'var(--tone-soft)' }}>
        {color.description}
      </p>
    </motion.div>
  );
}
