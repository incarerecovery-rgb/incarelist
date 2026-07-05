// Sends a quick email to the admin(s) when something needs review — a new
// claim or a new listing submission. Uses Resend (resend.com) since it's
// the simplest transactional email API to wire into a Next.js app.
//
// If RESEND_API_KEY isn't set yet, this silently does nothing rather than
// breaking the actual claim/submission flow — the admin queues in the app
// are still the source of truth either way, this is just a heads-up.

export async function sendAdminNotification(subject: string, body: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  if (!apiKey || adminEmails.length === 0) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Resend lets you send from onboarding@resend.dev with no setup,
        // for testing. Once you verify your own domain in Resend, switch
        // this to something like notifications@incarelist.com.
        from: process.env.NOTIFICATIONS_FROM_EMAIL || "InCareList <onboarding@resend.dev>",
        to: adminEmails,
        subject,
        text: body,
      }),
    });
  } catch {
    // Never let a failed notification email block the actual submission.
  }
}

export interface ContactMessageResult {
  ok: boolean;
  message: string;
}

// Delivers a "Send a message" submission from a provider's profile page
// directly to that provider's inbox, with reply-to set to the sender —
// so the provider can just hit reply, no forwarding needed on our end.
// Only called for Premium providers with a contact_email on file
// (enforced server-side in lib/actions/contact.ts, not just here).
export async function sendContactMessage({
  to,
  providerName,
  senderName,
  senderEmail,
  senderPhone,
  message,
}: {
  to: string;
  providerName: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  message: string;
}): Promise<ContactMessageResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      message:
        "Message delivery isn't connected yet — add RESEND_API_KEY to .env.local to enable this.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.NOTIFICATIONS_FROM_EMAIL || "InCareList <onboarding@resend.dev>",
        to: [to],
        reply_to: senderEmail,
        subject: `New message from ${senderName} via InCareList`,
        text: [
          `You have a new message from a potential client via your InCareList profile (${providerName}).`,
          "",
          `From: ${senderName} <${senderEmail}>`,
          senderPhone ? `Phone: ${senderPhone}` : null,
          "",
          message,
          "",
          "---",
          "Reply directly to this email to respond — it goes straight to the sender.",
        ]
          .filter((line) => line !== null)
          .join("\n"),
      }),
    });

    if (!res.ok) {
      return { ok: false, message: "Something went wrong sending your message. Please try again." };
    }

    return { ok: true, message: "Message sent — the provider will reply directly to your email." };
  } catch {
    return { ok: false, message: "Something went wrong sending your message. Please try again." };
  }
}
