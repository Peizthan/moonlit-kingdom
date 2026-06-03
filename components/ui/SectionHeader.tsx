'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`mb-12 ${alignClass}`}
    >
      {eyebrow && (
        <p
          className="text-xs uppercase tracking-[0.3em] mb-4 font-medium"
          style={{ color: '#B08D57' }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 leading-tight"
        style={{
          fontFamily: "'Georgia', serif",
          color: light ? '#F3EBDD' : '#D8C3A5',
          textShadow: '0 0 40px rgba(176, 141, 87, 0.15)',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-base md:text-lg font-light leading-relaxed max-w-2xl"
          style={{
            color: '#8E8A86',
            ...(align === 'center' ? { margin: '0 auto' } : {}),
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
