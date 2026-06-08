'use client';

import { useState, useEffect } from 'react';
import { BudgetCategory } from '@/lib/types';
import { weddingData } from '@/data/wedding-data';

interface UseBudgetResult {
  budget: BudgetCategory[];
  loading: boolean;
  error: string | null;
  fromSheet: boolean;
}

export function useBudget(): UseBudgetResult {
  const [budget, setBudget] = useState<BudgetCategory[]>(weddingData.budget);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromSheet, setFromSheet] = useState(false);

  useEffect(() => {
    fetch('/api/budget')
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setBudget(data.items);
          setFromSheet(true);
        } else {
          setError(data.error ?? 'No se pudieron cargar los datos de la planilla');
        }
      })
      .catch(() => {
        setError('Error al conectar con la planilla de Google Sheets');
      })
      .finally(() => setLoading(false));
  }, []);

  return { budget, loading, error, fromSheet };
}
