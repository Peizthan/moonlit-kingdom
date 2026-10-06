'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  ReactNode,
} from 'react';

const LEGACY_STORAGE_KEY = 'moonlit-admin-overrides';
const DRAFT_STORAGE_KEY = 'moonlit-admin-draft';
const API_URL = '/api/overrides';
const AUTOSAVE_MS = 5 * 60 * 1000;
const POLL_MS = 30 * 1000;

export type SaveStatus = 'idle' | 'saving' | 'error';

interface AdminContextValue {
  isEditMode: boolean;
  toggleEditMode: () => void;
  getOverride: <T>(id: string, fallback: T) => T;
  setOverride: (id: string, value: unknown) => void;
  resetOverrides: () => void;
  overrideCount: number;
  dirtyCount: number;
  saveStatus: SaveStatus;
  lastSavedAt: number | null;
  save: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

type Overrides = Record<string, unknown>;

const isListKey = (key: string) => /^list:.+:(added|deleted)$/.test(key);

/** Mirrors the server-side merge so list additions/deletions from other devices are never hidden by a local draft. */
function mergeValue(key: string, a: unknown, b: unknown): unknown {
  if (!isListKey(key)) return b;
  const left = Array.isArray(a) ? a : [];
  const right = Array.isArray(b) ? b : [];
  if (key.endsWith(':deleted')) return [...new Set([...left, ...right])];
  const byId = new Map<string, unknown>();
  for (const item of [...left, ...right]) {
    const id = (item as { id?: string })?.id;
    if (id) byId.set(id, item);
  }
  return [...byId.values()];
}

function readDraft(): Overrides {
  const draft: Overrides = {};
  try {
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) Object.assign(draft, JSON.parse(legacy));
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (saved) Object.assign(draft, JSON.parse(saved));
  } catch {
    // ignore
  }
  return draft;
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [saved, setSaved] = useState<Overrides>({});
  const [draft, setDraft] = useState<Overrides>({});
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  const draftRef = useRef<Overrides>({});
  const savingRef = useRef(false);
  const hydratedRef = useRef(false);

  useEffect(() => {
    draftRef.current = draft;
    if (!hydratedRef.current) return;
    try {
      if (Object.keys(draft).length > 0) localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      else localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, [draft]);

  const fetchRemote = useCallback(async () => {
    try {
      const res = await fetch(API_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { overrides: Overrides };
      setSaved(data.overrides);
    } catch {
      setSaveStatus((s) => (s === 'saving' ? s : 'error'));
    }
  }, []);

  // Initial load: recover local draft (including pre-existing browser-only edits) and fetch shared state
  useEffect(() => {
    const recovered = readDraft();
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // ignore
    }
    hydratedRef.current = true;
    if (Object.keys(recovered).length > 0) queueMicrotask(() => setDraft(recovered));
    queueMicrotask(() => void fetchRemote());
  }, [fetchRemote]);

  // Pick up edits made on other devices
  useEffect(() => {
    const refresh = () => {
      if (!savingRef.current && document.visibilityState === 'visible') fetchRemote();
    };
    const timer = setInterval(refresh, POLL_MS);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [fetchRemote]);

  const save = useCallback(async () => {
    const snapshot = draftRef.current;
    if (savingRef.current || Object.keys(snapshot).length === 0) return;
    savingRef.current = true;
    setSaveStatus('saving');
    try {
      const res = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes: snapshot }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { overrides: Overrides };
      setSaved(data.overrides);
      // Keep anything edited while the request was in flight
      setDraft((prev) => {
        const next: Overrides = {};
        for (const [k, v] of Object.entries(prev)) if (snapshot[k] !== v) next[k] = v;
        return next;
      });
      setLastSavedAt(Date.now());
      setSaveStatus('idle');
    } catch {
      setSaveStatus('error');
    } finally {
      savingRef.current = false;
    }
  }, []);

  // Autosave every 5 minutes
  useEffect(() => {
    const timer = setInterval(() => {
      void save();
    }, AUTOSAVE_MS);
    return () => clearInterval(timer);
  }, [save]);

  const dirtyCount = Object.keys(draft).length;

  useEffect(() => {
    if (dirtyCount === 0) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirtyCount]);

  const overrides = useMemo(() => {
    const merged: Overrides = { ...saved };
    for (const [k, v] of Object.entries(draft)) merged[k] = mergeValue(k, saved[k], v);
    return merged;
  }, [saved, draft]);

  const toggleEditMode = useCallback(() => setIsEditMode((v) => !v), []);

  const getOverride = useCallback(
    <T,>(id: string, fallback: T): T =>
      id in overrides ? (overrides[id] as T) : fallback,
    [overrides],
  );

  const setOverride = useCallback((id: string, value: unknown) => {
    setDraft((prev) => ({ ...prev, [id]: value }));
  }, []);

  const resetOverrides = useCallback(() => {
    setSaveStatus('saving');
    fetch(API_URL, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        setSaved({});
        setDraft({});
        setSaveStatus('idle');
      })
      .catch(() => setSaveStatus('error'));
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
        dirtyCount,
        saveStatus,
        lastSavedAt,
        save,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    // Outside AdminProvider (e.g. presentation page) � return safe no-op defaults
    return {
      isEditMode: false,
      toggleEditMode: () => {},
      getOverride: <T,>(_id: string, fallback: T) => fallback,
      setOverride: () => {},
      resetOverrides: () => {},
      overrideCount: 0,
      dirtyCount: 0,
      saveStatus: 'idle',
      lastSavedAt: null,
      save: async () => {},
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
