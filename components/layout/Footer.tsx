'use client';

import Image from 'next/image';
import { CelestialOrnament } from '@/components/brand/CelestialOrnament';
import { weddingData } from '@/data/wedding-data';

const { couple } = weddingData;

export function Footer() {
  return (
    <footer className="no-print mk-footer-paper pt-8 sm:pt-12">
      <div className="mx-auto max-w-7xl px-6 pb-3 text-center">
        <CelestialOrnament className="mx-auto mb-4 h-3 w-40" style={{ color: 'var(--tone-accent)' }} />
        <p className="mk-label mb-2">Moonlit Kingdom</p>
        <p className="mk-display text-base font-medium sm:text-lg" style={{ color: 'var(--tone-soft)' }}>
          {couple.partner1} &amp; {couple.partner2}
        </p>
        <p className="mk-label mt-1 text-[0.72rem] tracking-[0.24em] opacity-80 sm:text-xs" style={{ color: 'var(--tone-accent)' }}>
          Una noche fuera del tiempo · Asunción, Paraguay
        </p>
      </div>
      {/* Decorative vine band, cropped from the hero frame art. */}
      <Image src="/brand/vine-band.webp" alt="" width={1127} height={118} sizes="100vw" className="mk-footer-band" />
    </footer>
  );
}
