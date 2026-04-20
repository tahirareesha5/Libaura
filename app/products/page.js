import ProductListingClient from "@/components/product/product-listing-client";
import { products } from "@/data/products";
import { getCategories } from "@/lib/products";

export const metadata = {
  title: "Shop Groceries",
  description:
    "Browse fruits, vegetables, dairy, snacks, and pantry essentials from Libaura.",
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const categories = getCategories();

  const initialSearch =
    typeof params.search === "string" ? params.search.trim() : "";
  const initialCategory =
    typeof params.category === "string" ? params.category : "All";
  const initialSort = typeof params.sort === "string" ? params.sort : "featured";
  const listingKey = `${initialSearch}|${initialCategory}|${initialSort}`;

  return (
    <div className="section-shell flex w-full flex-col gap-6 pb-14 pt-6 lg:gap-8 lg:pt-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Grocery catalog
        </p>
        <h1 className="text-4xl font-semibold">Shop all groceries</h1>
        <p className="max-w-2xl text-sm text-muted sm:text-base">
          Filter by category, compare prices, and quickly add essentials to your
          cart.
        </p>
      </header>

      <ProductListingClient
        key={listingKey}
        products={products}
        categories={categories}
        initialSearch={initialSearch}
        initialCategory={initialCategory}
        initialSort={initialSort}
      />
    </div>
  );
}
