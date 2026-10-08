'use client';

import { motion } from 'framer-motion';

interface ImagePlaceholderProps {
  label?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide';
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  icon?: string;
}

const ratioClasses = {
  landscape: 'aspect-video',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  wide: 'aspect-[16/5]',
};

export function ImagePlaceholder({
  label,
  aspectRatio = 'landscape',
  className = '',
  gradientFrom = '#1D4A3A',
  gradientTo = 'var(--tone-base)',
  icon = '✦',
}: ImagePlaceholderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`${ratioClasses[aspectRatio]} rounded-sm overflow-hidden relative border ${className}`}
      style={{ borderColor: 'rgb(var(--tone-line)/0.2)' }}
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        }}
      >
        {/* Subtle star field */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xs animate-star"
            style={{
              color: 'var(--tone-accent)',
              top: `${15 + (i * 11) % 70}%`,
              left: `${10 + (i * 17) % 80}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            ·
          </div>
        ))}
        <div
          className="text-2xl mb-3 animate-gentle-pulse"
          style={{ color: 'var(--tone-accent)' }}
        >
          {icon}
        </div>
        {label && (
          <p
            className="text-xs uppercase tracking-widest"
            style={{ color: 'var(--tone-accent)' }}
          >
            {label}
          </p>
        )}
      </div>
    </motion.div>
  );
}
