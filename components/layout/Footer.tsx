'use client';

export function Footer() {
  return (
    <footer
      className="mt-32 py-12 border-t no-print"
      style={{ borderColor: 'rgba(176,141,87,0.15)' }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: 'rgba(176,141,87,0.5)' }}>
          ☽ Moonlit Kingdom ☽
        </p>
        <p className="text-xs" style={{ color: '#8E8A86' }}>
          Constanza & Ivan · 21 de agosto de 2027 · Salón Veteranos, Club Centenario
        </p>
        <p className="text-xs mt-3" style={{ color: 'rgba(142,138,134,0.4)' }}>
          Visión y Plan de Producción de la Boda — Confidencial
        </p>
      </div>
    </footer>
  );
}
