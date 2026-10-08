'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { ChapterHeading } from '@/components/brand/ChapterHeading';
import { weddingData } from '@/data/wedding-data';

const { venue } = weddingData;

const venuePhotos = [
  {
    src: '/images/venue/perez-uribe-exterior.jpg',
    alt: 'Exterior y acceso al Salón de Honor Óscar Pérez Uribe',
    caption: 'Llegada — Club Centenario',
  },
  {
    src: '/images/venue/perez-uribe-empty.jpg',
    alt: 'Salón de Honor Óscar Pérez Uribe vacío, antes del montaje',
    caption: 'El espacio antes de transformarse',
  },
  {
    src: '/images/venue/perez-uribe-event.jpg',
    alt: 'Salón de Honor Óscar Pérez Uribe preparado para un evento',
    caption: 'El potencial de una noche completamente distinta',
  },
];

export function VenueSection() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = (y: number, delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : delay },
  });

  return (
    <section
      id="venue"
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 md:mb-16">
          <ChapterHeading eyebrow="Capítulo dos" title="El Salón" />
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <motion.div {...reveal(10, 0.08)} className="space-y-5">
            <VenuePhoto photo={venuePhotos[0]} aspect="aspect-[4/3]" />
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {venuePhotos.slice(1).map((photo) => (
                <VenuePhoto key={photo.src} photo={photo} aspect="aspect-[4/3]" />
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal(10, 0.14)}>
            <p className="mk-label mb-3 leading-relaxed">
              Club Centenario · Asunción
            </p>
            <h3 className="mk-chapter-title mb-7 text-[clamp(2rem,4.5vw,2.9rem)] leading-tight">
              {venue.name}
            </h3>

            <div className="space-y-5">
              {venue.description.split('\n\n').map((paragraph) => (
                <p key={paragraph} className="mk-prose">
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="my-9 grid grid-cols-2 gap-x-5 gap-y-7 border-y py-7 sm:gap-x-8"
              style={{ borderColor: 'rgb(var(--tone-line)/0.22)' }}
            >
              <VenueFact label="Área útil publicada" value={venue.area} />
              <VenueFact label="Capacidad publicada" value={venue.capacityNote} />
              <VenueFact label="Dimensiones" value={venue.dimensions} />
              <VenueFact
                label="Producción"
                value={venue.productionNotes?.join(' ')}
              />
            </dl>

            <blockquote
              className="my-9 border-l pl-5 sm:pl-7"
              style={{ borderColor: 'rgb(var(--tone-line)/0.55)' }}
            >
              <p className="mk-quote text-[clamp(1.7rem,3.6vw,2.4rem)]">
                Un lienzo para construir el bosque bajo las estrellas.
              </p>
            </blockquote>

            <div className="space-y-3 border-t pt-6" style={{ borderColor: 'rgb(var(--tone-line)/0.18)' }}>
              <p className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--tone-accent)' }}>
                Información del salón
              </p>
              <p className="flex items-start gap-2 text-sm" style={{ color: 'var(--tone-soft)' }}>
                <MapPin aria-hidden="true" size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--tone-accent)' }} />
                {venue.address}, {venue.city}, {venue.country}
              </p>
              <p className="text-sm" style={{ color: 'var(--tone-fg)' }}>{venue.coordinator}</p>
              <a
                href={`mailto:${venue.coordinatorEmail}`}
                className="flex w-fit items-center gap-2 text-sm transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
                style={{ color: 'var(--tone-soft)', outlineColor: 'var(--tone-accent)' }}
              >
                <Mail aria-hidden="true" size={14} style={{ color: 'var(--tone-accent)' }} />
                {venue.coordinatorEmail}
              </a>
              <p className="flex items-center gap-2 text-sm" style={{ color: 'var(--tone-soft)' }}>
                <Phone aria-hidden="true" size={14} style={{ color: 'var(--tone-accent)' }} />
                {venue.coordinatorPhone}
              </p>
              {venue.website && (
                <a
                  href={venue.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-fit items-center gap-2 text-sm transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
                  style={{ color: 'var(--tone-soft)', outlineColor: 'var(--tone-accent)' }}
                >
                  <Globe aria-hidden="true" size={14} style={{ color: 'var(--tone-accent)' }} />
                  Sitio web del Club Centenario
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <OrnamentalDivider variant="moon" className="mx-auto mt-16 max-w-6xl" />
    </section>
  );
}

function VenueFact({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div>
      <dt className="mk-label mb-2" style={{ fontSize: '0.72rem' }}>
        {label}
      </dt>
      <dd className="text-sm leading-relaxed" style={{ color: 'var(--tone-soft)' }}>
        {value}
      </dd>
    </div>
  );
}

function VenuePhoto({
  photo,
  aspect,
}: {
  photo: (typeof venuePhotos)[number];
  aspect: string;
}) {
  const [unavailable, setUnavailable] = useState(false);
  const filename = photo.src.split('/').at(-1);

  return (
    <figure>
      <div
        className={`relative ${aspect} overflow-hidden border`}
        style={{ borderColor: 'rgb(var(--tone-line)/0.32)', background: 'var(--tone-base)' }}
      >
        {unavailable ? (
          <div
            role="img"
            aria-label={`Fotografía pendiente. Añadir ${filename} en public/images/venue.`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center"
            style={{ background: 'linear-gradient(145deg, rgba(29,74,58,0.45), var(--tone-base) 70%)' }}
          >
            <span aria-hidden="true" className="text-xl" style={{ color: 'var(--tone-accent)' }}>✦</span>
            <span className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--tone-fg)' }}>
              Fotografía pendiente
            </span>
            <code className="text-[0.65rem]" style={{ color: 'var(--tone-muted)' }}>{filename}</code>
          </div>
        ) : (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 55vw"
            className="object-cover"
            onError={() => setUnavailable(true)}
          />
        )}
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed" style={{ color: '#A7A19A' }}>
        {photo.caption}
      </figcaption>
    </figure>
  );
}
