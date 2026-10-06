const TABLE = 'admin_overrides';

function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, '');
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('SUPABASE_URL / SUPABASE_SECRET_KEY no están configuradas.');
  return { url, key };
}

async function rest(path: string, init: RequestInit & { prefer?: string } = {}) {
  const { url, key } = config();
  const { prefer, ...rest } = init;
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...rest,
    cache: 'no-store',
    headers: {
      apikey: key,
      // New sb_secret_ keys are not JWTs and must only be sent in the apikey header
      ...(key.startsWith('sb_') ? {} : { Authorization: `Bearer ${key}` }),
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
    },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return res;
}

export async function readOverrides(): Promise<Record<string, unknown>> {
  const res = await rest(`${TABLE}?select=key,value`);
  const rows = (await res.json()) as { key: string; value: unknown }[];
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

const ADDED = /^list:.+:added$/;
const DELETED = /^list:.+:deleted$/;

/** List keys are merged (not overwritten) so concurrent adds/deletes from different devices survive. */
function mergeListValue(key: string, existing: unknown, incoming: unknown): unknown {
  const a = Array.isArray(existing) ? existing : [];
  const b = Array.isArray(incoming) ? incoming : [];
  if (DELETED.test(key)) return [...new Set([...a, ...b])];
  if (ADDED.test(key)) {
    const byId = new Map<string, unknown>();
    for (const item of [...a, ...b]) {
      const id = (item as { id?: string })?.id;
      if (id) byId.set(id, item);
    }
    return [...byId.values()];
  }
  return incoming;
}

export async function writeOverrides(changes: Record<string, unknown>): Promise<Record<string, unknown>> {
  const keys = Object.keys(changes);
  if (keys.length > 0) {
    const current = await readOverrides();
    const now = new Date().toISOString();
    const rows = keys.map((key) => ({
      key,
      value: mergeListValue(key, current[key], changes[key]),
      updated_at: now,
    }));
    await rest(`${TABLE}?on_conflict=key`, {
      method: 'POST',
      prefer: 'resolution=merge-duplicates,return=minimal',
      body: JSON.stringify(rows),
    });
  }
  return readOverrides();
}

export async function clearOverrides(): Promise<void> {
  await rest(`${TABLE}?key=neq.`, { method: 'DELETE', prefer: 'return=minimal' });
}
