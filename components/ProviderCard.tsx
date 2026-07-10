import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, MapPin, Phone } from "lucide-react";
import { Provider } from "@/lib/types";

export default function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Link
      href={`/${provider.stateSlug}/${provider.categorySlug}/${provider.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all hover:shadow-lg hover:border-navy-300"
    >
      {provider.imageUrl && (
        <div className="relative h-40 w-full overflow-hidden bg-mist">
          <Image
            src={provider.imageUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          {provider.featured && (
            <span className="absolute top-3 left-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-ink/70">
            {provider.category}
          </span>
          {!provider.imageUrl && provider.featured && (
            <span className="rounded-full bg-orange-500 px-2.5 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          )}
        </div>

        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-ink leading-snug">
            {provider.name}
          </h3>
          {provider.verified && (
            <BadgeCheck
              className="h-5 w-5 shrink-0 text-teal-600"
              aria-label="Verified provider"
            />
          )}
        </div>

        <p className="flex items-center gap-1 text-sm text-ink/60">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {provider.address}, {provider.state}
        </p>

        {provider.phone && (
          <p className="flex items-center gap-1 text-sm text-ink/60">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {provider.phone}
          </p>
        )}

        {provider.isPremium ? (
          <>
            <p className="text-sm text-ink/70 line-clamp-2">{provider.description}</p>
            {provider.servicesOffered.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {provider.servicesOffered.slice(0, 2).map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="mt-1 text-xs text-ink/40">
            Full profile available once claimed &amp; upgraded
          </p>
        )}
      </div>
    </Link>
  );
}
