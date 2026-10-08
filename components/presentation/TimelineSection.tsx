'use client';

import { ChapterHeading } from '@/components/brand/ChapterHeading';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { TimelineBlock } from '@/components/ui/TimelineBlock';
import { weddingData } from '@/data/wedding-data';

const { timeline, couple } = weddingData;

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative py-32 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <ChapterHeading eyebrow="Capítulo Tres" title="Programa del Día" align="center">
          <p className="mk-label mt-5" style={{ color: 'var(--tone-muted)' }}>
            {couple.weddingDate} · {couple.location}
          </p>
        </ChapterHeading>
        <div className="mb-14" />

        <div
          className="rounded-sm border p-6 md:p-10"
          style={{
            borderColor: 'rgb(var(--tone-line)/0.15)',
            background: 'rgb(var(--tone-surface)/0.3)',
          }}
        >
          <TimelineBlock events={timeline} />
        </div>
      </div>

      <OrnamentalDivider variant="star" className="max-w-3xl mx-auto mt-12" />
    </section>
  );
}
