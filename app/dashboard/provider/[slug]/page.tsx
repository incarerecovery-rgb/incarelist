import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditProviderForm from "@/components/EditProviderForm";

export const metadata = {
  title: "Edit Your Profile",
};

export default async function EditProviderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-ink/60">
          Not connected to a database yet — add Supabase keys to .env.local
          to enable this.
        </p>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/sign-in?next=${encodeURIComponent(`/dashboard/provider/${slug}`)}`);

  const { data: provider, error } = await supabase
    .from("providers")
    .select(
      "id, slug, name, description, phone, website, address, zip, image_url, logo_url, hours_of_operation, contact_email, facebook_url, instagram_url, linkedin_url, services_offered, insurance_accepted, owner_id, is_premium, categories(name)"
    )
    .eq("slug", slug)
    .single();

  if (error || !provider) notFound();

  if (provider.owner_id !== user.id) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-ink/60">You don't have access to edit this profile.</p>
      </div>
    );
  }

  return (
    <div className="container-page py-16">
      <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
        Edit profile
      </p>
      <h1 className="font-display text-3xl font-semibold text-ink mb-8">
        {provider.name}
      </h1>

      <EditProviderForm
        providerId={provider.id}
        providerSlug={provider.slug}
        isPremium={Boolean(provider.is_premium)}
        category={(provider.categories as any)?.name ?? ""}
        initial={{
          description: provider.description ?? "",
          phone: provider.phone ?? "",
          website: provider.website ?? "",
          address: provider.address ?? "",
          zip: provider.zip ?? "",
          imageUrl: provider.image_url ?? "",
          logoUrl: provider.logo_url ?? "",
          hoursOfOperation: provider.hours_of_operation ?? "",
          contactEmail: provider.contact_email ?? "",
          facebookUrl: provider.facebook_url ?? "",
          instagramUrl: provider.instagram_url ?? "",
          linkedinUrl: provider.linkedin_url ?? "",
          servicesOffered: provider.services_offered ?? [],
          insuranceTypes: provider.insurance_accepted ?? [],
        }}
      />
    </div>
  );
}
