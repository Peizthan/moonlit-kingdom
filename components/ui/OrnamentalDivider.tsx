'use client';

import { motion } from 'framer-motion';

interface OrnamentalDividerProps {
  symbol?: string;
  variant?: 'star' | 'moon' | 'diamond' | 'floral';
  className?: string;
}

const symbols = {
  star: '✦',
  moon: '☽',
  diamond: '◆',
  floral: '✿',
};

export function OrnamentalDivider({
  symbol,
  variant = 'star',
  className = '',
}: OrnamentalDividerProps) {
  const icon = symbol ?? symbols[variant];

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.6 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`flex items-center gap-4 my-10 ${className}`}
    >
      <div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.4))' }}
      />
      <span
        className="text-sm animate-gentle-pulse"
        style={{ color: '#B08D57', fontSize: '0.75rem' }}
      >
        {icon}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(to left, transparent, rgba(176,141,87,0.4))' }}
      />
    </motion.div>
  );
}
