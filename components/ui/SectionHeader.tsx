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
        <p className="mk-chapter-eyebrow mb-4" >
          {eyebrow}
        </p>
      )}
      <h2
        className="mk-chapter-title text-4xl md:text-5xl lg:text-[3.5rem] mb-4"
        style={{ ['--tone-strong' as string]: light ? 'var(--tone-strong)' : 'var(--tone-fg)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-base md:text-lg font-light leading-relaxed max-w-2xl"
          style={{
            color: 'var(--tone-muted)',
            ...(align === 'center' ? { margin: '0 auto' } : {}),
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
