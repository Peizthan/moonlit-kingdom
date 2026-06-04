'use client';

import { useEffect, useState, FormEvent, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { StarField } from '@/components/layout/StarField';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [profileUsername, setProfileUsername] = useState<string | null>(null);
  const [showRecovery, setShowRecovery] = useState(false);

  useEffect(() => {
    fetch('/api/auth/profile')
      .then((res) => res.json())
      .then((data) => {
        setProfileExists(Boolean(data.hasProfile));
        setProfileUsername(data.username ?? null);
      })
      .catch(() => {
        setProfileExists(false);
        setProfileUsername(null);
      });
  }, []);

  async function postAction(endpoint: string, payload: Record<string, string>, onOk: (data: any) => void) {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || data.ok === false) {
        throw new Error(data.error ?? 'Operación fallida');
      }

      onOk(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operación fallida');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await postAction('/api/auth/login', { username, password }, () => {
      router.push('/dashboard');
      router.refresh();
    });
  }

  async function handleCreateProfile() {
    await postAction('/api/auth/profile', { username, password, recoveryCode }, () => {
      setProfileExists(true);
      setProfileUsername(username.trim());
      setSuccess('Perfil admin creado. Ya podés ingresar con esas credenciales.');
    });
  }

  async function handleCheckPassword() {
    await postAction('/api/auth/check-password', { username, password }, () => {
      setSuccess('La contraseña coincide con el perfil guardado.');
    });
  }

  async function handleResetPassword() {
    await postAction(
      '/api/auth/reset-password',
      { username, recoveryCode, newPassword },
      () => {
        setSuccess('Contraseña restablecida. Ya podés ingresar con la nueva contraseña.');
        setPassword(newPassword);
        setShowRecovery(false);
      },
    );
  }

  const inputStyle: CSSProperties = {
    background: 'rgba(18,28,46,0.6)',
    border: '1px solid rgba(176,141,87,0.25)',
    color: '#D8C3A5',
    outline: 'none',
    width: '100%',
    padding: '12px 16px',
    fontSize: '0.875rem',
    letterSpacing: '0.02em',
    fontFamily: "'Georgia', 'Times New Roman', serif",
  } as React.CSSProperties;

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(160deg, #10261D 0%, #121C2E 50%, #10261D 100%)' }}
    >
      <StarField count={100} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(176,141,87,0.05) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-sm"
      >
        {/* Crescent moon */}
        <div className="flex justify-center mb-8">
          <svg width="52" height="52" viewBox="0 0 80 80" fill="none">
            <path
              d="M48 16C34.7 16 24 26.7 24 40C24 53.3 34.7 64 48 64C41.4 64 36 58.6 36 52C36 45.4 41.4 40 48 40C54.6 40 60 45.4 60 52C60 58.6 54.6 64 48 64C61.3 64 72 53.3 72 40C72 26.7 61.3 16 48 16Z"
              stroke="#B08D57"
              strokeWidth="1"
              fill="none"
              opacity="0.85"
            />
          </svg>
        </div>

        {/* Card */}
        <div
          className="rounded-sm border px-8 py-10"
          style={{
            borderColor: 'rgba(176,141,87,0.2)',
            background: 'rgba(16,38,29,0.6)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] text-center mb-2"
            style={{ color: 'rgba(176,141,87,0.6)' }}
          >
            Acceso Administrativo
          </p>
          <h1
            className="text-2xl font-light text-center mb-8"
            style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
          >
            Moonlit Kingdom
          </h1>

          <div
            className="rounded-sm border px-4 py-3 mb-6 text-xs leading-relaxed"
            style={{
              borderColor: 'rgba(176,141,87,0.18)',
              background: 'rgba(176,141,87,0.06)',
              color: '#C7C0B6',
            }}
          >
            {profileExists ? (
              <>
                Perfil admin detectado{profileUsername ? ` para ${profileUsername}` : ''}. Si querés cambiarlo,
                usá <span style={{ color: '#B08D57' }}>Crear/actualizar perfil</span>.
              </>
            ) : (
              <>
                No hay perfil admin guardado todavía. Creá uno con usuario, contraseña y código de recuperación.
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-xs uppercase tracking-widest mb-2"
                style={{ color: 'rgba(176,141,87,0.5)' }}
              >
                Usuario
              </label>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div>
              <label
                className="block text-xs uppercase tracking-widest mb-2"
                style={{ color: 'rgba(176,141,87,0.5)' }}
              >
                Contraseña
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div>
              <label
                className="block text-xs uppercase tracking-widest mb-2"
                style={{ color: 'rgba(176,141,87,0.5)' }}
              >
                Código de recuperación
              </label>
              <input
                type="password"
                autoComplete="off"
                value={recoveryCode}
                onChange={(e) => setRecoveryCode(e.target.value)}
                style={inputStyle}
                placeholder="Usalo para crear perfil y recuperar acceso"
              />
            </div>

            {showRecovery && (
              <div>
                <label
                  className="block text-xs uppercase tracking-widest mb-2"
                  style={{ color: 'rgba(176,141,87,0.5)' }}
                >
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={inputStyle}
                  placeholder="Ingresá la nueva contraseña"
                />
              </div>
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-center py-2 px-3 rounded-sm"
                style={{ color: '#D8C3A5', background: 'rgba(78,31,45,0.4)', border: '1px solid rgba(78,31,45,0.6)' }}
              >
                {error}
              </motion.p>
            )}

            {success && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-center py-2 px-3 rounded-sm"
                style={{ color: '#D8C3A5', background: 'rgba(29,74,58,0.35)', border: '1px solid rgba(29,74,58,0.55)' }}
              >
                {success}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 text-xs uppercase tracking-[0.25em] transition-all duration-300 disabled:opacity-50"
              style={{
                background: loading ? 'rgba(176,141,87,0.1)' : 'rgba(176,141,87,0.15)',
                border: '1px solid rgba(176,141,87,0.35)',
                color: '#B08D57',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Ingresando…' : 'Ingresar'}
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={handleCreateProfile}
                className="py-3 text-xs uppercase tracking-[0.25em] transition-all duration-300 disabled:opacity-50"
                style={{
                  background: 'rgba(176,141,87,0.12)',
                  border: '1px solid rgba(176,141,87,0.28)',
                  color: '#B08D57',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                Crear/actualizar perfil
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleCheckPassword}
                className="py-3 text-xs uppercase tracking-[0.25em] transition-all duration-300 disabled:opacity-50"
                style={{
                  background: 'rgba(18,28,46,0.45)',
                  border: '1px solid rgba(176,141,87,0.2)',
                  color: '#D8C3A5',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                Verificar contraseña
              </button>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => setShowRecovery((value) => !value)}
              className="w-full py-3 text-xs uppercase tracking-[0.25em] transition-all duration-300 disabled:opacity-50"
              style={{
                background: 'transparent',
                border: '1px dashed rgba(176,141,87,0.25)',
                color: '#8E8A86',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {showRecovery ? 'Cancelar recuperación' : 'Olvidé mi contraseña'}
            </button>

            {showRecovery && (
              <button
                type="button"
                disabled={loading}
                onClick={handleResetPassword}
                className="w-full py-3 text-xs uppercase tracking-[0.25em] transition-all duration-300 disabled:opacity-50"
                style={{
                  background: 'rgba(78,31,45,0.26)',
                  border: '1px solid rgba(78,31,45,0.55)',
                  color: '#D8C3A5',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                Restablecer contraseña
              </button>
            )}
          </form>
        </div>

        <p
          className="text-center text-xs mt-6"
          style={{ color: 'rgba(142,138,134,0.4)' }}
        >
          Constanza & Ivan · 21 de agosto de 2027
        </p>
      </motion.div>
    </div>
  );
}
