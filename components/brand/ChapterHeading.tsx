'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CelestialOrnament } from '@/components/brand/CelestialOrnament';

interface ChapterHeadingProps {
  eyebrow?: string;
  title: string;
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
  size?: 'page' | 'chapter';
  children?: React.ReactNode;
}

const sizes = {
  page: 'text-[clamp(2.6rem,9vw,5.25rem)]',
  chapter: 'text-[clamp(2.4rem,6.5vw,4.4rem)]',
};

export function ChapterHeading({
  eyebrow,
  title,
  as: Tag = 'h2',
  align = 'left',
  size = 'chapter',
  children,
}: ChapterHeadingProps) {
  const reduce = useReducedMotion();
  const centered = align === 'center';

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduce ? 0 : 0.7 }}
      className={centered ? 'text-center' : undefined}
    >
      {eyebrow && <p className="mk-chapter-eyebrow mb-4">{eyebrow}</p>}
      <Tag className={`mk-chapter-title ${sizes[size]}`}>{title}</Tag>
      {children}
      {centered ? (
        <CelestialOrnament className="mx-auto mt-7 h-3 w-40" style={{ color: 'var(--tone-accent)' }} />
      ) : (
        <span aria-hidden="true" className="mk-rule mt-7 w-20" />
      )}
    </motion.div>
  );
}
