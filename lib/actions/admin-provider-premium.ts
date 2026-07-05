"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";

async function requireAdmin() {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    throw new Error("Not authorized.");
  }
}

// Premium bundles verified + featured together, kept intentionally simple:
// once someone's paid, mark them Premium and they get everything at once.
export async function markProviderPremium(providerId: string) {
  await requireAdmin();
  const admin = createAdminClient();
  if (!admin) throw new Error("Admin client is not configured.");

  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  const { error } = await admin
    .from("providers")
    .update({
      is_premium: true,
      verified: true,
      featured: true,
      contact_form_enabled: true,
      premium_tier: "premium",
      premium_expires_at: oneYearFromNow.toISOString(),
    })
    .eq("id", providerId);

  if (error) throw new Error("Failed to mark provider as Premium.");

  revalidatePath("/admin/providers");
  revalidatePath("/", "layout");
}

export async function removeProviderPremium(providerId: string) {
  await requireAdmin();
  const admin = createAdminClient();
  if (!admin) throw new Error("Admin client is not configured.");

  const { error } = await admin
    .from("providers")
    .update({
      is_premium: false,
      verified: false,
      featured: false,
      premium_tier: null,
      premium_expires_at: null,
    })
    .eq("id", providerId);

  if (error) throw new Error("Failed to remove Premium status.");

  revalidatePath("/admin/providers");
  revalidatePath("/", "layout");
}
