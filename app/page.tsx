import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProviders from "@/components/FeaturedProviders";
import ForProvidersTeaser from "@/components/ForProvidersTeaser";
import WhyInCareList from "@/components/WhyInCareList";
import { getFeaturedProviders } from "@/lib/data/providers";

export default async function HomePage() {
  const featured = await getFeaturedProviders();

  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProviders providers={featured} />
      <ForProvidersTeaser />
      <WhyInCareList />
    </>
  );
}
