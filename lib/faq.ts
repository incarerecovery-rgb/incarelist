export interface FaqItem {
  question: string;
  answer: string;
}

export const PROVIDER_FAQS: FaqItem[] = [
  {
    question: "Why should I claim my profile?",
    answer:
      "Claiming lets you fix anything that's wrong, add your own description, and get a Verified Provider badge — unclaimed profiles can't be edited by anyone but our team.",
  },
  {
    question: "How long does review take?",
    answer:
      "We review every claim and new profile by hand rather than approving automatically, so we can confirm you're actually affiliated with the provider. Most reviews finish within 2 business days.",
  },
  {
    question: "What information do I need to create a profile?",
    answer:
      "Your business or provider name, category, state, address, phone number, and a way to verify you — your name, role, work email, and phone.",
  },
  {
    question: "What happens if I never claim my profile?",
    answer:
      "It stays live with the basic public information — name, address, phone, category — but no one can update it, and it won't show a Verified badge or appear in featured placements.",
  },
  {
    question: "Can I upgrade later, or is creating a profile and upgrading separate?",
    answer:
      "Separate. Creating your free profile is instant. Premium checkout runs through Stripe — after you pay, our team activates the upgrade on your profile, typically within 1 business day.",
  },
  {
    question: "Does Premium actually get more visibility?",
    answer:
      "Yes — featured placement on the homepage and priority position in search results within your state and category. Free profiles still appear, just in normal relevance order.",
  },
  {
    question: "What does Premium actually pay for?",
    answer:
      "A complete, visible profile — your website, logo, photos, description, services, insurance, hours, and social links shown publicly, plus a Verified badge, Google Maps integration, a contact form, and priority placement in search. It's a flat yearly fee for a better profile, not a pay-per-lead service.",
  },
  {
    question: "How do I pay for Premium?",
    answer:
      "Click \"Get Premium\" on the pricing page — it opens a secure Stripe checkout page. Card payments only for now. Once payment goes through, activation on your profile is manual on our end and usually happens within 1 business day.",
  },
  {
    question: "What can I edit once I'm approved?",
    answer:
      "Phone number and address on any plan. Website, logo, photos, description, services offered, insurance accepted, hours, and social links are saved on the free plan too, but only shown on your public profile once you upgrade to Premium.",
  },
  {
    question: "Who do I contact with questions?",
    answer:
      "Reach out through our contact page and a real person on our team will get back to you — we don't route provider questions through an automated system.",
  },
];
