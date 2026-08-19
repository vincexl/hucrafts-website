export const runtime = "edge";
import { NextResponse } from "next/server";

const TO = process.env.CONTACT_TO ?? "vincent.hu@hucrafts.com";
// Resend requires a verified domain to use an @hucrafts.com sender; until then
// the onboarding sender can only deliver to the account owner's address.
const FROM = process.env.CONTACT_FROM ?? "HuCrafts Website <onboarding@resend.dev>";

const MAX = { name: 200, email: 320, topic: 200, budget: 100, message: 5000 };

function field(value: unknown, limit: number): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (field(body.company, 200)) return NextResponse.json({ ok: true });

  const name = field(body.name, MAX.name);
  const email = field(body.email, MAX.email);
  const topic = field(body.topic, MAX.topic);
  const budget = field(body.budget, MAX.budget);
  const message = field(body.message, MAX.message);

  if (!message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Topic: ${topic}`,
    `Budget: ${budget}`,
    "",
    message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `HuCrafts inquiry — ${topic || "General"}`,
      text,
    }),
  });

  if (!res.ok) return NextResponse.json({ error: "send_failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
