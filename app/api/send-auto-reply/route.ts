import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

interface ContactPayload {
  fullname: string;
  email: string;
  message: string;
}

function sanitize(input: string) {
  return input.replace(/<[^>]*>?/gm, "").trim();
}

function generateReference() {
  return `VLV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const fullname = sanitize(body.fullname ?? "");
    const email = sanitize(body.email ?? "");
    const message = sanitize(body.message ?? "");

    if (!fullname || !email || !message) {
      return NextResponse.json(
        { error: "Validation failed", details: "All fields are required." },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      return NextResponse.json(
        {
          error: "Configuration error",
          details: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    const referenceNumber = generateReference();
    const preview =
      message.length > 200 ? `${message.slice(0, 200)}...` : message;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: emailUser, pass: emailPass },
    });

    await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: "Thanks for reaching out — Vicson L. Vidallon",
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1c1c22, #00c97a); padding: 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: #fff; margin: 0;">Thanks for reaching out, ${fullname}!</h2>
          </div>
          <div style="background: #f7f7f8; padding: 24px; border-radius: 0 0 12px 12px;">
            <p>I've received your message and will get back to you soon.</p>
            <div style="background: #fff; border-left: 3px solid #00c97a; padding: 12px 16px; margin: 16px 0; border-radius: 6px;">
              <p style="margin: 0; color: #555;"><em>"${preview}"</em></p>
            </div>
            <p style="font-size: 13px; color: #777;">Reference: <strong>${referenceNumber}</strong></p>
            <p style="font-size: 13px; color: #777;">Submitted: ${new Date().toLocaleString()}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p style="font-size: 13px; color: #999;">
              Vicson L. Vidallon — Full-Stack Developer<br/>
              Viber: 0981 366 1984
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      message: "Auto-reply sent successfully",
      referenceNumber,
    });
  } catch (error) {
    const err = error as { message?: string };
    return NextResponse.json(
      { error: "Failed to send auto-reply", details: err.message },
      { status: 500 }
    );
  }
}
