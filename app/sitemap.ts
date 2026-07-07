import type { MetadataRoute } from "next";
import { getAllProviderPaths } from "@/lib/data/providers";
import { GUIDES } from "@/lib/guides";
import { ACTIVE_STATE_SLUGS } from "@/lib/us-states";

const BASE_URL = "https://incarelist.com";

// Categories are stored in the database, not a static file — mirroring the
// slugs used across the site so category browse pages are included without
// a network call at sitemap-build time.
const CATEGORY_SLUGS = [
  "therapists",
  "psychologists",
  "psychiatrists",
  "mental-health-clinics",
  "substance-use-treatment-centers",
  "detox-centers",
  "sober-living-homes",
  "intensive-outpatient-programs",
  "partial-hospitalization-programs",
  "residential-treatment-centers",
  "assisted-living-facilities",
  "memory-care-communities",
  "independent-senior-living",
  "skilled-nursing-facilities",
  "hospice-providers",
  "home-health-agencies",
  "case-management-services",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/browse`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/for-providers`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/add-profile`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/claim`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const guidePages: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${BASE_URL}/guides/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Category + state combo pages (only for states with real data today —
  // grows automatically as ACTIVE_STATE_SLUGS grows).
  const categoryStatePages: MetadataRoute.Sitemap = [];
  for (const stateSlug of ACTIVE_STATE_SLUGS) {
    for (const categorySlug of CATEGORY_SLUGS) {
      categoryStatePages.push({
        url: `${BASE_URL}/browse?category=${categorySlug}&state=${stateSlug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  const providerPaths = await getAllProviderPaths();
  const providerPages: MetadataRoute.Sitemap = providerPaths.map((p) => ({
    url: `${BASE_URL}/${p.state}/${p.category}/${p.provider}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...guidePages, ...categoryStatePages, ...providerPages];
}
