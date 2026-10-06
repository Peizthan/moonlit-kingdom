'use client';

import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { StarField } from '@/components/layout/StarField';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { weddingData } from '@/data/wedding-data';

const { couple } = weddingData;
const visionParagraphs = weddingData.story.vision.split('\n\n');

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(160deg, #10261D 0%, #121C2E 45%, #10261D 100%)',
      }}
    >
      <StarField count={160} />

      {/* Radial glow behind hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(176,141,87,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Hero */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 min-h-screen">
        {/* Crescent moon */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-10 animate-float"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M48 16C34.7 16 24 26.7 24 40C24 53.3 34.7 64 48 64C41.4 64 36 58.6 36 52C36 45.4 41.4 40 48 40C54.6 40 60 45.4 60 52C60 58.6 54.6 64 48 64C61.3 64 72 53.3 72 40C72 26.7 61.3 16 48 16Z"
              stroke="#B08D57"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M40 12C26 12 14 24 14 40C14 56 26 68 40 68"
              stroke="#B08D57"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs uppercase tracking-[0.4em] mb-6"
          style={{ color: 'rgba(176,141,87,0.7)' }}
        >
          Una noche fuera del tiempo
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-6xl md:text-8xl lg:text-[7rem] font-light mb-6 leading-none text-glow-gold"
          style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
        >
          Moonlit
          <br />
          <span style={{ color: '#B08D57' }}>Kingdom</span>
        </motion.h1>

        <OrnamentalDivider variant="moon" className="max-w-xs mx-auto mb-12" />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mb-10 text-base italic leading-relaxed sm:text-lg"
          style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif" }}
        >
          {weddingData.story.principle.replace('\n', ' ')}
        </motion.p>

        {/* Metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-14 text-sm"
          style={{ color: '#8E8A86' }}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(176,141,87,0.5)' }}>
              Novios
            </span>
            <span style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif" }}>
              {couple.partner1} & {couple.partner2}
            </span>
          </div>
          <div className="hidden md:block w-px h-8" style={{ background: 'rgba(176,141,87,0.25)' }} />
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(176,141,87,0.5)' }}>
              Fecha
            </span>
            <span style={{ color: '#D8C3A5' }}>{couple.weddingDate}</span>
          </div>
          <div className="hidden md:block w-px h-8" style={{ background: 'rgba(176,141,87,0.25)' }} />
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(176,141,87,0.5)' }}>
              Salón
            </span>
            <span style={{ color: '#D8C3A5' }}>{couple.location}</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/presentation"
            className="group relative border-b px-3 py-4 text-xs uppercase tracking-[0.25em] transition-colors duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
            style={{
              borderColor: 'rgba(176,141,87,0.6)',
              color: '#D8C3A5',
              outlineColor: '#B08D57',
            }}
          >
            <span>Ver Presentación <span aria-hidden="true">→</span></span>
          </Link>
          <Link
            href="/dashboard"
            className="group relative border-b px-3 py-4 text-xs uppercase tracking-[0.25em] transition-colors duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
            style={{
              borderColor: 'rgba(176,141,87,0.3)',
              color: '#B08D57',
              outlineColor: '#B08D57',
            }}
          >
            <span>Abrir Panel de Planificación <span aria-hidden="true">→</span></span>
          </Link>
        </motion.div>


      </section>

      {/* Below-fold intro */}
      <section
        className="relative px-6 py-24"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(18,28,46,0.6))',
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.3em] mb-6"
            style={{ color: 'rgba(176,141,87,0.6)' }}
          >
            La Visión
          </motion.p>
          <div className="mx-auto mb-10 max-w-2xl space-y-5">
            {visionParagraphs.slice(0, 2).map((paragraph, index) => (
              <motion.p
                key={paragraph}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="text-base font-light leading-[1.9] sm:text-lg"
                style={{ fontFamily: "'Georgia', serif", color: '#C7C0B6' }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <OrnamentalDivider variant="diamond" />

          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 text-xl italic leading-relaxed sm:text-2xl"
            style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif" }}
          >
            {weddingData.story.manifesto}
          </motion.blockquote>
        </div>
      </section>

      {/* Quick navigation cards */}
      <section className="relative px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Presentation card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Link
                href="/presentation"
                className="group block rounded-sm border p-8 relative overflow-hidden transition-all duration-500 hover:border-[rgba(176,141,87,0.4)]"
                style={{
                  background: 'linear-gradient(135deg, rgba(29,74,58,0.3) 0%, rgba(18,28,46,0.4) 100%)',
                  borderColor: 'rgba(176,141,87,0.2)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(176,141,87,0.08) 0%, transparent 70%)',
                  }}
                />
                <div className="relative">
                  <div className="text-2xl mb-4" style={{ color: 'rgba(176,141,87,0.6)' }}>◐</div>
                  <h3
                    className="text-xl font-light mb-3"
                    style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
                  >
                    Presentación
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: '#8E8A86' }}>
                    Un recorrido editorial cinematográfico por la visión completa de la boda — historia, paleta,
                    flores, salón, cronograma y más. Diseñado para reuniones con clientes y proveedores.
                  </p>
                  <span
                    className="text-xs uppercase tracking-[0.25em] group-hover:tracking-[0.35em] transition-all duration-300"
                    style={{ color: '#B08D57' }}
                  >
                    Ver Presentación →
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Dashboard card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <Link
                href="/dashboard"
                className="group block rounded-sm border p-8 relative overflow-hidden transition-all duration-500 hover:border-[rgba(176,141,87,0.4)]"
                style={{
                  background: 'linear-gradient(135deg, rgba(18,28,46,0.4) 0%, rgba(78,31,45,0.2) 100%)',
                  borderColor: 'rgba(176,141,87,0.2)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(176,141,87,0.08) 0%, transparent 70%)',
                  }}
                />
                <div className="relative">
                  <div className="text-2xl mb-4" style={{ color: 'rgba(176,141,87,0.6)' }}>◈</div>
                  <h3
                    className="text-xl font-light mb-3"
                    style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
                  >
                    Panel de Planificación
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: '#8E8A86' }}>
                    El espacio operativo — proveedores, presupuesto, tareas, notas de reuniones,
                    decisiones, riesgos y detalles de producción. Pensado para el equipo de planificación.
                  </p>
                  <span
                    className="text-xs uppercase tracking-[0.25em] group-hover:tracking-[0.35em] transition-all duration-300"
                    style={{ color: '#B08D57' }}
                  >
                    Abrir Panel →
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
    </MotionConfig>
  );
}
