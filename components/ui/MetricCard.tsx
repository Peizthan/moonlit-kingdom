'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: ReactNode;
  accentColor?: string;
  delay?: number;
}

export function MetricCard({
  label,
  value,
  subValue,
  icon,
  accentColor = '#B08D57',
  delay = 0,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className="rounded-sm p-6 border relative overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, rgba(29,74,58,0.3) 0%, rgba(18,28,46,0.4) 100%)',
        borderColor: 'rgba(176,141,87,0.2)',
      }}
    >
      {/* Subtle hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}10 0%, transparent 70%)` }}
      />
      <div className="relative z-10">
        {icon && (
          <div className="mb-3" style={{ color: accentColor }}>
            {icon}
          </div>
        )}
        <div
          className="text-3xl font-light mb-1"
          style={{ fontFamily: "'Georgia', serif", color: accentColor }}
        >
          {value}
        </div>
        <div className="text-sm uppercase tracking-widest" style={{ color: '#8E8A86' }}>
          {label}
        </div>
        {subValue && (
          <div className="text-xs mt-2" style={{ color: '#8E8A86' }}>
            {subValue}
          </div>
        )}
      </div>
    </motion.div>
  );
}
