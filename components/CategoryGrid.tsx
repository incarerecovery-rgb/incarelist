import Link from "next/link";
import {
  MessageCircle,
  Brain,
  Pill,
  HeartPulse,
  Waves,
  Droplet,
  Home,
  Clock,
  Building2,
  Building,
  Users,
  Puzzle,
  Sun,
  Cross,
  Heart,
  Truck,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/lib/types";

const ICONS: Record<string, LucideIcon> = {
  "therapists": MessageCircle,
  "psychologists": Brain,
  "psychiatrists": Pill,
  "mental-health-clinics": HeartPulse,
  "substance-use-treatment-centers": Waves,
  "detox-centers": Droplet,
  "sober-living-homes": Home,
  "intensive-outpatient-programs": Clock,
  "partial-hospitalization-programs": Building2,
  "residential-treatment-centers": Building,
  "assisted-living-facilities": Users,
  "memory-care-communities": Puzzle,
  "independent-senior-living": Sun,
  "skilled-nursing-facilities": Cross,
  "hospice-providers": Heart,
  "home-health-agencies": Truck,
  "case-management-services": ClipboardList,
};

export default function CategoryGrid() {
  return (
    <section className="container-page py-16">
      <div className="mb-8">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
          The full continuum of care
        </p>
        <h2 className="font-display text-3xl font-semibold text-ink max-w-xl">
          Browse all categories
        </h2>
        <p className="mt-2 text-ink/60 max-w-lg">
          From a first therapy session to long-term care at home — one
          directory covering behavioral health and senior care alike.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => {
          const Icon = ICONS[c.slug] ?? Building;
          return (
            <Link
              key={c.slug}
              href={`/browse?category=${c.slug}`}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-line bg-white p-5 transition-all hover:border-teal-300 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-100">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-ink leading-snug">{c.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
