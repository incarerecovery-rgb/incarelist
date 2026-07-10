import { createClient } from "@/lib/supabase/server";
import {
  providers as mockProviders,
  stateSummaries as mockStateSummaries,
  categorySummaries as mockCategorySummaries,
  getProvider as getMockProvider,
  getProviderBySlug as getMockProviderBySlug,
} from "@/lib/mock-data";
import { Provider, InsuranceType, StateSummary, CategorySummary } from "@/lib/types";

// This is the single place that decides "real data or mock data" for every
// public-facing page (homepage, browse, provider profile). Pages should
// import from here, never from lib/mock-data directly, so the whole site
// upgrades to real data the moment Supabase is connected.
//
// InCareList is state-only (no city layer) and each provider belongs to
// exactly one category, so this is a flatter join than a multi-category
// facility model — one lookup for state name, one for category name.

interface Lookups {
  statesById: Map<string, { name: string; slug: string }>;
  categoriesById: Map<string, { name: string; slug: string }>;
}

async function loadLookups(supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>): Promise<Lookups> {
  const [{ data: states }, { data: categories }] = await Promise.all([
    supabase.from("states").select("id, name, slug"),
    supabase.from("categories").select("id, name, slug"),
  ]);

  return {
    statesById: new Map((states ?? []).map((s: any) => [s.id, { name: s.name, slug: s.slug }])),
    categoriesById: new Map((categories ?? []).map((c: any) => [c.id, { name: c.name, slug: c.slug }])),
  };
}

function mapRow(row: any, lookups: Lookups): Provider {
  const state = lookups.statesById.get(row.state_id);
  const category = lookups.categoriesById.get(row.category_id);
  const isPremium = Boolean(row.is_premium);

  return {
    slug: row.slug,
    name: row.name,
    category: (category?.name ?? "") as Provider["category"],
    categorySlug: category?.slug ?? "",
    state: state?.name ?? "",
    stateSlug: state?.slug ?? "",
    address: row.address,
    zip: row.zip,
    phone: row.phone ?? "",
    // Free listings show name/address/phone/category only — everything
    // else is a Premium feature. Data stays attached regardless (so search
    // still works on it), but display components gate on isPremium.
    website: isPremium ? (row.website ?? undefined) : undefined,
    description: isPremium ? (row.description ?? "") : "",
    servicesOffered: isPremium ? (row.services_offered ?? []) : [],
    insuranceAccepted: isPremium ? ((row.insurance_accepted ?? []) as InsuranceType[]) : [],
    hoursOfOperation: isPremium ? (row.hours_of_operation ?? undefined) : undefined,
    contactFormEnabled: isPremium ? Boolean(row.contact_form_enabled) : false,
    contactEmail: isPremium ? (row.contact_email ?? undefined) : undefined,
    socialLinks: isPremium
      ? {
          facebook: row.facebook_url ?? undefined,
          instagram: row.instagram_url ?? undefined,
          linkedin: row.linkedin_url ?? undefined,
        }
      : undefined,
    verified: row.verified,
    featured: row.featured,
    claimed: row.claimed,
    isPremium,
    imageUrl: isPremium ? (row.image_url ?? null) : null,
    logoUrl: isPremium ? (row.logo_url ?? undefined) : undefined,
    galleryUrls: isPremium ? (row.gallery_urls ?? undefined) : undefined,
    lat: row.lat ?? undefined,
    lng: row.lng ?? undefined,
  };
}

const PROVIDER_COLUMNS = [
  "id, slug, name, address, zip, phone, website,",
  "description, services_offered, insurance_accepted,",
  "hours_of_operation, contact_form_enabled, contact_email,",
  "facebook_url, instagram_url, linkedin_url, image_url,",
  "logo_url, gallery_urls, lat, lng, verified, featured,",
  "claimed, owner_id, state_id, category_id, is_premium",
].join(" ");

