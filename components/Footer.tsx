import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

const columns = [
  {
    title: "Behavioral Health",
    links: CATEGORIES.slice(0, 9).map((c) => ({ label: c.name, href: `/browse?category=${c.slug}` })),
  },
  {
    title: "Senior & Home Care",
    links: CATEGORIES.slice(9).map((c) => ({ label: c.name, href: `/browse?category=${c.slug}` })),
  },
  {
    title: "Providers",
    links: [
      { label: "Create Your Free Profile", href: "/add-profile" },
      { label: "Get Found by Clients", href: "/for-providers" },
      { label: "Claim Your Listing", href: "/claim" },
      { label: "Provider Sign In", href: "/sign-in" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Guides", href: "/guides" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-mist mt-24">
      <div className="container-page py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <span className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-500 text-white font-display font-bold text-xs">
                IC
              </span>
              <span className="font-display text-lg font-semibold text-ink">InCareList</span>
            </span>
            <p className="mt-3 text-sm text-ink/60 max-w-xs">
              A nationwide directory helping people find trusted behavioral
              health and care providers — and helping providers get found.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink/60 hover:text-navy-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-ink/50">
            © {new Date().getFullYear()} InCareList. All rights reserved.
          </p>
          <p className="text-xs text-ink/50 max-w-lg">
            If you or someone you know is in crisis, call or text 988 to reach
            the Suicide &amp; Crisis Lifeline, available 24/7.
          </p>
        </div>
      </div>
    </footer>
  );
}
