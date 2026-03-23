import { corsHeaders } from "../_shared/cors.ts";

declare const Deno: {
  serve: (handler: (req: Request) => Response | Promise<Response>) => void;
  env: {
    get: (key: string) => string | undefined;
  };
};

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const jsonResponse = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });

const normalize = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const emailIsValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const buildAutoReplyHtml = (name: string) => {
  const safeName = name
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:640px;margin:0 auto;padding:24px;">
      <h2 style="margin:0 0 16px;color:#111827;">Thanks for contacting me, ${safeName}.</h2>
      <p style="margin:0 0 12px;">I received your message successfully.</p>
      <p style="margin:0 0 12px;">This is an automatic confirmation email to let you know your submission came through.</p>
      <p style="margin:0;">I will get back to you as soon as possible.</p>
    </div>
  `;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse(405, {
      success: false,
      error: "Method not allowed",
    });
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const fromEmail = Deno.env.get("AUTORESPONDER_FROM_EMAIL");
  const replyTo = Deno.env.get("AUTORESPONDER_REPLY_TO");

  if (!resendApiKey || !fromEmail) {
    console.error("Missing required environment variables for autoresponder.");
    return jsonResponse(500, {
      success: false,
      error: "Function not configured",
    });
  }

  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse(400, {
      success: false,
      error: "Invalid JSON payload",
    });
  }

  const name = normalize(payload.name);
  const email = normalize(payload.email).toLowerCase();
  const message = normalize(payload.message);

  if (!name || !email || !message) {
    return jsonResponse(400, {
      success: false,
      error: "name, email, and message are required",
    });
  }

  if (!emailIsValid(email)) {
    return jsonResponse(400, {
      success: false,
      error: "Invalid email address",
    });
  }

  if (name.length > 100 || email.length > 255 || message.length > 2000) {
    return jsonResponse(400, {
      success: false,
      error: "Input exceeds allowed length",
    });
  }

  const subject = "We received your message";
  const text = [
    `Hi ${name},`,
    "",
    "Thanks for reaching out. This is an automatic confirmation that your message was received successfully.",
    "",
    "I will respond as soon as possible.",
  ].join("\n");

  const resendBody: Record<string, unknown> = {
    from: fromEmail,
    to: [email],
    subject,
    text,
    html: buildAutoReplyHtml(name),
    tags: [
      {
        name: "source",
        value: "portfolio-contact",
      },
      {
        name: "type",
        value: "autoresponder",
      },
    ],
  };

  if (replyTo) {
    resendBody.reply_to = [replyTo];
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resendBody),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Resend API error:", errorText);
    return jsonResponse(502, {
      success: false,
      error: "Failed to send auto-response email",
    });
  }

  const resendData = await resendResponse.json();

  return jsonResponse(200, {
    success: true,
    autoResponseSent: true,
    emailId: resendData?.id ?? null,
  });
});
