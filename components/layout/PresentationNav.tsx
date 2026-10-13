'use client';

import { useEffect, useState } from 'react';

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
    const updateActive = () => {
      const threshold = 96;
      const passed = sections
        .map(({ id }) => document.getElementById(id))
        .filter((element): element is HTMLElement => Boolean(element))
        .filter((element) => element.getBoundingClientRect().top <= threshold);

      setActiveId(passed.at(-1)?.id ?? sections[0]?.id ?? '');
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [sections]);

  return (
    <nav aria-label="Índice de capítulos" className="mk-presentation-nav no-print">
      <div className="mk-presentation-nav-list">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={activeId === section.id ? 'location' : undefined}
            className="mk-presentation-nav-link group"
          >
            <span>{section.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
