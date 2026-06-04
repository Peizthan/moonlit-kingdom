'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/lib/AdminContext';

export function AdminToolbar() {
  const router = useRouter();
  const { isEditMode, toggleEditMode, resetOverrides, overrideCount } = useAdmin();
  const [loggingOut, setLoggingOut] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  function handleReset() {
    if (confirmReset) {
      resetOverrides();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
    }
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 no-print"
      style={{
        background: 'rgba(16,38,29,0.97)',
        borderTop: '1px solid rgba(176,141,87,0.2)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Left: mode toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleEditMode}
          className="flex items-center gap-2 px-4 py-1.5 text-xs uppercase tracking-widest transition-all duration-200 rounded-sm"
          style={{
            background: isEditMode ? 'rgba(176,141,87,0.2)' : 'rgba(142,138,134,0.08)',
            border: isEditMode ? '1px solid rgba(176,141,87,0.5)' : '1px solid rgba(142,138,134,0.2)',
            color: isEditMode ? '#B08D57' : '#8E8A86',
          }}
        >
          <span>{isEditMode ? '✏️' : '👁'}</span>
          <span>{isEditMode ? 'Editando' : 'Solo lectura'}</span>
        </button>

        {overrideCount > 0 && (
          <span className="text-xs" style={{ color: 'rgba(176,141,87,0.5)' }}>
            {overrideCount} campo{overrideCount !== 1 ? 's' : ''} editado{overrideCount !== 1 ? 's' : ''} · guardado
          </span>
        )}
      </div>

      {/* Right: reset + logout */}
      <div className="flex items-center gap-3">
        {overrideCount > 0 && (
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs uppercase tracking-widest transition-all duration-200 rounded-sm"
            style={{
              background: confirmReset ? 'rgba(78,31,45,0.3)' : 'transparent',
              border: `1px solid ${confirmReset ? 'rgba(78,31,45,0.6)' : 'rgba(142,138,134,0.2)'}`,
              color: confirmReset ? '#D8C3A5' : '#8E8A86',
            }}
          >
            {confirmReset ? '¿Confirmar reset?' : 'Restablecer'}
          </button>
        )}

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="px-4 py-1.5 text-xs uppercase tracking-widest transition-all duration-200 rounded-sm disabled:opacity-50"
          style={{
            border: '1px solid rgba(142,138,134,0.2)',
            color: '#8E8A86',
          }}
        >
          {loggingOut ? 'Saliendo…' : 'Cerrar sesión'}
        </button>
      </div>
    </div>
  );
}
