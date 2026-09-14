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
  if (!ctx) {
    // Outside AdminProvider (e.g. presentation page) — return safe no-op defaults
    return {
      isEditMode: false,
      toggleEditMode: () => {},
      getOverride: <T,>(_id: string, fallback: T) => fallback,
      setOverride: () => {},
      resetOverrides: () => {},
      overrideCount: 0,
    };
  }
  return ctx;
}

/** Generates a reasonably unique id for newly created items (client-side only). */
export function genId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Layers create/delete capability on top of a static list coming from data/wedding-data.ts
 * (or a live source such as the budget sheet). Additions and deletions are stored as admin
 * overrides, keyed by `listKey`, so they persist in localStorage just like field edits.
 */
export function useEditableList<T extends { id: string }>(listKey: string, baseItems: T[]) {
  const { getOverride, setOverride } = useAdmin();

  const deletedIds = getOverride<string[]>(`list:${listKey}:deleted`, []);
  const addedItems = getOverride<T[]>(`list:${listKey}:added`, []);

  const items = [...baseItems, ...addedItems].filter((item) => !deletedIds.includes(item.id));

  const addItem = useCallback(
    (item: T) => {
      setOverride(`list:${listKey}:added`, [...addedItems, item]);
    },
    [listKey, addedItems, setOverride],
  );

  const removeItem = useCallback(
    (id: string) => {
      if (!deletedIds.includes(id)) {
        setOverride(`list:${listKey}:deleted`, [...deletedIds, id]);
      }
    },
    [listKey, deletedIds, setOverride],
  );

  return { items, addItem, removeItem };
}
