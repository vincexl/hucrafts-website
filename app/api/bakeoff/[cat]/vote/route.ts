export const runtime = "edge";
import { NextResponse } from "next/server";
import { SUBMISSIONS_BY_CAT, recordVote, assertCat } from "@/lib/bakeoff";

export async function POST(req: Request, { params }: { params: { cat: string } }) {
  try {
    assertCat(params.cat);
    const { id } = await req.json();
    const valid = SUBMISSIONS_BY_CAT[params.cat].some((s) => s.id === id);
    if (!valid) return NextResponse.json({ error: "invalid_submission" }, { status: 400 });
    await recordVote(params.cat, id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}
