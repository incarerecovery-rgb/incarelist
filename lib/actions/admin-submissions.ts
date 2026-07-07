"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slugify";

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

export async function approveSubmission(submissionId: string) {
  await requireAdmin();
  const admin = createAdminClient();
  if (!admin) throw new Error("Admin client is not configured.");

  const { data: submission, error: fetchError } = await admin
    .from("provider_submissions")
    .select("*")
    .eq("id", submissionId)
    .single();

  if (fetchError || !submission) throw new Error("Submission not found.");

  const [{ data: state }, { data: category }] = await Promise.all([
    admin.from("states").select("id").eq("slug", submission.state_slug).single(),
    admin.from("categories").select("id").eq("slug", submission.category_slug).single(),
  ]);

  if (!state) throw new Error("Unknown state — check states table is seeded.");
  if (!category) throw new Error("Unknown category — check categories table is seeded.");

  const providerSlug = slugify(submission.provider_name);

  const { data: provider, error: providerInsertError } = await admin
    .from("providers")
    .insert({
      owner_id: submission.user_id,
      name: submission.provider_name,
      slug: providerSlug,
      state_id: state.id,
      category_id: category.id,
      address: submission.address,
      zip: submission.zip,
      phone: submission.phone,
      website: submission.website,
      description: submission.description,
      insurance_accepted: submission.insurance_types ?? [],
      verified: false,
      featured: false,
      claimed: true, // the submitter owns it immediately — they added it themselves
      source: "self_submitted",
    })
    .select("id")
    .single();

  if (providerInsertError || !provider) throw new Error("Failed to create provider.");

  await admin
    .from("provider_submissions")
    .update({ status: "approved", created_provider_id: provider.id })
    .eq("id", submissionId);

  revalidatePath("/admin/submissions");
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
}

export async function rejectSubmission(submissionId: string) {
  await requireAdmin();
  const admin = createAdminClient();
  if (!admin) throw new Error("Admin client is not configured.");

  const { error } = await admin
    .from("provider_submissions")
    .update({ status: "rejected" })
    .eq("id", submissionId);

  if (error) throw new Error("Failed to update submission.");

  revalidatePath("/admin/submissions");
}
