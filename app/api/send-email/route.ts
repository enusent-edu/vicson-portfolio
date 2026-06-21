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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    if (fullname.length > 100) {
      return NextResponse.json(
        { error: "Validation failed", details: "Name is too long." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Validation failed", details: "Invalid email format." },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Validation failed", details: "Message is too long." },
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

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: emailUser, pass: emailPass },
    });

    await transporter.sendMail({
      from: emailUser,
      to: emailUser,
      replyTo: email,
      subject: `New inquiry from ${fullname}`,
      text: `From: ${fullname} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${fullname} (${email})</p><p>${message.replace(
        /\n/g,
        "<br/>"
      )}</p>`,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    const err = error as { code?: string; message?: string };
    if (err.code === "EAUTH") {
      return NextResponse.json(
        { error: "Authentication failed", details: err.message },
        { status: 500 }
      );
    }
    if (err.code === "ECONNECTION") {
      return NextResponse.json(
        { error: "Connection failed", details: err.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Unexpected error", details: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
