import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GUIDES } from "@/lib/guides";

export const metadata = {
  title: "Guides",
  description: "Plain-language guides to help you understand your care options before you start searching.",
};

export default function GuidesIndexPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-2xl mb-10">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
          Guides
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-4">
          Understand your options first
        </h1>
        <p className="text-ink/70">
          Plain-language answers to the questions people usually have before
          they start looking for a provider.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-6 hover:border-navy-300 hover:shadow-md transition-all"
          >
            <div>
              <h2 className="font-display text-lg font-semibold text-ink mb-2 leading-snug">
                {guide.title}
              </h2>
              <p className="text-sm text-ink/60">{guide.excerpt}</p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 group-hover:text-navy-700">
              Read guide
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