export async function getAllProviders(): Promise<Provider[]> {
  const supabase = await createClient();
  if (!supabase) return mockProviders;

  const [{ data, error }, lookups] = await Promise.all([
    supabase.from("providers").select(PROVIDER_COLUMNS),
    loadLookups(supabase),
  ]);

  if (error || !data) return mockProviders;
  return data.map((row) => mapRow(row, lookups));
}

export async function getFeaturedProviders(limit = 6): Promise<Provider[]> {
  const supabase = await createClient();
  if (!supabase) return mockProviders.filter((p) => p.featured).slice(0, limit);

  const [{ data, error }, lookups] = await Promise.all([
    supabase.from("providers").select(PROVIDER_COLUMNS).eq("featured", true).limit(limit),
    loadLookups(supabase),
  ]);

  if (error || !data) return [];
  return data.map((row) => mapRow(row, lookups));
}

const PAGE_SIZE = 24;

export interface ProviderSearchParams {
  stateSlug?: string;
  categorySlug?: string;
  query?: string;
  featuredOnly?: boolean;
  page?: number; // 1-indexed
}

export interface ProviderSearchResult {
  providers: Provider[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// The core search used by /browse. Filters and paginates at the database
// level — critical once the dataset grows past a few thousand rows, since
// "fetch everything, filter in JS" (the old approach) stops scaling well
// long before that.
export async function searchProviders(params: ProviderSearchParams): Promise<ProviderSearchResult> {
  const page = Math.max(1, params.page ?? 1);
  const supabase = await createClient();

  if (!supabase) {
    // Mock-data mode: same filtering logic, applied to the small in-memory
    // array, then paginated the same way real results would be.
    const q = params.query?.toLowerCase().trim() ?? "";
    const filtered = mockProviders
      .filter((p) => {
        if (params.featuredOnly && !p.featured) return false;
        if (params.stateSlug && p.stateSlug !== params.stateSlug) return false;
        if (params.categorySlug && p.categorySlug !== params.categorySlug) return false;
        if (!q) return true;
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.zip.includes(q)
        );
      })
      .sort((a, b) => Number(b.isPremium) - Number(a.isPremium));

    const totalCount = filtered.length;
    const start = (page - 1) * PAGE_SIZE;
    return {
      providers: filtered.slice(start, start + PAGE_SIZE),
      totalCount,
      page,
      pageSize: PAGE_SIZE,
      totalPages: Math.max(1, Math.ceil(totalCount / PAGE_SIZE)),
    };
  }

  // Resolve state/category slugs to IDs first — small, indexed lookups,
  // not the full table.
  let stateId: string | undefined;
  let categoryId: string | undefined;

  if (params.stateSlug) {
    const { data } = await supabase.from("states").select("id").eq("slug", params.stateSlug).single();
    if (!data) return { providers: [], totalCount: 0, page, pageSize: PAGE_SIZE, totalPages: 1 };
    stateId = data.id;
  }
  if (params.categorySlug) {
    const { data } = await supabase.from("categories").select("id").eq("slug", params.categorySlug).single();
    if (!data) return { providers: [], totalCount: 0, page, pageSize: PAGE_SIZE, totalPages: 1 };
    categoryId = data.id;
  }

  let query = supabase.from("providers").select(PROVIDER_COLUMNS, { count: "exact" });

  if (params.featuredOnly) query = query.eq("featured", true);
  if (stateId) query = query.eq("state_id", stateId);
  if (categoryId) query = query.eq("category_id", categoryId);
  if (params.query) {
    // Strip characters that have special meaning in PostgREST's .or()
    // filter syntax, so a search term can't accidentally break the query.
    const safeQuery = params.query.replace(/[,()]/g, "").trim();
    if (safeQuery) {
      query = query.or(`name.ilike.%${safeQuery}%,zip.ilike.%${safeQuery}%,address.ilike.%${safeQuery}%`);
    }
  }

  const start = (page - 1) * PAGE_SIZE;
  query = query.order("is_premium", { ascending: false }).range(start, start + PAGE_SIZE - 1);

  const [{ data, count, error }, lookups] = await Promise.all([query, loadLookups(supabase)]);

  if (error || !data) {
    return { providers: [], totalCount: 0, page, pageSize: PAGE_SIZE, totalPages: 1 };
  }

  const totalCount = count ?? data.length;
  return {
    providers: data.map((row) => mapRow(row, lookups)),
    totalCount,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil(totalCount / PAGE_SIZE)),
  };
}

