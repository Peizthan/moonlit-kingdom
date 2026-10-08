'use client';

import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { CelestialOrnament } from '@/components/brand/CelestialOrnament';
import { weddingData } from '@/data/wedding-data';

const { couple } = weddingData;
const visionParagraphs = weddingData.story.vision.split('\n\n');
const venueLines = couple.location.split(', ');

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
});

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen flex-col bg-[var(--mk-night)]">
        <section className="mk-hero paper-surface">
          <div className="mk-hero-stage">
            {/* Decorative frame art. A <picture> serves one pre-optimized asset per breakpoint; the empty alt keeps it out of the accessibility tree. */}
            <picture className="mk-hero-art">
              <source media="(min-width: 640px)" srcSet="/brand/hero-frame-desktop.webp" />
              <img src="/brand/hero-frame-mobile.webp" alt="" fetchPriority="high" decoding="async" />
            </picture>

            <div className="mk-hero-content">
              <motion.p {...fadeIn(0.1)} className="mk-eyebrow">
                Una noche fuera del tiempo
              </motion.p>

              <motion.h1 {...fadeIn(0.2)} className="mk-title">
                <span>Moonlit</span>{' '}
                <span>Kingdom</span>
              </motion.h1>

              <CelestialOrnament className="mk-divider" />

              <motion.p {...fadeIn(0.3)} className="mk-principle">
                {weddingData.story.principle.split('\n').map((line) => (
                  <span key={line}>{line}{' '}</span>
                ))}
              </motion.p>

              <motion.div {...fadeIn(0.4)} className="mk-names">
                <span>{couple.partner1}</span>
                <span aria-hidden="true" className="mk-ampersand">&amp;</span>
                <span className="sr-only">y</span>
                <span>{couple.partner2}</span>
              </motion.div>

              <CelestialOrnament variant="compass" className="mk-compass" />

              <motion.div {...fadeIn(0.5)} className="mk-date">
                <p>Sábado 28 de agosto 2027</p>
                <p>18:00</p>
              </motion.div>

              <motion.div {...fadeIn(0.55)} className="mk-venue">
                <span>{venueLines[0]}</span>{' '}
                <span>{venueLines[1]}</span>
              </motion.div>

              <motion.div {...fadeIn(0.6)} className="mk-links">
                <Link href="/presentation" className="mk-cta">
                  Ver Presentación <span aria-hidden="true" className="mk-arrow">→</span>
                </Link>
                <CelestialOrnament className="mk-links-star h-3 w-5" />
                <Link href="/dashboard" className="mk-cta">
                  Panel de Planificación <span aria-hidden="true" className="mk-arrow">→</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="mk-night-transition relative z-0 -mt-1 overflow-hidden px-6 pb-20 pt-24 text-center sm:pb-28 sm:pt-32">
          <div className="relative mx-auto max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-[0.65rem] uppercase tracking-[0.3em] text-[#C5A771] sm:text-xs sm:tracking-[0.38em]"
            >
              La Visión
            </motion.p>
            <div className="mx-auto mb-9 max-w-2xl space-y-5">
              {visionParagraphs.slice(0, 2).map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="text-base font-light leading-[1.9] text-[#D3CABC] sm:text-lg"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="mx-auto mt-10 max-w-2xl border-y border-[rgba(176,141,87,0.24)] py-7 text-xl italic leading-relaxed text-[#E6D5B7] sm:mt-12 sm:py-9 sm:text-2xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {weddingData.story.manifesto}
            </motion.blockquote>
          </div>
        </section>

        <section className="relative px-6 py-14 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-x-12 md:grid-cols-2">
            <ChapterLink
              href="/presentation"
              chapter="Capítulo I"
              title="Presentación"
              description="Un recorrido editorial cinematográfico por la visión completa de la boda — historia, paleta, flores, salón, cronograma y más. Diseñado para reuniones con clientes y proveedores."
              action="Ver Presentación"
            />
            <ChapterLink
              href="/dashboard"
              chapter="En privado"
              title="Panel de Planificación"
              description="El espacio operativo — proveedores, presupuesto, tareas, notas de reuniones, decisiones, riesgos y detalles de producción. Pensado para el equipo de planificación."
              action="Abrir Panel"
            />
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}

function ChapterLink({
  href,
  chapter,
  title,
  description,
  action,
}: {
  href: string;
  chapter: string;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <Link
      href={href}
      className="group border-t border-[rgba(176,141,87,0.28)] py-7 transition-colors hover:border-[rgba(216,195,165,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57] md:py-8"
    >
      <span className="mb-3 block text-[0.6rem] uppercase tracking-[0.3em] text-[rgba(216,195,165,0.7)]">
        {chapter}
      </span>
      <span className="mb-3 flex items-baseline justify-between gap-4 text-2xl text-[#D8C3A5] sm:text-3xl" style={{ fontFamily: "'Georgia', serif" }}>
        {title}
        <span aria-hidden="true" className="text-base text-[#B08D57] transition-transform group-hover:translate-x-1">→</span>
      </span>
      <span className="mb-5 block max-w-lg text-sm leading-relaxed text-[#BDB5A9]">
        {description}
      </span>
      <span className="text-[0.65rem] uppercase tracking-[0.22em] text-[#C5A771]">
        {action}
      </span>
    </Link>
  );
}
