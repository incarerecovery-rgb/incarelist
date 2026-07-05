import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Clock, CheckCircle2, XCircle, Star, Sparkles } from "lucide-react";
import { getPlanForCategory } from "@/lib/pricing";

export const metadata = {
  title: "Dashboard",
};

const statusMeta = {
  pending: { icon: Clock, label: "Under review", className: "text-navy-700 bg-navy-100" },
  approved: { icon: CheckCircle2, label: "Approved", className: "text-green-700 bg-green-100" },
  rejected: { icon: XCircle, label: "Not approved", className: "text-red-700 bg-red-100" },
};

export default async function DashboardPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-ink/60">
          Dashboard isn't connected to a database yet — add Supabase keys to
          .env.local to enable this.
        </p>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in?next=/dashboard");

  // Pull is_premium and category alongside each claim so we know exactly
  // which claimed-but-not-upgraded profiles to nudge, and which price
  // applies to each (individual practitioners vs. facilities).
  const { data: claims } = await supabase
    .from("provider_claims")
    .select("id, status, created_at, providers(name, slug, is_premium, categories(name))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const newlyApprovedFreeClaims = (claims ?? []).filter(
    (c: any) => c.status === "approved" && c.providers && !c.providers.is_premium
  );

  return (
    <div className="container-page py-16">
      <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
        Dashboard
      </p>
      <h1 className="font-display text-3xl font-semibold text-ink mb-8">
        Your profiles
      </h1>

      {/* Upsell banner — shown right away for any approved, still-free
          profile, instead of relying on the owner to go find /for-providers
          on their own. One banner per profile, in case someone owns more
          than one. */}
      {newlyApprovedFreeClaims.map((claim: any) => {
        const categoryName = claim.providers.categories?.name ?? "";
        const plan = getPlanForCategory(categoryName);
        return (
          <div
            key={`upsell-${claim.id}`}
            className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-ink p-6"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-white">
                  {claim.providers.name} is live!
                </p>
                <p className="mt-1 text-sm text-white/60 max-w-md">
                  Want to unlock your full profile — photos, your website,
                  and featured placement? Upgrade to Premium for $
                  {plan.priceAnnual}/year.
                </p>
              </div>
            </div>
            <a
              href={plan.stripePaymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white"
            >
              <Star className="h-4 w-4" aria-hidden="true" />
              Upgrade to Premium
            </a>
          </div>
        );
      })}

      {!claims || claims.length === 0 ? (
        <div className="rounded-2xl border border-line bg-mist p-8 text-center">
          <p className="text-ink/70 mb-4">
            You haven't claimed a profile yet.
          </p>
          <Link
            href="/browse"
            className="inline-flex rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Find your listing
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {claims.map((claim: any) => {
            const meta = statusMeta[claim.status as keyof typeof statusMeta] ?? statusMeta.pending;
            const Icon = meta.icon;
            return (
              <li
                key={claim.id}
                className="flex items-center justify-between rounded-2xl border border-line bg-white p-5"
              >
                <div>
                  <p className="font-semibold text-ink">
                    {claim.providers?.name ?? "Provider"}
                  </p>
                  <p className="text-sm text-ink/50">
                    Submitted {new Date(claim.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${meta.className}`}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {meta.label}
                  </span>
                  {claim.status === "approved" && claim.providers?.slug && (
                    <Link
                      href={`/dashboard/provider/${claim.providers.slug}`}
                      className="rounded-lg border border-line px-3 py-1.5 text-sm font-semibold text-ink/70 hover:bg-mist"
                    >
                      Edit profile
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
