"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/product/product-card";
import AnimateInView from "@/components/sections/animate-in-view";
import { getDiscountedPrice } from "@/lib/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "discount", label: "Best Discount" },
];

export default function ProductListingClient({
  products,
  categories,
  initialSearch = "",
  initialCategory = "All",
  initialSort = "featured",
}) {
  const maxPriceAvailable = useMemo(
    () => Math.ceil(Math.max(...products.map((product) => getDiscountedPrice(product)))),
    [products]
  );

  const [search, setSearch] = useState(() => initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(() => initialCategory);
  const [sortBy, setSortBy] = useState(() => initialSort);
  const [priceLimit, setPriceLimit] = useState(() => maxPriceAvailable);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const byFilter = products.filter((product) => {
      const productPrice = getDiscountedPrice(product);
      const matchCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchPrice = productPrice <= priceLimit;
      const matchSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      return matchCategory && matchPrice && matchSearch;
    });

    const sorted = [...byFilter];

    if (sortBy === "price-low") {
      sorted.sort((a, b) => getDiscountedPrice(a) - getDiscountedPrice(b));
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => getDiscountedPrice(b) - getDiscountedPrice(a));
    } else if (sortBy === "discount") {
      sorted.sort((a, b) => b.discount - a.discount);
    }

    return sorted;
  }, [priceLimit, products, search, selectedCategory, sortBy]);

  function resetFilters() {
    setSearch("");
    setSelectedCategory("All");
    setSortBy("featured");
    setPriceLimit(maxPriceAvailable);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <AnimateInView direction="right" className="h-fit lg:sticky lg:top-28">
        <aside className="surface-card rounded-3xl p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              <SlidersHorizontal size={16} />
              Filters
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-accent"
            >
              Reset
            </button>
          </div>

          <div className="space-y-5">
            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Search
              </span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search groceries"
                className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </label>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Category
              </p>
              <div className="flex flex-wrap gap-2">
                {["All", ...categories].map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                      selectedCategory === category
                        ? "bg-accent text-white"
                        : "bg-background text-muted hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <label className="block space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Price range
                </span>
                <span className="text-xs font-semibold text-foreground">
                  Up to L$ {priceLimit}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max={maxPriceAvailable}
                value={priceLimit}
                onChange={(event) => setPriceLimit(Number(event.target.value))}
                className="w-full accent-accent"
              />
            </label>
          </div>
        </aside>
      </AnimateInView>

      <section className="space-y-4">
        <AnimateInView direction="up" className="surface-card rounded-2xl p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {filteredProducts.length} products found
              </p>
              <p className="text-xs text-muted">Delivery in 2-4 hours</p>
            </div>

            <label className="inline-flex items-center gap-2 text-sm font-semibold">
              Sort
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </AnimateInView>

        {filteredProducts.length === 0 ? (
          <AnimateInView direction="up" className="surface-card rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold">No products match this filter</h3>
            <p className="mt-1 text-sm text-muted">
              Try another search term or reset your filters.
            </p>
          </AnimateInView>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 xl:gap-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.16) }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
