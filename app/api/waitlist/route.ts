import { NextRequest, NextResponse } from "next/server";

// Basic RFC-5322-ish email check — good enough for a waitlist form.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistPayload = {
  email?: unknown;
  stage?: unknown;
  message?: unknown;
};

export async function POST(request: NextRequest) {
  let body: WaitlistPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const stage = typeof body.stage === "string" ? body.stage.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!stage) {
    return NextResponse.json(
      { error: "Please tell us where you are right now." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("GOOGLE_SHEETS_WEBHOOK_URL is not configured.");
    return NextResponse.json(
      { error: "Waitlist is not configured yet. Please try again later." },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        stage,
        message,
        timestamp: new Date().toISOString(),
      }),
      // Apps Script issues a 302 redirect to script.googleusercontent.com;
      // fetch follows it by default, so we just await the final response.
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Google Sheets webhook failed:", res.status, text);
      return NextResponse.json(
        { error: "Could not save your spot. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Error calling Google Sheets webhook:", err);
    return NextResponse.json(
      { error: "Could not save your spot. Please try again." },
      { status: 502 },
    );
  }
}
