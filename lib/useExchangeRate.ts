'use client';

import { useState, useEffect } from 'react';

export interface ExchangeRateResult {
  rate: number;
  updatedAt: string | null;
  loading: boolean;
  fallback: boolean;
}

/** Approximate USD→PYG rate used when the API is unreachable. */
const FALLBACK_RATE = 7600;

/**
 * Fetches the current USD→PYG exchange rate from /api/exchange-rate,
 * which is backed by open.er-api.com and cached for 24 hours server-side.
 */
export function useExchangeRate(): ExchangeRateResult {
  const [rate, setRate] = useState<number>(FALLBACK_RATE);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    fetch('/api/exchange-rate')
      .then((r) => r.json())
      .then((data) => {
        setRate(data.rate ?? FALLBACK_RATE);
        setUpdatedAt(data.updatedAt ?? null);
        setFallback(data.fallback ?? false);
      })
      .catch(() => {
        setRate(FALLBACK_RATE);
        setFallback(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return { rate, updatedAt, loading, fallback };
}
