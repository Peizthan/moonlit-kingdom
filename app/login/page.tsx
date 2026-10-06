'use client';

import { useState, FormEvent, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { StarField } from '@/components/layout/StarField';

const inputStyle: CSSProperties = {
  background: 'rgba(18,28,46,0.6)',
  border: '1px solid rgba(176,141,87,0.25)',
  color: '#D8C3A5',
  outline: 'none',
  width: '100%',
  padding: '12px 40px 12px 16px',
  fontSize: '0.875rem',
  letterSpacing: '0.02em',
  fontFamily: "'Georgia', 'Times New Roman', serif",
};

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const text = await res.text();
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(`Error del servidor (${res.status})`);
      }

      if (!res.ok || data.ok === false) {
        throw new Error(data.error ?? `Error del servidor (${res.status})`);
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operación fallida');
    } finally {
      setLoading(false);
    }
  }

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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-widest mb-2"
                style={{ color: 'rgba(176,141,87,0.5)' }}
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity duration-200 hover:opacity-80"
                  style={{ color: 'rgba(176,141,87,0.55)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

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
          </form>
        </div>
      </motion.div>
    </div>
  );
}
