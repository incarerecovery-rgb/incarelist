import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin, Phone, Globe, ShieldCheck, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { getProviderByPath, getAllProviderPaths } from "@/lib/data/providers";
import ProviderMap from "@/components/ProviderMap";
import type { Metadata } from "next";

interface Params {
  state: string;
  category: string;
  provider: string;
}

export async function generateStaticParams() {
  return getAllProviderPaths();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { state, category, provider: providerSlug } = await params;
  const provider = await getProviderByPath(state, category, providerSlug);
  if (!provider) return {};

  const title = `${provider.name} — ${provider.category} in ${provider.state}`;
  const description = `${provider.name}, a ${provider.category.toLowerCase()} provider in ${provider.state}. View contact info, services, and insurance accepted.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${provider.stateSlug}/${provider.categorySlug}/${provider.slug}`,
    },
    openGraph: {
      title,
      description,
      images: [provider.imageUrl],
    },
  };
}

export default async function ProviderPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { state, category, provider: providerSlug } = await params;
  const provider = await getProviderByPath(state, category, providerSlug);
  if (!provider) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: provider.name,
    description: provider.description,
    image: provider.imageUrl,
    telephone: provider.phone,
    url: provider.website,
    address: {
      "@type": "PostalAddress",
      streetAddress: provider.address,
      addressRegion: provider.state,
      postalCode: provider.zip,
      addressCountry: "US",
    },
  };

  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-script-component-in-head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative h-64 w-full sm:h-80">
        <Image
          src={provider.imageUrl}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
      </div>

      <div className="container-page">
        <nav aria-label="Breadcrumb" className="py-4 text-sm text-ink/60">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link href="/" className="hover:text-navy-600">Home</Link></li>
            <li>/</li>
            <li><Link href={`/browse?state=${provider.stateSlug}`} className="hover:text-navy-600">{provider.state}</Link></li>
            <li>/</li>
            <li><Link href={`/browse?category=${provider.categorySlug}`} className="hover:text-navy-600">{provider.category}</Link></li>
            <li>/</li>
            <li className="text-ink">{provider.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 pb-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
                  {provider.category}
                </p>
                <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink">
                  {provider.name}
                </h1>
              </div>
              {provider.verified && (
                <span className="flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-700 shrink-0">
                  <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                  Verified Provider
                </span>
              )}
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-ink/60">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {provider.address}, {provider.state} {provider.zip}
            </p>

            {provider.isPremium ? (
              <>
                {provider.servicesOffered.length > 0 && (
                  <>
                    <h2 className="mt-10 font-display text-xl font-semibold text-ink">Services offered</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {provider.servicesOffered.map((s) => (
                        <span key={s} className="rounded-full bg-mist px-3 py-1.5 text-sm font-medium text-ink/80">
                          {s}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                <h2 className="mt-10 font-display text-xl font-semibold text-ink">About</h2>
                <p className="mt-3 text-ink/75 leading-relaxed max-w-2xl">
                  {provider.description}
                </p>

                {provider.insuranceAccepted.length > 0 && (
                  <>
                    <h2 className="mt-10 font-display text-xl font-semibold text-ink">Insurance accepted</h2>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {provider.insuranceAccepted.map((i) => (
                        <li key={i} className="rounded-lg border border-line px-3 py-1.5 text-sm text-ink/70">
                          {i}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {provider.galleryUrls && provider.galleryUrls.length > 0 && (
                  <>
                    <h2 className="mt-10 font-display text-xl font-semibold text-ink">Photos</h2>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {provider.galleryUrls.map((url, i) => (
                        <div key={i} className="relative h-32 overflow-hidden rounded-xl bg-mist">
                          <Image src={url} alt="" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <ProviderMap
                  address={provider.address}
                  state={provider.state}
                  zip={provider.zip}
                  name={provider.name}
                />
              </>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-line bg-mist p-6">
                <p className="text-sm text-ink/70">
                  Services offered, insurance accepted, photos, and a full
                  description become visible once this profile is claimed
                  and upgraded to Premium.
                </p>
              </div>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-line bg-white p-6">
              <h2 className="font-display text-lg font-semibold text-ink mb-4">
                Contact
              </h2>
              <div className="space-y-3 text-sm">
                <a href={`tel:${provider.phone}`} className="flex items-center gap-2 text-ink/80 hover:text-navy-600">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {provider.phone}
                </a>
                {provider.website && (
                  <a href={provider.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink/80 hover:text-navy-600">
                    <Globe className="h-4 w-4" aria-hidden="true" />
                    Visit website
                  </a>
                )}
                {provider.hoursOfOperation && (
                  <p className="flex items-start gap-2 text-ink/80">
                    <Clock className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                    {provider.hoursOfOperation}
                  </p>
                )}
              </div>

              {provider.socialLinks && (
                <div className="mt-4 flex gap-3">
                  {provider.socialLinks.facebook && (
                    <a href={provider.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-ink/50 hover:text-navy-600">
                      <Facebook className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {provider.socialLinks.instagram && (
                    <a href={provider.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-ink/50 hover:text-navy-600">
                      <Instagram className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {provider.socialLinks.linkedin && (
                    <a href={provider.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink/50 hover:text-navy-600">
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}

              {provider.isPremium && provider.contactFormEnabled && provider.contactEmail && (
                <Link
                  href={`/contact/${provider.slug}`}
                  className="mt-5 flex items-center justify-center rounded-xl border border-navy-300 px-4 py-2.5 text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors"
                >
                  Send a message
                </Link>
              )}

              <div className="mt-6 border-t border-line pt-6">
                {provider.claimed ? (
                  <p className="text-xs text-ink/50">
                    This profile is managed by the provider.
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-ink/70 mb-3">
                      Are you affiliated with this listing?
                    </p>
                    <Link
                      href={`/claim?provider=${provider.slug}`}
                      className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
                    >
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                      Claim This Profile
                    </Link>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
