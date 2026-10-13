'use client';

import { useCallback, useEffect, useState } from 'react';
import type { SheetData, SheetSource } from '@/lib/sheet';
import { isSheetData } from '@/lib/sheet-data';

interface UseSheetResult {
  data: SheetData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useSheet(source: SheetSource = 'budget'): UseSheetResult {
  const [data, setData] = useState<SheetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/sheet?source=${source}`, { signal: controller.signal, cache: 'no-store' })
      .then(async (res) => {
        if (!res.headers.get('content-type')?.includes('application/json')) throw new Error('La respuesta no es válida. Vuelve a iniciar sesión e intenta actualizar.');
        const json = await res.json();
        if (!res.ok || json.error) throw new Error(json.error ?? `Error del servidor (${res.status})`);
        if (!isSheetData(json, source)) throw new Error('No se pudo verificar la estructura de la planilla.');
        setData(json);
        setError(null);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'No se pudo cargar la planilla');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [nonce, source]);

  const refresh = useCallback(() => {
    setLoading(true);
    setNonce((n) => n + 1);
  }, []);

  return { data: data?.source === source ? data : null, loading, error, refresh };
}
