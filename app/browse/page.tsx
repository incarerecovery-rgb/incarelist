import Link from "next/link";
import { PlusCircle, Search, ChevronLeft, ChevronRight } from "lucide-react";
import ProviderCard from "@/components/ProviderCard";
import { searchProviders } from "@/lib/data/providers";
import { US_STATES, ACTIVE_STATE_SLUGS } from "@/lib/us-states";
import { CATEGORIES, getCategoryBySlug } from "@/lib/types";

export const metadata = {
  title: "Browse Behavioral Health & Care Providers",
  description:
    "Search and filter therapists, treatment centers, senior living communities, and care providers across the United States.",
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; state?: string; category?: string; featured?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const stateSlug = params.state?.trim() ?? "";
  const categorySlug = params.category?.trim() ?? "";
  const featuredOnly = params.featured === "true";
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const hasSearch = Boolean(q || stateSlug || featuredOnly);
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  // A category alone (e.g. clicking "Assisted Living Facilities" from the
  // category grid) isn't narrow enough to dump straight to results once a
  // category can have thousands of matches — ask for a state or name first,
  // but keep the category context so it isn't lost.
  if (categorySlug && !hasSearch) {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-lg text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy-50 text-navy-600 mb-4">
            <Search className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink mb-2">
            {category?.name ?? "Providers"}
          </h1>
          <p className="text-ink/60 mb-6">
            Choose a state to see {category?.name?.toLowerCase() ?? "providers"} near you,
            or search by name, city, or zip code.
          </p>
          <form action="/browse" className="flex flex-col gap-2 sm:flex-row">
            <input type="hidden" name="category" value={categorySlug} />
            <select
              name="state"
              defaultValue="california"
              className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink focus:outline-none focus:border-navy-400 sm:w-40"
            >
              <option value="">Choose a state</option>
              {US_STATES.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </select>
            <input
              type="text"
              name="q"
              placeholder="Provider name, city, or zip code"
              className="flex-1 rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-navy-400"
            />
            <button
              type="submit"
              className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!hasSearch) {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-lg text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy-50 text-navy-600 mb-4">
            <Search className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink mb-2">
            Search to find a provider
          </h1>
          <p className="text-ink/60 mb-6">
            Choose a state and category, or search by name, city, or zip code.
          </p>
          <form action="/browse" className="flex flex-col gap-2 sm:flex-row">
            <select
              name="state"
              defaultValue="california"
              className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink focus:outline-none focus:border-navy-400 sm:w-40"
            >
              <option value="">All states</option>
              {US_STATES.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </select>
            <input
              type="text"
              name="q"
              placeholder="Provider name, city, or zip code"
              className="flex-1 rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-navy-400"
            />
            <button
              type="submit"
              className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    );
  }

  const { providers: results, totalCount, totalPages } = await searchProviders({
    stateSlug: stateSlug || undefined,
    categorySlug: categorySlug || undefined,
    query: q || undefined,
    featuredOnly,
    page,
  });

  const stateName = stateSlug ? US_STATES.find((s) => s.slug === stateSlug)?.name : undefined;

  const headingParts = [category?.name, stateName ? `in ${stateName}` : undefined].filter(Boolean);
  const heading = headingParts.length
    ? headingParts.join(" ")
    : q
      ? `Results for "${q}"`
      : "All providers";

  // Preserve the current filters when building pagination/category links,
  // only ever changing the one param that link is meant to change.
  function buildUrl(overrides: Record<string, string | undefined>) {
    const next = new URLSearchParams();
    const merged = { q, state: stateSlug, category: categorySlug, featured: featuredOnly ? "true" : "", ...overrides };
    for (const [key, value] of Object.entries(merged)) {
      if (value) next.set(key, value);
    }
    const qs = next.toString();
    return `/browse${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="container-page py-12">
      {stateName && (
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
          {stateName}
        </p>
      )}
      <h1 className="font-display text-3xl font-semibold text-ink mb-2">
        {heading}
      </h1>
      <p className="text-ink/60 mb-6">
        {totalCount} {totalCount === 1 ? "provider" : "providers"} found
      </p>

      <form action="/browse" className="mb-8 rounded-2xl bg-navy-50/60 p-3 shadow-lg shadow-navy-900/5 ring-1 ring-navy-100 flex flex-col gap-2 sm:flex-row">
        {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
        {stateSlug && <input type="hidden" name="state" value={stateSlug} />}
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by name, city, or zip code"
          className="flex-1 rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-navy-400"
        />
        <button
          type="submit"
          className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Search
        </button>
      </form>

      {results.length === 0 && stateSlug && !ACTIVE_STATE_SLUGS.includes(stateSlug) ? (
        <div className="rounded-2xl border border-line bg-mist p-10 text-center">
          <p className="text-ink/70 mb-2 font-semibold">
            We're not in {stateName} yet
          </p>
          <p className="text-ink/60 mb-4">
            We're currently focused on building out California, with more
            states coming soon. In the meantime, take a look at what we
            have there.
          </p>
          <Link
            href={buildUrl({ state: "california", page: undefined })}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Browse California providers
          </Link>
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-2xl border border-line bg-mist p-10 text-center">
          <p className="text-ink/70 mb-2 font-semibold">
            Don't see your practice or facility?
          </p>
          <p className="text-ink/60 mb-4">
            Create your free professional profile — it takes a couple of
            minutes and goes live once we review it.
          </p>
          <Link
            href="/add-profile"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
          >
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
            Create your free professional profile
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <ProviderCard key={p.slug} provider={p} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-3">
              <Link
                href={buildUrl({ page: String(Math.max(1, page - 1)) })}
                aria-disabled={page <= 1}
                className={`flex items-center gap-1 rounded-lg border border-line px-3 py-2 text-sm font-semibold ${
                  page <= 1 ? "pointer-events-none opacity-40" : "text-ink/70 hover:border-navy-300 hover:text-navy-600"
                }`}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Previous
              </Link>
              <span className="text-sm text-ink/60">
                Page {page} of {totalPages}
              </span>
              <Link
                href={buildUrl({ page: String(Math.min(totalPages, page + 1)) })}
                aria-disabled={page >= totalPages}
                className={`flex items-center gap-1 rounded-lg border border-line px-3 py-2 text-sm font-semibold ${
                  page >= totalPages ? "pointer-events-none opacity-40" : "text-ink/70 hover:border-navy-300 hover:text-navy-600"
                }`}
              >
                Next
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </nav>
          )}

          <div className="mt-10 flex flex-col items-center justify-center gap-1 text-center text-sm text-ink/50">
            <span>Don't see your practice or facility?</span>
            <Link href="/add-profile" className="font-semibold text-navy-600 hover:text-navy-700">
              Create your free professional profile
            </Link>
          </div>
        </>
      )}

      <div className="mt-16 border-t border-line pt-8">
        <p className="text-sm font-semibold text-ink mb-3">Browse by category</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={buildUrl({ category: c.slug, page: undefined })}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                c.slug === categorySlug
                  ? "border-navy-500 bg-navy-500 text-white"
                  : "border-line text-ink/70 hover:border-navy-300 hover:text-navy-600"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
