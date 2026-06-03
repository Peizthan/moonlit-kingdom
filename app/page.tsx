'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { StarField } from '@/components/layout/StarField';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { weddingData } from '@/data/wedding-data';

const { couple } = weddingData;

export default function HomePage() {
  return (
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
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
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
          Una Boda en el Bosque Celestial
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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-sm md:text-base uppercase tracking-[0.25em] mb-12"
          style={{ color: '#8E8A86' }}
        >
          Visión y Plan de Producción de la Boda
        </motion.p>

        <OrnamentalDivider variant="moon" className="max-w-xs mx-auto" />

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
          <div className="hidden md:block w-px h-8" style={{ background: 'rgba(176,141,87,0.25)' }} />
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(176,141,87,0.5)' }}>
              Versión
            </span>
            <span style={{ color: '#D8C3A5' }}>v{couple.version}</span>
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
            className="group relative px-10 py-4 text-xs uppercase tracking-[0.25em] transition-all duration-400 overflow-hidden"
            style={{
              border: '1px solid rgba(176,141,87,0.6)',
              color: '#D8C3A5',
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: 'rgba(176,141,87,0.1)' }}
            />
            <span className="relative">Ver Presentación</span>
          </Link>
          <Link
            href="/dashboard"
            className="group relative px-10 py-4 text-xs uppercase tracking-[0.25em] transition-all duration-400 overflow-hidden"
            style={{
              background: 'rgba(176,141,87,0.15)',
              border: '1px solid rgba(176,141,87,0.3)',
              color: '#B08D57',
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: 'rgba(176,141,87,0.1)' }}
            />
            <span className="relative">Abrir Panel de Planificación</span>
          </Link>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(176,141,87,0.35)' }}>
            Deslizar
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, rgba(176,141,87,0.4), transparent)' }}
          />
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
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-xl md:text-2xl font-light leading-relaxed mb-10"
            style={{ fontFamily: "'Georgia', serif", color: '#C7C0B6' }}
          >
            {weddingData.story.vision}
          </motion.p>

          <OrnamentalDivider variant="diamond" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-4"
          >
            {weddingData.story.moodKeywords.map((kw) => (
              <span
                key={kw}
                className="text-xs uppercase tracking-widest px-4 py-2 rounded-full border"
                style={{
                  borderColor: 'rgba(176,141,87,0.2)',
                  color: 'rgba(176,141,87,0.7)',
                  background: 'rgba(176,141,87,0.05)',
                }}
              >
                {kw}
              </span>
            ))}
          </motion.div>
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
  );
}
