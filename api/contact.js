import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false, error: "Method not allowed. Use POST." });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // keep as is
      }
    }

    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Please fill in all fields (name, email, message)." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, error: "Please provide a valid email address." });
    }

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const user = process.env.SMTP_USER || process.env.GMAIL_USER || "sofyan.ait.rehail@gmail.com";
    const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
    const recipient = process.env.CONTACT_RECIPIENT || user;

    if (!user || !pass) {
      console.error("Mail server credentials are not configured in environment variables.");
      return res.status(500).json({
        success: false,
        error: "Unable to send message right now. Please try again later.",
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"${name}" <${user}>`,
      replyTo: email,
      to: recipient,
      subject: `Portfolio Message from ${name}`,
      text: `New message from portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;">New Portfolio Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 80px;">From:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Reply-To:</td>
              <td style="padding: 8px 0; color: #16a34a; font-size: 14px; font-weight: 500;"><a href="mailto:${email}" style="color: #16a34a; text-decoration: none;">${email}</a></td>
            </tr>
          </table>
          <div style="background: #f8fafc; border-radius: 8px; padding: 16px; border: 1px solid #f1f5f9; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px;">Sent from SfAtRhl Portfolio</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to send message. Please try again later.",
    });
  }
}
