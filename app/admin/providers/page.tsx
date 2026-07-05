import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";
import { markProviderPremium, removeProviderPremium } from "@/lib/actions/admin-provider-premium";
import { Star, StarOff } from "lucide-react";

export const metadata = { title: "Admin — Providers" };

export default async function AdminProvidersPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-ink/60">Admin tools aren't connected to a database yet.</p>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in?next=/admin/providers");
  if (!isAdminEmail(user.email)) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-ink/60">You don't have access to this page.</p>
      </div>
    );
  }

  const admin = createAdminClient();
  const { data: providers } = admin
    ? await admin
        .from("providers")
        .select("id, name, phone, is_premium, verified, premium_expires_at")
        .eq("claimed", true)
        .order("name", { ascending: true })
    : { data: [] };

  return (
    <div className="container-page py-16">
      <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">Admin</p>
      <h1 className="font-display text-3xl font-semibold text-ink mb-2">Claimed providers</h1>
      <p className="text-ink/60 mb-8">
        Mark a provider Premium once they've paid — this bundles the
        Verified badge, featured placement, and full profile display
        together.
      </p>

      {!providers || providers.length === 0 ? (
        <p className="text-ink/60">No claimed providers yet.</p>
      ) : (
        <ul className="space-y-3">
          {providers.map((p: any) => (
            <li
              key={p.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-line bg-white p-5"
            >
              <div>
                <p className="font-semibold text-ink">{p.name}</p>
                <p className="text-sm text-ink/50">
                  {p.phone}
                  {p.is_premium && p.premium_expires_at && (
                    <> · Premium until {new Date(p.premium_expires_at).toLocaleDateString()}</>
                  )}
                </p>
              </div>

              {p.is_premium ? (
                <form action={removeProviderPremium.bind(null, p.id)}>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-semibold text-ink/70 hover:bg-mist"
                  >
                    <StarOff className="h-3.5 w-3.5" aria-hidden="true" />
                    Remove Premium
                  </button>
                </form>
              ) : (
                <form action={markProviderPremium.bind(null, p.id)}>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-600"
                  >
                    <Star className="h-3.5 w-3.5" aria-hidden="true" />
                    Mark as Premium
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
