'use client';

import { motion } from 'framer-motion';
import { LightingScene } from '@/lib/types';
import { useAdmin } from '@/lib/AdminContext';
import { EditableField } from '@/components/ui/EditableField';

interface LightingPlanProps {
  scenes: LightingScene[];
}

export function LightingPlan({ scenes }: LightingPlanProps) {
  const { isEditMode } = useAdmin();
  return (
    <div className="space-y-4">
      {scenes.map((scene, i) => (
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
          className="rounded-sm border p-5 hover:border-[rgba(176,141,87,0.25)] transition-all duration-300"
          style={{
            borderColor: 'rgba(176,141,87,0.12)',
            background: 'rgba(18,28,46,0.25)',
          }}
        >
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(176,141,87,0.55)' }}>
                  <EditableField id={`lighting:${scene.id}:area`} value={scene.area} style={{ color: 'rgba(176,141,87,0.55)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                </span>
                <span style={{ color: 'rgba(176,141,87,0.3)', fontSize: '0.5rem' }}>◆</span>
                <span className="text-xs" style={{ color: '#8E8A86' }}>{scene.timing}</span>
              </div>
              <h4 className="font-medium text-sm" style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif" }}>
                <EditableField id={`lighting:${scene.id}:scene`} value={scene.scene} style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif", fontWeight: '500', fontSize: '0.875rem' }} />
              </h4>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {scene.colorTemp && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(176,141,87,0.1)',
                    border: '1px solid rgba(176,141,87,0.2)',
                    color: '#B08D57',
                    fontSize: '0.65rem',
                  }}
                >
                  {scene.colorTemp}
                </span>
              )}
              {scene.intensity && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(142,138,134,0.1)',
                    border: '1px solid rgba(142,138,134,0.2)',
                    color: '#8E8A86',
                    fontSize: '0.65rem',
                  }}
                >
                  {scene.intensity}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm mb-3" style={{ color: '#8E8A86' }}>
            <EditableField id={`lighting:${scene.id}:description`} value={scene.description} type="textarea" style={{ color: '#8E8A86', fontSize: '0.875rem' }} />
          </p>

          {scene.equipment && scene.equipment.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {scene.equipment.map((eq) => (
                <span
                  key={eq}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(29,74,58,0.25)',
                    border: '1px solid rgba(29,74,58,0.4)',
                    color: '#8E8A86',
                    fontSize: '0.65rem',
                  }}
                >
                  {eq}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
