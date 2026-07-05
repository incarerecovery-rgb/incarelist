export interface Category {
  name: string;
  slug: string;
}

// The 17 categories InCareList covers, spanning behavioral health and
// senior/elder care. Every provider belongs to exactly one category —
// a Hospice Provider and a
// Therapist are different kinds of listings, not variations on one kind.
export const CATEGORIES: Category[] = [
  { name: "Therapists", slug: "therapists" },
  { name: "Psychologists", slug: "psychologists" },
  { name: "Psychiatrists", slug: "psychiatrists" },
  { name: "Mental Health Clinics", slug: "mental-health-clinics" },
  { name: "Substance Use Treatment Centers", slug: "substance-use-treatment-centers" },
  { name: "Detox Centers", slug: "detox-centers" },
  { name: "Sober Living Homes", slug: "sober-living-homes" },
  { name: "Intensive Outpatient Programs (IOP)", slug: "intensive-outpatient-programs" },
  { name: "Partial Hospitalization Programs (PHP)", slug: "partial-hospitalization-programs" },
  { name: "Residential Treatment Centers", slug: "residential-treatment-centers" },
  { name: "Assisted Living Facilities", slug: "assisted-living-facilities" },
  { name: "Memory Care Communities", slug: "memory-care-communities" },
  { name: "Independent Senior Living", slug: "independent-senior-living" },
  { name: "Skilled Nursing Facilities", slug: "skilled-nursing-facilities" },
  { name: "Hospice Providers", slug: "hospice-providers" },
  { name: "Home Health Agencies", slug: "home-health-agencies" },
  { name: "Case Management Services", slug: "case-management-services" },
];

export type CategoryName = typeof CATEGORIES[number]["name"];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export type InsuranceType =
  | "Medicaid"
  | "Medicare"
  | "Private Insurance"
  | "Self-Pay"
  | "Sliding Scale"
  | "Long-Term Care Insurance"
  | "VA Benefits";

export const INSURANCE_TYPES: InsuranceType[] = [
  "Medicaid",
  "Medicare",
  "Private Insurance",
  "Self-Pay",
  "Sliding Scale",
  "Long-Term Care Insurance",
  "VA Benefits",
];

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export interface Provider {
  slug: string;
  name: string;
  category: CategoryName;
  categorySlug: string;
  state: string; // full name, e.g. "California"
  stateSlug: string; // "california"
  address: string;
  zip: string;
  phone: string;
  website?: string;
  description: string;
  servicesOffered: string[];
  insuranceAccepted: InsuranceType[];
  hoursOfOperation?: string;
  contactFormEnabled: boolean;
  contactEmail?: string;
  socialLinks?: SocialLinks;
  verified: boolean;
  featured: boolean;
  claimed: boolean;
  isPremium: boolean;
  imageUrl: string;
  logoUrl?: string;
  galleryUrls?: string[];
  lat?: number;
  lng?: number;
}

export interface StateSummary {
  name: string;
  slug: string;
  providerCount: number;
}

export interface CategorySummary {
  name: string;
  slug: string;
  providerCount: number;
}
