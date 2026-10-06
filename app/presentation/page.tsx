'use client';

import { PresentationNav } from '@/components/layout/PresentationNav';
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
      <div className="relative" style={{ background: '#10261D' }}>
        <PresentationNav sections={sections} />

        <header
          className="relative flex min-h-[22rem] items-center justify-center overflow-hidden px-6 pb-10 pt-24 text-center md:min-h-[26rem]"
          style={{
            background: 'linear-gradient(160deg, #10261D 0%, #121C2E 60%, #10261D 100%)',
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at 50% 100%, rgba(176,141,87,0.08) 0%, transparent 70%)',
            }}
          />
          <div className="relative max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.4em]" style={{ color: 'rgba(176,141,87,0.7)' }}>
              Moonlit Kingdom
            </p>
            <h1
              className="text-4xl font-light leading-tight sm:text-5xl md:text-6xl"
              style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
            >
              Una noche fuera del tiempo
            </h1>
            <p className="mt-6 text-sm leading-relaxed sm:text-base" style={{ color: '#D8C3A5' }}>
              {couple.partner1} & {couple.partner2}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em]" style={{ color: '#8E8A86' }}>
              {couple.weddingDate}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.25em]" style={{ color: 'rgba(176,141,87,0.75)' }}>
              Visión · Atmósfera · Experiencia
            </p>
          </div>
        </header>

        <VisionSection />
        <VenueSection />
        <TimelineSection />
      </div>
    </MotionConfig>
  );
}
