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
        background: 'linear-gradient(135deg, rgba(29,74,58,0.25) 0%, rgba(18,28,46,0.35) 100%)',
        borderColor: bordered ? 'rgba(176,141,87,0.2)' : 'transparent',
        backdropFilter: 'blur(8px)',
      }}
    >
      {children}
    </motion.div>
  );
}
