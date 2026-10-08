'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { CrescentMark } from '@/components/brand/CrescentMark';

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
    <div className="relative min-h-screen flex items-center justify-center px-6 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-sm"
      >
        <div className="flex justify-center mb-8">
          <CrescentMark className="h-12 w-12" style={{ color: 'var(--tone-accent)' }} />
        </div>

        <div
          className="rounded-sm border px-8 py-10"
          style={{
            borderColor: 'rgb(var(--tone-line)/0.4)',
            background: 'rgb(var(--tone-surface)/0.45)',
            boxShadow: '0 1px 0 rgb(255 250 235/0.5) inset, 0 18px 40px -24px rgb(var(--tone-line)/0.5)',
          }}
        >
          <p className="mk-chapter-eyebrow text-center mb-2" style={{ fontSize: '0.75rem' }}>
            Acceso Administrativo
          </p>
          <h1 className="mk-chapter-title text-center text-4xl mb-8" >
            Moonlit Kingdom
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-widest mb-2"
                style={{ color: 'var(--tone-accent)' }}
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
                  className="mk-login-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="mk-focus absolute right-3 top-1/2 -translate-y-1/2 transition-opacity duration-200 hover:opacity-80"
                  style={{ color: 'var(--tone-accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
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
                style={{ color: 'var(--tone-fg)', background: 'rgba(78,31,45,0.4)', border: '1px solid rgba(78,31,45,0.6)' }}
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mk-focus w-full py-3 mt-2 text-xs uppercase tracking-[0.25em] transition-all duration-300 disabled:opacity-50"
              style={{
                background: loading ? 'rgb(var(--tone-line)/0.1)' : 'rgb(var(--tone-line)/0.15)',
                border: '1px solid rgb(var(--tone-line)/0.35)',
                color: 'var(--tone-fg)',
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
