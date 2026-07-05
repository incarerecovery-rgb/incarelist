import Link from "next/link";
import CategoryGrid from "@/components/CategoryGrid";

export const metadata = {
  title: "All Categories",
  description: "Browse every category of behavioral health and care provider on InCareList.",
};

export default function CategoriesPage() {
  return (
    <div className="pb-8">
      <div className="container-page pt-16">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
          Categories
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink max-w-xl">
          Every category InCareList covers
        </h1>
        <p className="mt-3 text-ink/70 max-w-lg">
          Behavioral health and senior care, side by side. Pick a category
          to start browsing, or{" "}
          <Link href="/browse" className="text-navy-600 font-semibold hover:text-navy-700">
            search directly
          </Link>.
        </p>
      </div>
      <CategoryGrid />
    </div>
  );
}
