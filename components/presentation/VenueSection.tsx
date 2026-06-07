'use client';

import { motion } from 'framer-motion';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { weddingData } from '@/data/wedding-data';
import { MapPin, Users, Globe, Phone, Mail } from 'lucide-react';

const { venue } = weddingData;

export function VenueSection() {
  return (
    <section
      id="venue"
      className="relative py-32 px-6"
      style={{
        background: 'linear-gradient(160deg, #171515 0%, #10261D 50%, #121C2E 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-xs uppercase tracking-[0.35em] mb-8"
          style={{ color: 'rgba(176,141,87,0.7)' }}
        >
          Capítulo Dos
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center text-4xl md:text-6xl font-light mb-16"
          style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
        >
          El Salón
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <ImagePlaceholder
              label="Salón Veteranos"
              aspectRatio="landscape"
              gradientFrom="#10261D"
              gradientTo="#121C2E"
              icon="◐"
            />
            <div className="grid grid-cols-2 gap-3 mt-3">
              <ImagePlaceholder
                label="Capilla Privada"
                aspectRatio="square"
                gradientFrom="#1D4A3A"
                gradientTo="#121C2E"
                icon="☽"
              />
              <ImagePlaceholder
                label="Gran Salón"
                aspectRatio="square"
                gradientFrom="#171515"
                gradientTo="#4E1F2D"
                icon="✦"
              />
            </div>
          </motion.div>

          {/* Venue details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <h3
              className="text-3xl font-light mb-2"
              style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
            >
              {venue.name}
            </h3>
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: '#B08D57' }}>
              {venue.city} · {venue.country}
            </p>

            <p
              className="text-base leading-loose mb-8"
              style={{ color: '#C7C0B6', fontFamily: "'Georgia', serif" }}
            >
              {venue.description}
            </p>

            {/* Details grid */}
            <div
              className="grid grid-cols-2 gap-4 mb-8 p-5 rounded-sm border"
              style={{
                borderColor: 'rgba(176,141,87,0.2)',
                background: 'rgba(176,141,87,0.04)',
              }}
            >
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(176,141,87,0.5)' }}>
                  Tipo
                </p>
                <p className="text-sm" style={{ color: '#C7C0B6' }}>{venue.indoorOutdoor}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(176,141,87,0.5)' }}>
                  Capacidad
                </p>
                <p className="text-sm" style={{ color: '#C7C0B6' }}>{venue.capacity} invitados</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(176,141,87,0.5)' }}>
                  Dirección
                </p>
                <p className="text-sm flex items-center gap-2" style={{ color: '#C7C0B6' }}>
                  <MapPin size={12} style={{ color: 'rgba(176,141,87,0.6)' }} />
                  {venue.address}, {venue.city}, {venue.country}
                </p>
              </div>
            </div>

            {/* Coordinator */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(176,141,87,0.5)' }}>
                Coordinadora del Salón
              </p>
              <p className="text-sm font-medium mb-2" style={{ color: '#D8C3A5' }}>
                {venue.coordinator}
              </p>
              <div className="space-y-2">
                <a
                  href={`mailto:${venue.coordinatorEmail}`}
                  className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
                  style={{ color: '#8E8A86' }}
                >
                  <Mail size={12} style={{ color: 'rgba(176,141,87,0.5)' }} />
                  {venue.coordinatorEmail}
                </a>
                <div className="flex items-center gap-2 text-sm" style={{ color: '#8E8A86' }}>
                  <Phone size={12} style={{ color: 'rgba(176,141,87,0.5)' }} />
                  {venue.coordinatorPhone}
                </div>
                {venue.website && (
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#8E8A86' }}>
                    <Globe size={12} style={{ color: 'rgba(176,141,87,0.5)' }} />
                    {venue.website}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <OrnamentalDivider variant="moon" className="max-w-6xl mx-auto mt-16" />
    </section>
  );
}
