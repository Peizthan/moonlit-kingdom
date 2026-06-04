import { NextResponse } from 'next/server';

// Fetches the live USD → PYG exchange rate from open.er-api.com.
// Next.js caches the upstream fetch for 24 hours so the external API
// is only hit once per day regardless of how many clients request it.
export async function GET() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 86400 }, // 24-hour server-side cache
    });

    if (!res.ok) throw new Error(`upstream ${res.status}`);

    const data = await res.json();

    if (data.result !== 'success') throw new Error('api error');

    return NextResponse.json({
      rate: data.rates.PYG as number,
      updatedAt: data.time_last_update_utc as string,
      fallback: false,
    });
  } catch {
    // Return a conservative fallback so the UI never breaks.
    // ~7,600 ₲/USD as of mid-2026.
    return NextResponse.json({
      rate: 7600,
      updatedAt: null,
      fallback: true,
    });
  }
}
