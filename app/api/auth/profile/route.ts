import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';
import { AdminProfileData, adminProfileOptions, hashSecret } from '@/lib/session';

function generateRecoveryCode() {
  // Human-friendly, uppercase alphanumeric code, e.g. "K7QM-3XZP-9F2R"
  const raw = randomBytes(9).toString('hex').toUpperCase();
  return `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`;
}

export async function GET() {
  const profile = await getIronSession<AdminProfileData>(await cookies(), adminProfileOptions);
  const hasProfile = Boolean(profile.username && profile.passwordHash);

  return NextResponse.json({
    hasProfile,
    username: profile.username ?? null,
    createdAt: profile.createdAt ?? null,
  });
}

export async function POST(req: Request) {
  const body = (await req.json()) as {
    username?: string;
    password?: string;
    recoveryCode?: string;
  };

  const username = body.username?.trim();
  const password = body.password?.trim();
  let recoveryCode = body.recoveryCode?.trim();

  if (!username || !password) {
    return NextResponse.json(
      { ok: false, error: 'Completá usuario y contraseña.' },
      { status: 400 },
    );
  }

  // The recovery code is optional on creation — if the user doesn't provide
  // one, generate it automatically so profile creation never gets blocked.
  let generatedRecoveryCode: string | null = null;
  if (!recoveryCode) {
    generatedRecoveryCode = generateRecoveryCode();
    recoveryCode = generatedRecoveryCode;
  }

  const profile = await getIronSession<AdminProfileData>(await cookies(), adminProfileOptions);
  profile.username = username;
  profile.passwordHash = hashSecret(password);
  profile.recoveryHash = hashSecret(recoveryCode);
  profile.createdAt = profile.createdAt ?? new Date().toISOString();
  await profile.save();

  return NextResponse.json({ ok: true, recoveryCode: generatedRecoveryCode });
}
