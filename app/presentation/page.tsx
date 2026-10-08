'use client';

import { PresentationNav } from '@/components/layout/PresentationNav';
import { CrescentMark } from '@/components/brand/CrescentMark';
import { CelestialOrnament } from '@/components/brand/CelestialOrnament';
import { VisionSection } from '@/components/presentation/VisionSection';
import { VenueSection } from '@/components/presentation/VenueSection';
import { TimelineSection } from '@/components/presentation/TimelineSection';
import { MotionConfig } from 'framer-motion';
import { weddingData } from '@/data/wedding-data';

const { couple } = weddingData;

const sections = [
  { id: 'vision', label: 'Visión' },
  { id: 'palette', label: 'Paleta' },
  { id: 'venue', label: 'Salón' },
  { id: 'timeline', label: 'Programa' },
];

export default function PresentationPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative">
        <PresentationNav sections={sections} />

        <header className="mk-tone-paper relative flex min-h-[24rem] items-center justify-center overflow-hidden px-6 pb-14 pt-28 text-center md:min-h-[30rem]">
          <div className="relative max-w-3xl">
            <CrescentMark className="mx-auto mb-5 h-9 w-9" style={{ color: 'var(--tone-accent)' }} />
            <p className="mk-chapter-eyebrow mb-5">Moonlit Kingdom</p>
            <h1 className="mk-chapter-title text-[clamp(2.7rem,9vw,5.5rem)]">
              Una noche fuera del tiempo
            </h1>
            <CelestialOrnament className="mx-auto mt-7 h-3 w-44" style={{ color: 'var(--tone-accent)' }} />
            <p className="mk-display mt-6 text-2xl font-semibold sm:text-3xl" style={{ color: 'var(--tone-fg)' }}>
              {couple.partner1} & {couple.partner2}
            </p>
            <p className="mk-label mt-2">{couple.weddingDate}</p>
          </div>
        </header>

        <VisionSection />
        <VenueSection />
        <TimelineSection />
      </div>
    </MotionConfig>
  );
}
