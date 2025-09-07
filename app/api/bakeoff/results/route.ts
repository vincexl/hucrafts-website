export const runtime = 'edge';

// app/api/bakeoff/results/route.ts
import { NextResponse } from 'next/server';
import { getResults } from '@/lib/bakeoff';

export async function GET() {
  try {
    const data = await getResults();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store, max-age=0',
      },
    });
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ error: 'results_failed', detail: String(e) }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
