import { ShieldCheck, ListChecks, MapPinned, RefreshCw, Phone, LayoutGrid } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Verified providers",
    body: "Claimed profiles are reviewed before they display a Verified Provider badge.",
  },
  {
    icon: LayoutGrid,
    title: "One directory, every category",
    body: "From therapists to hospice care — every category covered in a single, simple search.",
  },
  {
    icon: ListChecks,
    title: "Easy comparison",
    body: "Filter by category, state, and insurance to compare options side by side.",
  },
  {
    icon: RefreshCw,
    title: "Provider-managed listings",
    body: "Providers can update their own profile anytime once claimed.",
  },
  {
    icon: Phone,
    title: "Direct contact",
    body: "Reach providers directly by phone, website, or contact form — no middleman.",
  },
  {
    icon: MapPinned,
    title: "Nationwide coverage",
    body: "Search by state across the entire United States, with more detail added every week.",
  },
];

export default function WhyInCareList() {
  return (
    <section className="bg-ink py-16">
      <div className="container-page">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-teal-300 mb-2">
          Why InCareList
        </p>
        <h2 className="font-display text-3xl font-semibold text-white mb-10 max-w-lg">
          Built to help you find care you can trust
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-teal-400">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-white mb-1">{title}</h3>
                <p className="text-sm text-white/60">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
