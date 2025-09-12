export const runtime = "edge";
import { NextResponse } from "next/server";
import { getResults, assertCat } from "@/lib/bakeoff";

export async function GET(_: Request, { params }: { params: { cat: string } }) {
  try {
    assertCat(params.cat);
    const data = await getResults(params.cat);
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "invalid_category" }, { status: 400 });
  }
}
