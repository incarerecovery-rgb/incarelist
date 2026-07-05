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
];

export function getGuide(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
