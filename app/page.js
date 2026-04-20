import CategoryGrid from "@/components/sections/category-grid";
import FeaturedProducts from "@/components/sections/featured-products";
import HeroSection from "@/components/sections/hero-section";
import PromoStrip from "@/components/sections/promo-strip";
import { getCategories, getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const categories = getCategories();
  const featuredProducts = getFeaturedProducts(8);

  return (
    <div className="flex w-full flex-col gap-10 pb-16">
      <HeroSection />

      <div className="section-shell flex flex-col gap-12 lg:gap-16">
        <CategoryGrid categories={categories} />
        <PromoStrip />
        <FeaturedProducts products={featuredProducts} />
      </div>
    </div>
  );
}
