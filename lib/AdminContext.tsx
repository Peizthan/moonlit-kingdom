'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

const STORAGE_KEY = 'moonlit-admin-overrides';

interface AdminContextValue {
  isEditMode: boolean;
  toggleEditMode: () => void;
  getOverride: <T>(id: string, fallback: T) => T;
  setOverride: (id: string, value: unknown) => void;
  resetOverrides: () => void;
  overrideCount: number;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, unknown>>({});

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setOverrides(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage whenever overrides change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      // ignore
    }
  }, [overrides]);

  const toggleEditMode = useCallback(() => setIsEditMode((v) => !v), []);

  const getOverride = useCallback(
    <T,>(id: string, fallback: T): T =>
      id in overrides ? (overrides[id] as T) : fallback,
    [overrides],
  );

  const setOverride = useCallback((id: string, value: unknown) => {
    setOverrides((prev) => ({ ...prev, [id]: value }));
  }, []);

  const resetOverrides = useCallback(() => {
    setOverrides({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        getOverride,
        setOverride,
        resetOverrides,
        overrideCount: Object.keys(overrides).length,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
