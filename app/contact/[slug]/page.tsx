import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageSquare, Phone } from "lucide-react";
import { getProviderBySlugAny } from "@/lib/data/providers";
import ContactProviderForm from "@/components/ContactProviderForm";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const provider = await getProviderBySlugAny(slug);
  return { title: provider ? `Message ${provider.name}` : "Send a Message" };
}

export default async function ContactProviderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = await getProviderBySlugAny(slug);
  if (!provider) notFound();

  const canMessage = provider.isPremium && provider.contactFormEnabled && provider.contactEmail;

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-md">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-600 mb-4">
          <MessageSquare className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
          Send a message
        </p>
        <h1 className="font-display text-2xl font-semibold text-ink mb-2">
          {provider.name}
        </h1>
        <p className="text-sm text-ink/60 mb-6">
          Your message goes directly to {provider.name} — InCareList doesn't
          read or store it.
        </p>

        {canMessage ? (
          <ContactProviderForm providerSlug={provider.slug} />
        ) : (
          <div className="rounded-2xl border border-line bg-mist p-6">
            <p className="text-sm text-ink/70 mb-4">
              This provider hasn't set up a contact form yet. You can still
              reach them by phone.
            </p>
            <a
              href={`tel:${provider.phone}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {provider.phone}
            </a>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-ink/50">
          <Link href={`/${provider.stateSlug}/${provider.categorySlug}/${provider.slug}`} className="text-navy-600 font-semibold hover:text-navy-700">
            ← Back to profile
          </Link>
        </p>
      </div>
    </div>
  );
}
