import Link from "next/link";
import { ShieldCheck, Star, Globe, TrendingUp, Image as ImageIcon, Settings } from "lucide-react";
import { INDIVIDUAL_PLAN, FACILITY_PLAN } from "@/lib/pricing";
import { PROVIDER_FAQS } from "@/lib/faq";
import FaqSection from "@/components/FaqSection";
import PricingComparisonTable, { ComparisonRow } from "@/components/PricingComparisonTable";
import SearchBar from "@/components/SearchBar";

export const metadata = {
  title: "For Providers — Get Found by More Clients",
  description:
    "Create your free professional profile on InCareList, or upgrade to Premium to unlock your full profile, a Verified badge, and featured placement in search.",
};

const ROWS: ComparisonRow[] = [
  { feature: "Business or provider name shown", free: true, premium: true },
  { feature: "Address & phone number shown", free: true, premium: true },
  { feature: "Category shown", free: true, premium: true },
  { feature: "Claim and manage your profile", free: true, premium: true },
  { feature: "Appears in search & category browsing", free: true, premium: true },
  { feature: "Website link", free: false, premium: true },
  { feature: "Logo", free: false, premium: true },
  { feature: "Photos & portfolio gallery", free: false, premium: true },
  { feature: "Full description", free: false, premium: true },
  { feature: "Services offered", free: false, premium: true },
  { feature: "Insurance accepted shown on profile", free: false, premium: true },
  { feature: "Hours of operation", free: false, premium: true },
  { feature: "Contact form", free: false, premium: true },
  { feature: "Social media links", free: false, premium: true },
  { feature: "Featured placement in search results", free: false, premium: true },
  { feature: "SEO-optimized profile", free: false, premium: true },
  { feature: "Verified Provider badge", free: false, premium: true },
  { feature: "Google Maps integration", free: false, premium: true },
  { feature: "Additional contact information", free: false, premium: true },
  { feature: "Unlimited profile edits", free: false, premium: true },
];

