'use client';

import Link from 'next/link';
import { useSheet } from '@/lib/useSheet';
import { GuestList } from '@/components/planning/GuestList';

export default function GuestsPage() {
  const sheet = useSheet('guests');
  return <div className="mx-auto min-h-screen max-w-7xl px-5 pb-16 pt-24 sm:px-8">
    <Link href="/dashboard" className="mk-sheet-button mb-8 inline-flex">← Panel de Planificación</Link>
    <p className="mk-chapter-eyebrow mb-3">Moonlit Kingdom · En privado</p>
    <h1 className="mk-chapter-title mb-3 text-4xl sm:text-5xl">Invitados</h1>
    <p className="mb-8 max-w-3xl text-base" style={{ color: 'var(--tone-soft)' }}>Lista y resumen de la planilla de Costi e Iván. Edita en Google Sheets y actualiza esta vista para ver los cambios.</p>
    <GuestList data={sheet.data} loading={sheet.loading} error={sheet.error} onRefresh={sheet.refresh} />
  </div>;
}
