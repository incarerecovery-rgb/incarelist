import Link from "next/link";
import ProviderCard from "./ProviderCard";
import { Provider } from "@/lib/types";

export default function FeaturedProviders({ providers }: { providers: Provider[] }) {
  if (providers.length === 0) return null;

  return (
    <section className="bg-mist py-16">
      <div className="container-page">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-orange-600 mb-2">
              Featured
            </p>
            <h2 className="font-display text-3xl font-semibold text-ink">
              Highly rated providers
            </h2>
          </div>
          <Link
            href="/browse"
            className="hidden sm:inline text-sm font-semibold text-navy-600 hover:text-navy-700"
          >
            View all profiles →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((p) => (
            <ProviderCard key={p.slug} provider={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
