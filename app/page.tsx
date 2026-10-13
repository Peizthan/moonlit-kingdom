'use client';

import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { CelestialOrnament } from '@/components/brand/CelestialOrnament';
import { weddingData } from '@/data/wedding-data';

const { couple } = weddingData;
const visionParagraphs = weddingData.story.vision.split('\n\n');
const venueLines = couple.location.split(', ');

const fadeIn = (delay: number) => ({
  initial: false,
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
});

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen flex-col">
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
        <section className="mk-section mk-section-first z-0 overflow-hidden px-6 pb-20 pt-24 text-center sm:pb-28 sm:pt-36">
          <SideVines set="vision" />
          <div className="relative mx-auto max-w-5xl">
            <motion.h2
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mk-chapter-eyebrow mb-6"
            >
              La Visión
            </motion.h2>
            <div className="mx-auto mb-9 max-w-3xl space-y-6">
              {visionParagraphs.slice(0, 2).map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="mk-prose"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.blockquote
              initial={false}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="mk-quote mx-auto mt-10 max-w-3xl border-y py-7 text-[clamp(1.75rem,3vw,3rem)] sm:mt-12 sm:py-9"
              style={{ borderColor: 'var(--tone-rule)' }}
            >
              {weddingData.story.manifesto}
            </motion.blockquote>
          </div>
        </section>

        <section className="mk-section mk-section-last overflow-hidden px-6 pb-24 pt-8 sm:pb-36 sm:pt-12 xl:pb-16">
          <SideVines set="chapters" />
          <CelestialOrnament className="mx-auto mb-10 h-3 w-40 sm:mb-14" style={{ color: 'var(--tone-accent)' }} />
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
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

function SideVines({ set }: { set: 'vision' | 'chapters' }) {
  return (
    <>
      <div aria-hidden="true" className={`mk-vines mk-vines-${set} mk-vines-left`} />
      <div aria-hidden="true" className={`mk-vines mk-vines-${set} mk-vines-right`} />
    </>
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
      className="mk-chapter-card group px-7 py-8 md:px-9 md:py-10"
    >
      <span className="mk-label mb-3 block">{chapter}</span>
      <span className="mk-display mb-3 flex items-baseline justify-between gap-4 text-[clamp(2rem,3.4vw,3.25rem)] font-medium leading-tight" style={{ color: 'var(--tone-strong)' }}>
        <span>{title}</span>
        <span aria-hidden="true" className="shrink-0 text-base transition-transform group-hover:translate-x-1" style={{ color: 'var(--tone-accent)' }}>→</span>
      </span>
      <span className="mk-card-description mk-prose mb-5 block max-w-lg" style={{ fontSize: 'clamp(1.2rem, 0.9rem + 0.55vw, 1.55rem)', lineHeight: 1.55 }}>
        {description}
      </span>
      <span className="mk-label">{action}</span>
    </Link>
  );
}
