'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
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
      style={{
        background: 'linear-gradient(160deg, #171515 0%, #10261D 50%, #121C2E 100%)',
      }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal(10)} className="mb-12 md:mb-16">
          <p
            className="mb-4 text-xs uppercase tracking-[0.35em]"
            style={{ color: 'rgba(176,141,87,0.75)' }}
          >
            Capítulo dos
          </p>
          <h2
            className="text-4xl font-light leading-tight sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
          >
            El Salón
          </h2>
          <div className="mt-7 h-px w-20" style={{ background: 'rgba(176,141,87,0.55)' }} />
        </motion.div>

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
            <p
              className="mb-3 text-xs uppercase leading-relaxed tracking-[0.2em]"
              style={{ color: '#B08D57' }}
            >
              Club Centenario · Asunción
            </p>
            <h3
              className="mb-7 text-3xl font-light leading-snug sm:text-4xl"
              style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
            >
              {venue.name}
            </h3>

            <div className="space-y-5">
              {venue.description.split('\n\n').map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base font-light leading-[1.85]"
                  style={{ color: '#C7C0B6', fontFamily: "'Georgia', serif" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="my-9 grid grid-cols-2 gap-x-5 gap-y-7 border-y py-7 sm:gap-x-8"
              style={{ borderColor: 'rgba(176,141,87,0.22)' }}
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
              style={{ borderColor: 'rgba(176,141,87,0.55)' }}
            >
              <p
                className="text-2xl font-light italic leading-snug sm:text-3xl"
                style={{ fontFamily: "'Georgia', serif", color: '#F3EBDD' }}
              >
                Un lienzo para construir el bosque bajo las estrellas.
              </p>
            </blockquote>

            <div className="space-y-3 border-t pt-6" style={{ borderColor: 'rgba(176,141,87,0.18)' }}>
              <p className="text-xs uppercase tracking-[0.25em]" style={{ color: 'rgba(176,141,87,0.65)' }}>
                Información del salón
              </p>
              <p className="flex items-start gap-2 text-sm" style={{ color: '#C7C0B6' }}>
                <MapPin aria-hidden="true" size={15} className="mt-0.5 shrink-0" style={{ color: '#B08D57' }} />
                {venue.address}, {venue.city}, {venue.country}
              </p>
              <p className="text-sm" style={{ color: '#D8C3A5' }}>{venue.coordinator}</p>
              <a
                href={`mailto:${venue.coordinatorEmail}`}
                className="flex w-fit items-center gap-2 text-sm transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
                style={{ color: '#C7C0B6', outlineColor: '#B08D57' }}
              >
                <Mail aria-hidden="true" size={14} style={{ color: '#B08D57' }} />
                {venue.coordinatorEmail}
              </a>
              <p className="flex items-center gap-2 text-sm" style={{ color: '#C7C0B6' }}>
                <Phone aria-hidden="true" size={14} style={{ color: '#B08D57' }} />
                {venue.coordinatorPhone}
              </p>
              {venue.website && (
                <a
                  href={venue.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-fit items-center gap-2 text-sm transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
                  style={{ color: '#C7C0B6', outlineColor: '#B08D57' }}
                >
                  <Globe aria-hidden="true" size={14} style={{ color: '#B08D57' }} />
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
      <dt className="mb-2 text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: 'rgba(176,141,87,0.7)' }}>
        {label}
      </dt>
      <dd className="text-sm leading-relaxed" style={{ color: '#C7C0B6' }}>
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
        style={{ borderColor: 'rgba(176,141,87,0.32)', background: '#121C2E' }}
      >
        {unavailable ? (
          <div
            role="img"
            aria-label={`Fotografía pendiente. Añadir ${filename} en public/images/venue.`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center"
            style={{ background: 'linear-gradient(145deg, rgba(29,74,58,0.45), #121C2E 70%)' }}
          >
            <span aria-hidden="true" className="text-xl" style={{ color: 'rgba(176,141,87,0.65)' }}>✦</span>
            <span className="text-xs uppercase tracking-[0.18em]" style={{ color: '#D8C3A5' }}>
              Fotografía pendiente
            </span>
            <code className="text-[0.65rem]" style={{ color: '#8E8A86' }}>{filename}</code>
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
