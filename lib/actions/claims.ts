"use server";

import { createClient } from "@/lib/supabase/server";
import { sendAdminNotification } from "@/lib/email";

export interface SubmitClaimResult {
  ok: boolean;
  message: string;
}

export async function submitClaim(formData: FormData): Promise<SubmitClaimResult> {
  const providerSlug = String(formData.get("providerSlug") ?? "");
  const fullName = String(formData.get("fullName") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const workEmail = String(formData.get("workEmail") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const planId = String(formData.get("planId") ?? "").trim();

  if (!fullName || !role || !workEmail || !phone) {
    return { ok: false, message: "Please fill in all required fields." };
  }

  const supabase = await createClient();
  if (!supabase) {
    return {
      ok: false,
      message:
        "Claims aren't connected to a database yet — add Supabase keys to .env.local to enable submissions.",
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, message: "Please sign in before submitting a claim." };
  }

  // Phase 1: manual review only, no automated domain matching.
  const { data: provider, error: providerError } = await supabase
    .from("providers")
    .select("id, name")
    .eq("slug", providerSlug)
    .single();

  if (providerError || !provider) {
    return { ok: false, message: "We couldn't find that profile. Please try again." };
  }

  const verificationNotes = [
    `Name: ${fullName}`,
    `Role: ${role}`,
    `Work email: ${workEmail}`,
    `Phone: ${phone}`,
    planId ? `Requested plan: ${planId}` : null,
    notes ? `Notes: ${notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const { error: insertError } = await supabase.from("provider_claims").insert({
    provider_id: provider.id,
    user_id: user.id,
    status: "pending",
    verification_notes: verificationNotes,
  });

  if (insertError) {
    return { ok: false, message: "Something went wrong submitting your claim. Please try again." };
  }

  await sendAdminNotification(
    `New claim: ${provider.name}`,
    `${fullName} (${role}) submitted a claim for "${provider.name}".\n\nContact: ${workEmail} / ${phone}${planId ? `\nRequested plan: ${planId}` : ""}\n\nReview it at /admin/claims`
  );

  return {
    ok: true,
    message: "Claim submitted — our team reviews claims by hand and typically responds within 2 business days.",
  };
}
