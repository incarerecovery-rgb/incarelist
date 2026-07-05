import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GuideCategoryLink } from "@/lib/guides";

export default function GuideLayout({
  title,
  dek,
  relatedCategories,
  children,
}: {
  title: string;
  dek: string;
  relatedCategories: GuideCategoryLink[];
  children: React.ReactNode;
}) {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink/50">
          <Link href="/guides" className="hover:text-navy-600">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-ink/70">{title}</span>
        </nav>

        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
          Guide
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-lg text-ink/70 mb-8">{dek}</p>

        <div className="prose-guide space-y-6 text-ink/80 leading-relaxed [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-ink/80 [&_strong]:text-ink [&_strong]:font-semibold">
          {children}
        </div>

        <div className="mt-12 rounded-2xl bg-mist p-6 text-sm text-ink/60">
          This guide is for general information only and isn't a substitute
          for advice from a qualified professional. Every situation is
          different — when in doubt, talk to a licensed provider about your
          specific circumstances.
        </div>

        {relatedCategories.length > 0 && (
          <div className="mt-10 border-t border-line pt-8">
            <p className="text-sm font-semibold text-ink mb-3">
              Ready to look for a provider?
            </p>
            <div className="flex flex-wrap gap-3">
              {relatedCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/browse?category=${c.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-ink/80 hover:border-navy-300 hover:text-navy-600 transition-colors"
                >
                  Browse {c.name}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
