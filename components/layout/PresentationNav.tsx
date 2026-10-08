'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

interface PresentationNavProps {
  sections: Section[];
}

export function PresentationNav({ sections }: PresentationNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 no-print">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => {
            const el = document.getElementById(section.id);
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex items-center gap-2 justify-end"
          aria-label={section.label}
        >
          <AnimatePresence>
            {activeId === section.id && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="text-xs uppercase tracking-widest"
                style={{ color: 'var(--tone-accent)', fontSize: '0.6rem' }}
              >
                {section.label}
              </motion.span>
            )}
          </AnimatePresence>
          <div
            className="transition-all duration-300 rounded-full"
            style={{
              width: activeId === section.id ? '8px' : '5px',
              height: activeId === section.id ? '8px' : '5px',
              background: activeId === section.id ? 'var(--tone-accent)' : 'rgb(var(--tone-line)/0.35)',
            }}
          />
        </button>
      ))}
    </div>
  );
}