export default function ForProvidersPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
          For Providers
        </p>
        <h1 className="font-display text-4xl font-semibold text-ink leading-tight">
          The free directory for therapists and care facilities
        </h1>
        <p className="mt-4 text-ink/70">
          InCareList is completely free to join. Most California{" "}
          <Link href="/browse?category=assisted-living-facilities&state=california" className="underline decoration-navy-300 underline-offset-2 hover:text-navy-700">
            assisted living facilities
          </Link>
          ,{" "}
          <Link href="/browse?category=detox-centers&state=california" className="underline decoration-navy-300 underline-offset-2 hover:text-navy-700">
            detox centers
          </Link>
          ,{" "}
          <Link href="/browse?category=substance-use-treatment-centers&state=california" className="underline decoration-navy-300 underline-offset-2 hover:text-navy-700">
            substance use treatment centers
          </Link>
          ,{" "}
          <Link href="/browse?category=therapists&state=california" className="underline decoration-navy-300 underline-offset-2 hover:text-navy-700">
            therapists
          </Link>
          , and more already have a basic profile built from public
          licensing records. Search below to see if yours is already
          there — claim it free in minutes. Not listed yet? Add your
          profile yourself, also free.
        </p>
      </div>

      {/* Premium benefits strip — what upgrading actually gets you */}
      <div className="mt-8 flex flex-wrap gap-3 max-w-3xl">
        <div className="flex items-center gap-2 rounded-full bg-teal-50 border border-teal-200 px-4 py-2 text-sm font-medium text-teal-800">
          <Globe className="h-4 w-4 text-teal-600" aria-hidden="true" />
          Add your website
        </div>
        <div className="flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200 px-4 py-2 text-sm font-medium text-orange-800">
          <TrendingUp className="h-4 w-4 text-orange-600" aria-hidden="true" />
          Get boosted in Google
        </div>
        <div className="flex items-center gap-2 rounded-full bg-navy-50 border border-navy-200 px-4 py-2 text-sm font-medium text-navy-800">
          <ImageIcon className="h-4 w-4 text-navy-600" aria-hidden="true" />
          Add photos
        </div>
        <div className="flex items-center gap-2 rounded-full bg-teal-50 border border-teal-200 px-4 py-2 text-sm font-medium text-teal-800">
          <Settings className="h-4 w-4 text-teal-600" aria-hidden="true" />
          Manage your listing anytime
        </div>
      </div>

      {/* Free action: find or add your listing right now */}
      <div className="mt-10 max-w-3xl">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-3">
          Find your listing
        </p>
        <div className="rounded-2xl bg-navy-50/60 p-3 shadow-lg shadow-navy-900/5 ring-1 ring-navy-100">
          <SearchBar />
        </div>
      </div>

      <div className="mt-10 max-w-2xl">
        <p className="font-display text-xl font-semibold text-ink">
          Already listed or just added yours? Go Premium to stand out.
        </p>
        <p className="mt-3 text-ink/70">
          A free listing shows your name, address, and category — enough
          to be found. A Premium profile is built to actually rank: your
          own page with your real name, services, and photos, optimized
          so it shows up when families search on Google for care in your
          area. Add your website link, upload photos, and get featured
          placement in InCareList's own search results too.
        </p>
      </div>

      {/* Two pricing cards side by side */}
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Individual practitioners */}
        <div className="relative overflow-hidden flex flex-col justify-between gap-6 rounded-2xl border border-navy-200 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-8">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-orange-400 to-orange-500" />
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-orange-300 mb-2">
              Individual Providers
            </p>
            <p className="text-sm text-white/50 mb-3">{INDIVIDUAL_PLAN.appliesTo}</p>
            <p className="font-display text-3xl font-semibold text-white">
              ${INDIVIDUAL_PLAN.priceAnnual}
              <span className="text-base font-normal text-white/60">/year</span>
            </p>
            <p className="mt-1 text-sm text-white/60 max-w-sm">{INDIVIDUAL_PLAN.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/claim"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Add or claim free profile
            </Link>
            <a
              href={INDIVIDUAL_PLAN.stripePaymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
            >
              <Star className="h-4 w-4" aria-hidden="true" />
              Get Premium — ${INDIVIDUAL_PLAN.priceAnnual}/year
            </a>
          </div>
        </div>

        {/* Facilities & institutions */}
        <div className="relative overflow-hidden flex flex-col justify-between gap-6 rounded-2xl border border-navy-200 bg-gradient-to-br from-teal-900 via-navy-900 to-navy-900 p-8">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-teal-300 to-teal-400" />
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-teal-300 mb-2">
              Facilities & Institutions
            </p>
            <p className="text-sm text-white/50 mb-3">{FACILITY_PLAN.appliesTo}</p>
            <p className="font-display text-3xl font-semibold text-white">
              ${FACILITY_PLAN.priceAnnual}
              <span className="text-base font-normal text-white/60">/year</span>
            </p>
            <p className="mt-1 text-sm text-white/60 max-w-sm">{FACILITY_PLAN.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/claim"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Add or claim free profile
            </Link>
            <a
              href={FACILITY_PLAN.stripePaymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
            >
              <Star className="h-4 w-4" aria-hidden="true" />
              Get Premium — ${FACILITY_PLAN.priceAnnual}/year
            </a>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink/50 max-w-2xl">
        Checkout is secure and handled by Stripe. After payment, our team
        activates your Premium features — typically within 1 business day.
        If you haven't claimed your free profile yet, do that first (or
        right after paying) so we know which listing to upgrade.
      </p>

      <h2 className="mt-14 font-display text-2xl font-semibold text-ink">Free vs. Premium</h2>
      <p className="mt-2 text-ink/60 max-w-2xl">
        The feature set is identical either way — Premium unlocks the same
        things whether you're an individual practitioner or a facility.
        Only the price is different.
      </p>
      <div className="mt-4 max-w-3xl">
        <PricingComparisonTable rows={ROWS} premiumLabel="Premium" />
      </div>

      <div className="mt-14">
        <FaqSection items={PROVIDER_FAQS} />
      </div>
    </div>
  );
}
