'use client';

import { motion } from 'framer-motion';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { weddingData } from '@/data/wedding-data';

const { menu } = weddingData;

const dietaryColors: Record<string, string> = {
  Vegetarian: 'rgba(29,74,58,0.7)',
  Vegan: 'rgba(16,38,29,0.8)',
  'Gluten Free': 'rgba(176,141,87,0.15)',
  'Contains Gluten': 'rgba(78,31,45,0.5)',
};

export function MenuSection() {
  return (
    <section
      id="menu"
      className="relative py-32 px-6"
      style={{
        background: 'linear-gradient(160deg, #171515 0%, #121C2E 50%, #10261D 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-xs uppercase tracking-[0.35em] mb-8"
          style={{ color: 'rgba(176,141,87,0.7)' }}
        >
          Capítulo Seis
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center text-4xl md:text-6xl font-light mb-4"
          style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
        >
          Gastronomía y Menú
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center text-sm uppercase tracking-widest mb-16"
          style={{ color: '#8E8A86' }}
        >
          Cocina del Centenario · Chef Andrés Petit
        </motion.p>

        <div className="space-y-8">
          {menu.map((course, ci) => (
            <motion.div
              key={course.course}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.08 }}
            >
              {/* Course header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="flex-1 h-px"
                  style={{ background: 'linear-gradient(to right, rgba(176,141,87,0.3), transparent)' }}
                />
                <h3
                  className="text-xs uppercase tracking-[0.3em] px-4"
                  style={{ color: '#B08D57' }}
                >
                  {course.course}
                </h3>
                <div
                  className="flex-1 h-px"
                  style={{ background: 'linear-gradient(to left, rgba(176,141,87,0.3), transparent)' }}
                />
              </div>

              {/* Options */}
              <div className={`grid gap-4 ${course.options.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`}>
                {course.options.map((option) => (
                  <div
                    key={option.name}
                    className="rounded-sm border p-5 group hover:border-[rgba(176,141,87,0.25)] transition-all duration-300"
                    style={{
                      borderColor: 'rgba(176,141,87,0.12)',
                      background: 'rgba(18,28,46,0.25)',
                    }}
                  >
                    <h4
                      className="text-base font-medium mb-2"
                      style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif" }}
                    >
                      {option.name}
                    </h4>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: '#8E8A86' }}>
                      {option.description}
                    </p>
                    {option.dietary && option.dietary.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {option.dietary.map((d) => (
                          <span
                            key={d}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: dietaryColors[d] ?? 'rgba(142,138,134,0.2)',
                              border: '1px solid rgba(176,141,87,0.15)',
                              color: '#C7C0B6',
                              fontSize: '0.65rem',
                            }}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {course.dietaryNotes && (
                <p className="mt-3 text-xs italic" style={{ color: 'rgba(176,141,87,0.45)' }}>
                  {course.dietaryNotes}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <OrnamentalDivider variant="diamond" className="max-w-4xl mx-auto mt-16" />
    </section>
  );
}
