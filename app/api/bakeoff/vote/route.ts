export const runtime = 'edge';

// app/api/bakeoff/vote/route.ts
import { NextResponse } from 'next/server';
import { SUBMISSIONS, recordVote } from '@/lib/bakeoff';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const ok = SUBMISSIONS.some(s => s.id === id);
    if (!ok) return NextResponse.json({ error: 'Invalid submission id' }, { status: 400 });
    await recordVote(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
