import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = { name?: string; email?: string; message?: string };

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  if (message.length > 5000 || name.length > 200) {
    return NextResponse.json({ ok: false, error: "Too long" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? "hello@travelmate.tech";
  const from = process.env.CONTACT_FROM ?? "Portfolio <noreply@travelmate.tech>";

  if (!apiKey) {
    console.log("[contact] RESEND_API_KEY missing — message logged only", { name, email });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `Portfolio · ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, delivered: true });
}
