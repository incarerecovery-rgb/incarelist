import Link from "next/link";
import { UserPlus, TrendingUp, Users, ShieldCheck } from "lucide-react";

const points = [
  { icon: UserPlus, label: "Create Your Professional Profile" },
  { icon: Users, label: "Get Found by Clients" },
  { icon: TrendingUp, label: "Improve Your Online Visibility" },
  { icon: ShieldCheck, label: "Build Trust With Families & Referral Partners" },
];

export default function ForProvidersTeaser() {
  return (
    <section className="container-page py-16">
      <div className="rounded-3xl bg-navy-50 px-6 py-12 sm:px-12 sm:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
              For Providers
            </p>
            <h2 className="font-display text-3xl font-semibold text-ink max-w-md">
              Are you a provider? Get found by more clients.
            </h2>
            <p className="mt-4 text-ink/70 max-w-md">
              Every provider starts with a free profile. Upgrade to Premium
              to unlock your full profile, a Verified badge, and featured
              placement in search.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/add-profile"
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
              >
                Create Your Free Profile
              </Link>
              <Link
                href="/for-providers"
                className="inline-flex items-center justify-center rounded-xl border border-navy-300 px-5 py-3 text-sm font-semibold text-navy-700 hover:bg-navy-100 transition-colors"
              >
                See Premium Benefits
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {points.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl bg-white p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-ink">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
