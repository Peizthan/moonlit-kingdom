'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface EditorialPanelProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  glow?: boolean;
  delay?: number;
  noPadding?: boolean;
}

export function EditorialPanel({
  children,
  className = '',
  bordered = true,
  glow = false,
  delay = 0,
  noPadding = false,
}: EditorialPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={`
        rounded-sm
        ${bordered ? 'border' : ''}
        ${noPadding ? '' : 'p-6 md:p-8'}
        ${glow ? 'gold-glow' : ''}
        ${className}
      `}
      style={{
        background: 'rgb(var(--tone-surface))',
        borderColor: bordered ? 'rgb(var(--tone-line)/0.2)' : 'transparent',
      }}
    >
      {children}
    </motion.div>
  );
}
