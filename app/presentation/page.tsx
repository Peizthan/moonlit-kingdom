'use client';

import { PresentationNav } from '@/components/layout/PresentationNav';
import { VisionSection } from '@/components/presentation/VisionSection';
import { VenueSection } from '@/components/presentation/VenueSection';
import { TimelineSection } from '@/components/presentation/TimelineSection';
import { FloralsSection } from '@/components/presentation/FloralsSection';
import { MenuSection } from '@/components/presentation/MenuSection';
import { FinalVisionSection } from '@/components/presentation/FinalVisionSection';

const sections = [
  { id: 'vision', label: 'Visión' },
  { id: 'palette', label: 'Paleta' },
  { id: 'venue', label: 'Salón' },
  { id: 'timeline', label: 'Programa' },
  { id: 'florals', label: 'Flores' },
  { id: 'menu', label: 'Menú' },
  { id: 'final-vision', label: 'Visión Final' },
];

export default function PresentationPage() {
  return (
    <div
      className="relative"
      style={{ background: '#10261D' }}
    >
      <PresentationNav sections={sections} />

      {/* Hero banner */}
      <div
        className="relative h-64 md:h-80 flex items-center justify-center text-center overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #10261D 0%, #121C2E 60%, #10261D 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 100%, rgba(176,141,87,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="relative pt-20 px-6">
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: 'rgba(176,141,87,0.6)' }}>
            Visión y Plan de Producción de la Boda
          </p>
          <h1
            className="text-3xl md:text-5xl font-light"
            style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
          >
            Moonlit Kingdom
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.2em]" style={{ color: '#8E8A86' }}>
            Constanza & Ivan · 21 de agosto de 2027
          </p>
        </div>
      </div>

      {/* Sections */}
      <VisionSection />
      <VenueSection />
      <TimelineSection />
      <FloralsSection />
      <MenuSection />
      <FinalVisionSection />
    </div>
  );
}
