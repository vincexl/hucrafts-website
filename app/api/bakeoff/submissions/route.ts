// app/api/bakeoff/submissions/route.ts
import { NextResponse } from 'next/server';
import { SUBMISSIONS } from '@/lib/bakeoff';

export async function GET() {
  return NextResponse.json(SUBMISSIONS);
}
