import Link from "next/link";
import { notFound } from "next/navigation";
import { getProviderBySlugAny } from "@/lib/data/providers";
import { createClient } from "@/lib/supabase/server";
import ClaimForm from "@/components/ClaimForm";
import { ShieldCheck, PlusCircle } from "lucide-react";

export const metadata = {
  title: "Claim Your Profile",
};

export default async function ClaimPage({
  searchParams,
}: {
  searchParams: Promise<{ provider?: string; plan?: string }>;
}) {
  const { provider: providerSlug, plan } = await searchParams;

  if (!providerSlug) {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-display text-2xl font-semibold text-ink mb-3">
            Which profile would you like to claim?
          </h1>
          <p className="text-ink/60 mb-6">
            Search for your business and click "Claim This Profile" on its
            listing — or, if it's not listed yet, create it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/browse"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Search profiles
            </Link>
            <Link
              href="/add-profile"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-semibold text-ink hover:bg-mist"
            >
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              Create your free profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const provider = await getProviderBySlugAny(providerSlug);
  if (!provider) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-md">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-600 mb-4">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
          Claim profile
        </p>
        <h1 className="font-display text-2xl font-semibold text-ink mb-6">
          {provider.name}
        </h1>

        {provider.claimed ? (
          <div className="rounded-2xl border border-line bg-mist p-6">
            <p className="text-sm text-ink/70">
              This profile has already been claimed. If you believe that's a
              mistake, please <Link href="/contact" className="text-navy-600 font-semibold">contact us</Link>.
            </p>
          </div>
        ) : user ? (
          <ClaimForm providerSlug={provider.slug} providerName={provider.name} planId={plan} />
        ) : (
          <div className="rounded-2xl border border-line bg-mist p-6">
            <p className="text-sm text-ink/70 mb-4">
              Sign in first so we know who's submitting this claim.
            </p>
            <Link
              href={`/sign-in?next=${encodeURIComponent(`/claim?provider=${provider.slug}`)}`}
              className="inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Sign in to continue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