export async function getProviderByPath(
  stateSlug: string,
  categorySlug: string,
  slug: string
): Promise<Provider | undefined> {
  const supabase = await createClient();
  if (!supabase) return getMockProvider(stateSlug, categorySlug, slug);

  const [{ data, error }, lookups] = await Promise.all([
    supabase.from("providers").select(PROVIDER_COLUMNS).eq("slug", slug).single(),
    loadLookups(supabase),
  ]);

  if (error || !data) return undefined;
  return mapRow(data, lookups);
}

// Used by /claim, which only has the slug (not the full state/category path).
export async function getProviderBySlugAny(slug: string): Promise<Provider | undefined> {
  const supabase = await createClient();
  if (!supabase) return getMockProviderBySlug(slug);

  const [{ data, error }, lookups] = await Promise.all([
    supabase.from("providers").select(PROVIDER_COLUMNS).eq("slug", slug).single(),
    loadLookups(supabase),
  ]);

  if (error || !data) return undefined;
  return mapRow(data, lookups);
}

export async function getStateSummaries(): Promise<StateSummary[]> {
  const supabase = await createClient();
  if (!supabase) return mockStateSummaries;

  const all = await getAllProviders();
  const map = new Map<string, StateSummary>();
  for (const p of all) {
    if (!p.stateSlug) continue;
    const existing = map.get(p.stateSlug);
    map.set(p.stateSlug, {
      name: p.state,
      slug: p.stateSlug,
      providerCount: (existing?.providerCount ?? 0) + 1,
    });
  }
  return Array.from(map.values());
}

export async function getCategorySummaries(): Promise<CategorySummary[]> {
  const supabase = await createClient();
  if (!supabase) return mockCategorySummaries;

  const all = await getAllProviders();
  const map = new Map<string, CategorySummary>();
  for (const p of all) {
    if (!p.categorySlug) continue;
    const existing = map.get(p.categorySlug);
    map.set(p.categorySlug, {
      name: p.category,
      slug: p.categorySlug,
      providerCount: (existing?.providerCount ?? 0) + 1,
    });
  }
  return Array.from(map.values());
}

// For generateStaticParams — falls back to mock slugs at build time if
// Supabase env vars aren't set. Uses a plain client (no cookies) since
// this runs outside a request.
export async function getAllProviderPaths() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return mockProviders.map((p) => ({
      state: p.stateSlug,
      category: p.categorySlug,
      provider: p.slug,
    }));
  }

  const { createClient: createPlainClient } = await import("@supabase/supabase-js");
  const supabase = createPlainClient(url, anonKey);

  const [{ data: providers }, { data: states }, { data: categories }] = await Promise.all([
    supabase.from("providers").select("slug, state_id, category_id"),
    supabase.from("states").select("id, slug"),
    supabase.from("categories").select("id, slug"),
  ]);

  if (!providers) return [];

  const statesById = new Map((states ?? []).map((s: any) => [s.id, s]));
  const categoriesById = new Map((categories ?? []).map((c: any) => [c.id, c]));

  return providers
    .map((p: any) => {
      const state = statesById.get(p.state_id);
      const category = categoriesById.get(p.category_id);
      return {
        state: state?.slug ?? "",
        category: category?.slug ?? "",
        provider: p.slug,
      };
    })
    .filter((p) => p.state && p.category);
}
