export interface GuideCategoryLink {
  name: string;
  slug: string;
}

export interface GuideMeta {
  title: string;
  slug: string;
  excerpt: string;
  relatedCategories: GuideCategoryLink[];
}

// Guide articles live at /guides/[slug]. Each also has its own page.tsx
// with the actual content — this file is just the index/metadata used by
// the /guides listing page and for cross-linking between guides.
export const GUIDES: GuideMeta[] = [
  {
    title: "How to Choose a Therapist",
    slug: "how-to-choose-a-therapist",
    excerpt:
      "What actually matters when picking a therapist — credentials, specialties, approach, and the practical logistics people often overlook.",
    relatedCategories: [
      { name: "Therapists", slug: "therapists" },
      { name: "Psychologists", slug: "psychologists" },
      { name: "Psychiatrists", slug: "psychiatrists" },
    ],
  },
  {
    title: "Assisted Living vs. Memory Care",
    slug: "assisted-living-vs-memory-care",
    excerpt:
      "The real differences between these two senior living options, and how to tell which one actually fits your family's situation.",
    relatedCategories: [
      { name: "Assisted Living Facilities", slug: "assisted-living-facilities" },
      { name: "Memory Care Communities", slug: "memory-care-communities" },
    ],
  },
  {
    title: "Detox vs. Residential Treatment",
    slug: "detox-vs-residential-treatment",
    excerpt:
      "These two levels of care get confused constantly. Here's what each one actually involves, and how they usually fit together.",
    relatedCategories: [
      { name: "Detox Centers", slug: "detox-centers" },
      { name: "Residential Treatment Centers", slug: "residential-treatment-centers" },
    ],
  },
  {
    title: "Assisted Living vs. Skilled Nursing: What's the Difference?",
    slug: "assisted-living-vs-skilled-nursing",
    excerpt:
      "One is about support with daily life. The other is medical care. Here's how to tell which one actually fits the situation.",
    relatedCategories: [
      { name: "Assisted Living Facilities", slug: "assisted-living-facilities" },
      { name: "Skilled Nursing Facilities", slug: "skilled-nursing-facilities" },
    ],
  },
  {
    title: "Understanding Levels of Care in Substance Use Treatment",
    slug: "levels-of-care-substance-use-treatment",
    excerpt:
      "Detox, residential, and outpatient care all serve different purposes. Here's how the full continuum of care actually fits together.",
    relatedCategories: [
      { name: "Detox Centers", slug: "detox-centers" },
      { name: "Residential Treatment Centers", slug: "residential-treatment-centers" },
      { name: "Substance Use Treatment Centers", slug: "substance-use-treatment-centers" },
    ],
  },
  {
    title: "What Is Hospice Care and Who Qualifies?",
    slug: "what-is-hospice-care",
    excerpt:
      "Hospice is often misunderstood as giving up. Here's what it actually provides, when it starts, and who's eligible.",
    relatedCategories: [
      { name: "Hospice Providers", slug: "hospice-providers" },
    ],
  },
  {
    title: "How to Choose a Home Health Agency in California",
    slug: "how-to-choose-a-home-health-agency-california",
    excerpt:
      "What to actually check before bringing in-home care into a family member's life — licensing, services, and the right questions to ask.",
    relatedCategories: [
      { name: "Home Health Agencies", slug: "home-health-agencies" },
    ],
  },
  {
    title: "How Skilled Nursing Facility Licensing Works in California",
    slug: "skilled-nursing-facility-licensing-california",
    excerpt:
      "What a California skilled nursing license actually verifies, how to check one, and the questions licensing doesn't answer for you.",
    relatedCategories: [
      { name: "Skilled Nursing Facilities", slug: "skilled-nursing-facilities" },
    ],
  },
];

export function getGuide(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
