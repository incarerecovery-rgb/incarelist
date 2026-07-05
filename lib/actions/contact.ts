"use server";

import { createClient } from "@/lib/supabase/server";
import { providers as mockProviders } from "@/lib/mock-data";
import { sendContactMessage } from "@/lib/email";

export interface SubmitContactMessageResult {
  ok: boolean;
  message: string;
}

// Server-side enforcement, not just UI: only sends if the provider is
// actually Premium and has a contact_email on file — regardless of what
// the form submits. This prevents someone from posting a slug that
// shouldn't have a working contact form and getting a false "sent"
// confirmation, or worse, spamming an address that was never opted in.
export async function submitContactMessage(formData: FormData): Promise<SubmitContactMessageResult> {
  const providerSlug = String(formData.get("providerSlug") ?? "").trim();
  const senderName = String(formData.get("senderName") ?? "").trim();
  const senderEmail = String(formData.get("senderEmail") ?? "").trim();
  const senderPhone = String(formData.get("senderPhone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!providerSlug || !senderName || !senderEmail || !message) {
    return { ok: false, message: "Please fill in your name, email, and a message." };
  }

  const supabase = await createClient();

  let providerName: string | undefined;
  let contactEmail: string | undefined;
  let isPremium = false;
  let contactFormEnabled = false;

  if (!supabase) {
    // Mock-data mode — same gating logic, just against the in-memory list.
    const provider = mockProviders.find((p) => p.slug === providerSlug);
    providerName = provider?.name;
    contactEmail = provider?.contactEmail;
    isPremium = Boolean(provider?.isPremium);
    contactFormEnabled = Boolean(provider?.contactFormEnabled);
  } else {
    const { data, error } = await supabase
      .from("providers")
      .select("name, contact_email, is_premium, contact_form_enabled")
      .eq("slug", providerSlug)
      .single();

    if (error || !data) {
      return { ok: false, message: "We couldn't find that profile." };
    }

    providerName = data.name;
    contactEmail = data.contact_email ?? undefined;
    isPremium = Boolean(data.is_premium);
    contactFormEnabled = Boolean(data.contact_form_enabled);
  }

  if (!isPremium || !contactFormEnabled || !contactEmail || !providerName) {
    return {
      ok: false,
      message: "This provider hasn't set up a contact form yet. Try reaching them by phone instead.",
    };
  }

  return sendContactMessage({
    to: contactEmail,
    providerName,
    senderName,
    senderEmail,
    senderPhone: senderPhone || undefined,
    message,
  });
}
