interface Env {
  RESEND_API_KEY: string;
  EMAIL_TO: string;
}

interface ContactPayload {
  fullname: string;
  email: string;
  message: string;
}

function sanitize(input: string) {
  return input.replace(/<[^>]*>?/gm, "").trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generateReference() {
  return `VLV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = (await request.json()) as ContactPayload;
    const fullname = sanitize(body.fullname ?? "");
    const email = sanitize(body.email ?? "");
    const message = sanitize(body.message ?? "");

    if (!fullname || !email || !message) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return Response.json({ error: "Invalid email format." }, { status: 400 });
    }
    if (fullname.length > 100 || message.length > 5000) {
      return Response.json({ error: "Input too long." }, { status: 400 });
    }

    const referenceNumber = generateReference();
    const preview = message.length > 200 ? `${message.slice(0, 200)}...` : message;
    const emailTo = env.EMAIL_TO || "enusent@gmail.com";

    // Send notification to Vicson
    const notifyRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [emailTo],
        reply_to: email,
        subject: `New inquiry from ${fullname}`,
        html: `<p><strong>From:</strong> ${fullname} (${email})</p><p>${message.replace(/\n/g, "<br/>")}</p><p style="color:#999;font-size:12px;">Ref: ${referenceNumber}</p>`,
      }),
    });

    if (!notifyRes.ok) {
      const err = await notifyRes.json();
      return Response.json({ error: "Failed to send email.", details: err }, { status: 500 });
    }

    // Send auto-reply to sender
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Vicson L. Vidallon <onboarding@resend.dev>",
        to: [email],
        subject: "Thanks for reaching out — Vicson L. Vidallon",
        html: `
          <div style="font-family:-apple-system,sans-serif;max-width:560px;margin:0 auto;">
            <div style="background:linear-gradient(135deg,#1c1c22,#00c97a);padding:24px;border-radius:12px 12px 0 0;">
              <h2 style="color:#fff;margin:0;">Thanks for reaching out, ${fullname}!</h2>
            </div>
            <div style="background:#f7f7f8;padding:24px;border-radius:0 0 12px 12px;">
              <p>I've received your message and will get back to you soon.</p>
              <div style="background:#fff;border-left:3px solid #00c97a;padding:12px 16px;margin:16px 0;border-radius:6px;">
                <p style="margin:0;color:#555;"><em>"${preview}"</em></p>
              </div>
              <p style="font-size:13px;color:#777;">Reference: <strong>${referenceNumber}</strong></p>
              <p style="font-size:13px;color:#777;">Submitted: ${new Date().toLocaleString()}</p>
              <hr style="border:none;border-top:1px solid #ddd;margin:20px 0;"/>
              <p style="font-size:13px;color:#999;">Vicson L. Vidallon — Full-Stack Developer<br/>Viber: 0981 366 1984</p>
            </div>
          </div>
        `,
      }),
    });

    return Response.json({ message: "Email sent successfully" });
  } catch (error) {
    const err = error as { message?: string };
    return Response.json({ error: "Unexpected error.", details: err.message }, { status: 500 });
  }
};
