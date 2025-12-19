"use server"
import nodemailer from "nodemailer"
import { headers } from "next/headers"
import { promises as dns } from "dns"

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

const sendEmail = async (name: string, email: string, subject: string, message: string) => {
  try {
    const transporter = createTransporter()

    // Email content
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: "hi@notedwin.dev",
      subject: `Portfolio Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          <div style="margin-top: 20px; padding: 10px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #6c757d;">
            <p>This email was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

const forwardConfirmationEmail = async (
  name: string,
  email: string,
  { subject, message }: { subject: string; message: string }
) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Edwin Ng" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank you for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Thank You for Reaching Out!
          </h2>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">You sent me:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(
              /\n/g,
              "<br>"
            )}</p>
          </div>
          <br/>
          <p>Hi ${name},</p>
          <p>Thank you for contacting me through my portfolio website. I appreciate you taking the time to reach out.</p>
          <p>I have received your message and will get back to you as soon as possible. In the meantime, feel free to explore my projects and skills on my website.</p>
          <p>Best regards,<br/>Edwin Ng</p>
          <div style="margin-top: 20px; padding: 10px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #6c757d;">
            <p>This is an automated confirmation email for your contact form submission on <a href="https://notedwin.dev">my portfolio website</a>.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

async function verifyTurnstileToken(token: string, remoteip?: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not set");
    return { success: false, message: "Server configuration error" };
  }

  const formData = new FormData();
  formData.append("secret", secretKey);
  formData.append("response", token);
  if (remoteip) {
    formData.append("remoteip", remoteip);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const result = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        body: formData,
        method: "POST",
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    const outcome = await result.json();
    if (outcome.success) {
      return { success: true };
    } else {
      console.error("Turnstile verification failed:", outcome["error-codes"]);
      const errorCode = outcome["error-codes"]?.[0];
      let message = "Invalid captcha. Please try again.";
      if (errorCode === "timeout-or-duplicate") {
        message =
          "Captcha expired or already used. Please refresh and try again.";
      }
      return { success: false, message };
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return {
        success: false,
        message: "Verification timed out. Please try again.",
      };
    }
    console.error("Turnstile verification error:", error);
    return { success: false, message: "Verification service unavailable" };
  }
}

const SPAM_KEYWORDS = [
  "seo",
  "marketing",
  "promotion",
  "increase traffic",
  "buy now",
  "crypto",
  "investment",
  "casino",
  "lottery",
  "winner",
  "congratulations",
  "viagra",
  "pills",
  "weight loss",
  "earn money",
  "work from home",
  "passive income",
  "bitcoin",
  "ethereum",
  "trading",
  "forex",
  "wealth",
  "rich",
  "millionaire",
];

function isSpam(subject: string, message: string): boolean {
  const content = (subject + " " + message).toLowerCase();
  // Check for keywords
  if (SPAM_KEYWORDS.some((keyword) => content.includes(keyword))) {
    return true;
  }
  // Check for excessive links
  const linkCount = (content.match(/https?:\/\//g) || []).length;
  if (linkCount > 2) {
    return true;
  }
  return false;
}

async function hasValidMXRecord(email: string): Promise<boolean> {
  const domain = email.split("@")[1];
  if (!domain) return false;
  try {
    const mx = await dns.resolveMx(domain);
    return mx && mx.length > 0;
  } catch (error) {
    return false;
  }
}

export async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const turnstileToken = formData.get("cf-turnstile-response") as string;
  const honeypot = formData.get("website_url") as string;

  // Honeypot check - if filled, it's likely a bot
  if (honeypot) {
    console.warn("Honeypot triggered by submission from:", email);
    return {
      success: true, // Return success to the bot to avoid retries
      message: "Thank you for your message! I'll get back to you soon.",
    };
  }

  // Get client IP
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    undefined;

  // Basic validation
  if (!name || !email || !subject || !message || !turnstileToken) {
    return {
      success: false,
      message: "Please fill in all fields and complete the captcha.",
    };
  }

  // Spam filter
  if (isSpam(subject, message)) {
    console.warn("Spam filter triggered by submission from:", email);
    return {
      success: false,
      message:
        "Your message was flagged as potential spam. Please revise and try again.",
    };
  }

  // Verify Turnstile token
  const verification = await verifyTurnstileToken(turnstileToken, ip);
  if (!verification.success) {
    return {
      success: false,
      message: verification.message || "Captcha verification failed.",
    };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  // MX Record check
  const hasMX = await hasValidMXRecord(email);
  if (!hasMX) {
    return {
      success: false,
      message: "The email domain provided does not seem to be valid.",
    };
  }

  try {
    // Send email
    const emailResult = await sendEmail(name, email, subject, message);

    if (!emailResult.success) {
      console.error("Failed to send email:", emailResult.error);
      return {
        success: false,
        message: "Failed to send email. Please try again later.",
      };
    }

    // Forward confirmation email to the user
    await forwardConfirmationEmail(name, email, { subject, message });

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      message:
        "An error occurred while sending your message. Please try again later.",
    };
  }
}
