import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const body = await req.json();

    const {
      name,
      email,
      phone,
      fuel,
      cost,
      days,
      monthlySpend,
      estimatedSaving,
    } = body;

    // 1️⃣ Send email to YOU
    const internalEmail = await resend.emails.send({
      from: "Fuel Save Group <enquiries@fuelsavegroup.com>",
      to: ["lucas@mltconsultants.co.uk"],
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: `
        <h2>New Fuel Save Group enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

        <hr />

        <h3>Site Details</h3>
        <p><strong>Fuel:</strong> ${fuel || "N/A"}</p>
        <p><strong>Cost:</strong> ${cost || "N/A"}</p>
        <p><strong>Days:</strong> ${days || "N/A"}</p>

        <hr />

        <h3>Estimated Impact</h3>
        <p><strong>Monthly Spend:</strong> £${monthlySpend || 0}</p>
        <p><strong>Estimated Saving:</strong> £${estimatedSaving || 0}</p>
      `,
    });

    if (internalEmail.error) {
      console.error("INTERNAL EMAIL ERROR:", internalEmail.error);
      return NextResponse.json({ error: "Email failed" }, { status: 500 });
    }

    // 2️⃣ Send auto-reply to CUSTOMER
    await resend.emails.send({
      from: "Fuel Save Group <enquiries@fuelsavegroup.com>",
      to: [email],
      subject: "We’ve received your enquiry",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2>Thanks for your enquiry</h2>

          <p>Hi ${name},</p>

          <p>
            Thanks for getting in touch with Fuel Save Group. We’ve received your enquiry
            and will review your details shortly.
          </p>

          <p>
            We’ll come back to you with a more accurate breakdown based on your setup.
          </p>

          <div style="margin: 20px 0; padding: 15px; background: #f4f4f5; border-radius: 10px;">
            <p><strong>Your details:</strong></p>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone || "Not provided"}</p>
          </div>

          <p>We’ll be in touch shortly.</p>

          <p style="margin-top: 20px;">— Fuel Save Group</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("ROUTE ERROR:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}