'use client';

import { useCallback, useEffect, useState } from 'react';
import type { SheetData } from '@/lib/sheet';

interface UseSheetResult {
  data: SheetData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useSheet(): UseSheetResult {
  const [data, setData] = useState<SheetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/sheet', { signal: controller.signal, cache: 'no-store' })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || json.error) throw new Error(json.error ?? `Error del servidor (${res.status})`);
        setData(json as SheetData);
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
  }, [nonce]);

  const refresh = useCallback(() => {
    setLoading(true);
    setNonce((n) => n + 1);
  }, []);

  return { data, loading, error, refresh };
}
