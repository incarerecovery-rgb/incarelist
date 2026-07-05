"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { normalizeUrl } from "@/lib/normalize-url";

export interface UpdateProviderResult {
  ok: boolean;
  message: string;
}

export async function updateProvider(formData: FormData): Promise<UpdateProviderResult> {
  const supabase = await createClient();
  if (!supabase) {
    return { ok: false, message: "Not connected to a database yet — add Supabase keys to .env.local." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, message: "Please sign in." };
  }

  const providerId = String(formData.get("providerId") ?? "");
  const slug = String(formData.get("providerSlug") ?? "");
  const description = String(formData.get("description") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const website = normalizeUrl(String(formData.get("website") ?? "").trim());
  const address = String(formData.get("address") ?? "").trim();
  const zip = String(formData.get("zip") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const logoUrl = String(formData.get("logoUrl") ?? "").trim();
  const hoursOfOperation = String(formData.get("hoursOfOperation") ?? "").trim();
  const contactEmail = String(formData.get("contactEmail") ?? "").trim();
  const facebookUrl = normalizeUrl(String(formData.get("facebookUrl") ?? "").trim());
  const instagramUrl = normalizeUrl(String(formData.get("instagramUrl") ?? "").trim());
  const linkedinUrl = normalizeUrl(String(formData.get("linkedinUrl") ?? "").trim());
  const servicesOffered = String(formData.get("servicesOffered") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const insuranceTypes = formData.getAll("insuranceTypes").map(String);

  if (!providerId) {
    return { ok: false, message: "Missing profile reference." };
  }

  // Server-side enforcement (not just UI): free profiles can't set
  // website/description/photo, regardless of what the form submits.
  const { data: existing } = await supabase
    .from("providers")
    .select("is_premium")
    .eq("id", providerId)
    .single();

  const isPremium = Boolean(existing?.is_premium);

  // RLS ("Owners can update their claimed provider") enforces that this
  // only succeeds if providers.owner_id = the signed-in user's id.
  const updatePayload: Record<string, unknown> = {
    phone,
    address,
    zip,
    updated_at: new Date().toISOString(),
  };
  if (isPremium) {
    updatePayload.description = description;
    updatePayload.website = website || null;
    updatePayload.image_url = imageUrl || null;
    updatePayload.logo_url = logoUrl || null;
    updatePayload.hours_of_operation = hoursOfOperation || null;
    updatePayload.contact_email = contactEmail || null;
    updatePayload.facebook_url = facebookUrl || null;
    updatePayload.instagram_url = instagramUrl || null;
    updatePayload.linkedin_url = linkedinUrl || null;
    updatePayload.services_offered = servicesOffered;
    updatePayload.insurance_accepted = insuranceTypes;
    updatePayload.contact_form_enabled = true;
  }

  const { error: updateError } = await supabase
    .from("providers")
    .update(updatePayload)
    .eq("id", providerId);

  if (updateError) {
    return { ok: false, message: "Couldn't save changes — you may not own this profile." };
  }

  revalidatePath(`/dashboard/provider/${slug}`);
  revalidatePath("/", "layout"); // keep it simple in Phase 1 — bust the cache broadly

  return { ok: true, message: "Profile updated." };
}
