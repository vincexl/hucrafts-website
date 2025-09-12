export const runtime = "edge";
import { NextResponse } from "next/server";
import { SUBMISSIONS_BY_CAT, assertCat } from "@/lib/bakeoff";

export async function GET(_: Request, { params }: { params: { cat: string } }) {
  try {
    assertCat(params.cat);
    return NextResponse.json(SUBMISSIONS_BY_CAT[params.cat]);
  } catch {
    return NextResponse.json({ error: "invalid_category" }, { status: 400 });
  }
}
