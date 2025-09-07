export const runtime = 'edge';

// app/api/bakeoff/results/route.ts
import { NextResponse } from 'next/server';
import { getResults } from '@/lib/bakeoff';

export async function GET() {
  const data = await getResults();
  return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } });
}
