'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/lib/AdminContext';

export function AdminToolbar() {
  const router = useRouter();
  const { isEditMode, toggleEditMode, resetOverrides, overrideCount, dirtyCount, saveStatus, lastSavedAt, save } = useAdmin();
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
        background: 'rgb(var(--tone-surface)/0.97)',
        borderTop: '1px solid rgb(var(--tone-line)/0.2)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Left: mode toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleEditMode}
          className="flex items-center gap-2 px-4 py-1.5 text-xs uppercase tracking-widest transition-all duration-200 rounded-sm"
          style={{
            background: isEditMode ? 'rgb(var(--tone-line)/0.2)' : 'rgb(var(--tone-line)/0.08)',
            border: isEditMode ? '1px solid rgb(var(--tone-line)/0.5)' : '1px solid rgb(var(--tone-line)/0.2)',
            color: isEditMode ? 'var(--tone-accent)' : 'var(--tone-muted)',
          }}
        >
          <span>{isEditMode ? '✏️' : '👁'}</span>
          <span>{isEditMode ? 'Editando' : 'Solo lectura'}</span>
        </button>

        <button
          onClick={() => void save()}
          disabled={dirtyCount === 0 || saveStatus === 'saving'}
          className="px-4 py-1.5 text-xs uppercase tracking-widest transition-all duration-200 rounded-sm disabled:opacity-40"
          style={{
            background: dirtyCount > 0 ? 'rgb(var(--tone-line)/0.25)' : 'transparent',
            border: '1px solid rgb(var(--tone-line)/0.5)',
            color: 'var(--tone-fg)',
          }}
        >
          {saveStatus === 'saving' ? 'Guardando…' : 'Guardar'}
        </button>

        <span className="text-xs" style={{ color: saveStatus === 'error' ? '#C98A8A' : 'rgb(var(--tone-line)/0.6)' }}>
          {saveStatus === 'error'
            ? 'Error al sincronizar · reintentá'
            : dirtyCount > 0
              ? `${dirtyCount} cambio${dirtyCount !== 1 ? 's' : ''} sin guardar`
              : lastSavedAt
                ? 'Todo guardado'
                : `${overrideCount} campo${overrideCount !== 1 ? 's' : ''} editado${overrideCount !== 1 ? 's' : ''}`}
        </span>
      </div>

      {/* Right: reset + logout */}
      <div className="flex items-center gap-3">
        {overrideCount > 0 && (
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs uppercase tracking-widest transition-all duration-200 rounded-sm"
            style={{
              background: confirmReset ? 'rgba(78,31,45,0.3)' : 'transparent',
              border: `1px solid ${confirmReset ? 'rgba(78,31,45,0.6)' : 'rgb(var(--tone-line)/0.2)'}`,
              color: confirmReset ? 'var(--tone-fg)' : 'var(--tone-muted)',
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
            border: '1px solid rgb(var(--tone-line)/0.2)',
            color: 'var(--tone-muted)',
          }}
        >
          {loggingOut ? 'Saliendo…' : 'Cerrar sesión'}
        </button>
      </div>
    </div>
  );
}
