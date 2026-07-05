import { CategoryName } from "./types";

export type PlanId = "individual" | "facility";

export interface Plan {
  id: PlanId;
  name: string;
  priceMonthly: number; // USD/month (facility plan only — individual is annual-only)
  priceAnnual: number; // USD/year
  tagline: string;
  features: string[];
  appliesTo: string; // shown on pricing page, e.g. "Therapists, Psychologists & Psychiatrists"
  stripePaymentLink: string; // Stripe Payment Link — annual price, opens in a new tab
}

// Individual practitioners (solo therapists, psychologists, psychiatrists)
// have a fundamentally different cost structure than institutions — one
// client relationship doesn't carry the same revenue an admitted resident
// or a filled treatment bed does. Priced well under what practitioners
// already pay elsewhere (e.g. Psychology Today premium listings run
// roughly $360–720/year) so it's an easy yes rather than a real budget
// decision.
export const INDIVIDUAL_PLAN: Plan = {
  id: "individual",
  name: "Individual Premium",
  priceMonthly: 0, // annual-only, no monthly option
  priceAnnual: 45,
  tagline: "Everything you need to get found, for less than a single session.",
  appliesTo: "Therapists, Psychologists & Psychiatrists",
  stripePaymentLink: "https://buy.stripe.com/6oU5kE1HPebLgZy6dH67S02",
  features: [
    "Website link",
    "Photos",
    "Full bio & description",
    "Services offered",
    "Insurance accepted",
    "Hours of operation",
    "Contact form",
    "Social media links",
    "Featured placement in search results",
    "SEO-optimized profile",
    "Verified Provider badge",
    "Google Maps integration",
    "Additional contact information",
  ],
};

// Facilities and institutional providers (treatment centers, senior living,
// skilled nursing, hospice, home health, etc.) — priced for organizations
// where a single admission or referral is worth far more than the listing
// fee itself. Monthly option available; annual is discounted (paying
// annually is roughly like getting ~2 months free vs. paying month to
// month) to reward the commitment and reduce churn/admin overhead.
export const FACILITY_PLAN: Plan = {
  id: "facility",
  name: "Facility Premium",
  priceMonthly: 15,
  priceAnnual: 149,
  tagline: "Get found first by families and referral partners searching in your category.",
  appliesTo: "All facility & institutional categories",
  stripePaymentLink: "https://buy.stripe.com/dRmbJ2gCJgjT10AgSl67S01",
  features: [
    "Website link",
    "Logo",
    "Photos & portfolio gallery",
    "Full business description",
    "Services offered",
    "Insurance accepted",
    "Hours of operation",
    "Contact form",
    "Social media links",
    "Featured placement in search results",
    "SEO-optimized profile",
    "Verified Provider badge",
    "Google Maps integration",
    "Additional contact information",
  ],
};

// The 3 individual-practitioner categories. Every other category (all 14
// facility/institutional ones) falls under the Facility plan by default.
const INDIVIDUAL_CATEGORIES: CategoryName[] = ["Therapists", "Psychologists", "Psychiatrists"];

export function getPlanForCategory(category: CategoryName | string): Plan {
  return INDIVIDUAL_CATEGORIES.includes(category as CategoryName) ? INDIVIDUAL_PLAN : FACILITY_PLAN;
}

// How much paying annually saves vs. 12x the monthly rate — used in the
// pricing page's "or save $X/year" messaging. Individual plan is
// annual-only, so this is only meaningful for the Facility plan.
export function annualSavings(plan: Plan): number {
  return plan.priceMonthly * 12 - plan.priceAnnual;
}

export const FREE_PLAN_FEATURES = [
  "Business or provider name",
  "Address",
  "Phone number",
  "Category",
];
