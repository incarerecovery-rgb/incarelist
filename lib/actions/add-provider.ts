"use server";

import { createClient } from "@/lib/supabase/server";
import { sendAdminNotification } from "@/lib/email";
import { normalizeUrl } from "@/lib/normalize-url";

export interface SubmitProviderResult {
  ok: boolean;
  message: string;
}

export async function submitProvider(formData: FormData): Promise<SubmitProviderResult> {
  const supabase = await createClient();
  if (!supabase) {
    return {
      ok: false,
      message: "Not connected to a database yet — add Supabase keys to .env.local to enable submissions.",
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, message: "Please sign in before creating a profile." };
  }

  const providerName = String(formData.get("providerName") ?? "").trim();
  const categorySlug = String(formData.get("categorySlug") ?? "").trim();
  const stateSlug = String(formData.get("stateSlug") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const zip = String(formData.get("zip") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const website = normalizeUrl(String(formData.get("website") ?? "").trim());
  const description = String(formData.get("description") ?? "").trim();
  const insuranceTypes = formData.getAll("insuranceTypes").map(String);

  const submitterName = String(formData.get("submitterName") ?? "").trim();
  const submitterRole = String(formData.get("submitterRole") ?? "").trim();
  const submitterEmail = String(formData.get("submitterEmail") ?? "").trim();
  const submitterPhone = String(formData.get("submitterPhone") ?? "").trim();

  if (!providerName || !categorySlug || !stateSlug || !address || !zip || !phone) {
    return { ok: false, message: "Please fill in the provider's name, category, state, address, ZIP, and phone." };
  }
  if (!submitterName || !submitterRole || !submitterEmail || !submitterPhone) {
    return { ok: false, message: "Please fill in your name, role, email, and phone so we can verify you." };
  }

  const { error } = await supabase.from("provider_submissions").insert({
    user_id: user.id,
    status: "pending",
    provider_name: providerName,
    category_slug: categorySlug,
    state_slug: stateSlug,
    address,
    zip,
    phone,
    website: website || null,
    description: description || null,
    insurance_types: insuranceTypes,
    submitter_name: submitterName,
    submitter_role: submitterRole,
    submitter_email: submitterEmail,
    submitter_phone: submitterPhone,
  });

  if (error) {
    return { ok: false, message: "Something went wrong submitting this. Please try again." };
  }

  await sendAdminNotification(
    `New profile submission: ${providerName}`,
    `${submitterName} (${submitterRole}) submitted a new profile: "${providerName}" (${categorySlug}, ${stateSlug}).\n\nContact: ${submitterEmail} / ${submitterPhone}\n\nReview it at /admin/submissions`
  );

  return {
    ok: true,
    message: "Thanks — we review new profiles by hand, typically within 2 business days. Once approved, it'll go live and you'll own the profile automatically.",
  };
}
