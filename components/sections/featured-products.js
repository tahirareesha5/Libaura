import Link from "next/link";
import ProductCard from "@/components/product/product-card";
import AnimateInView from "@/components/sections/animate-in-view";

export default function FeaturedProducts({
  products,
  title = "Featured Products",
  description = "Handpicked grocery favorites with premium quality and quick delivery.",
}) {
  return (
    <section className="space-y-5">
      <AnimateInView direction="up">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Curated for today
            </p>
            <h2 className="mt-1 text-3xl font-semibold">{title}</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted sm:text-base">
              {description}
            </p>
          </div>

          <Link
            href="/products"
            className="text-sm font-semibold text-accent transition-opacity hover:opacity-80"
          >
            Explore full catalog
          </Link>
        </div>
      </AnimateInView>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {products.map((product, index) => (
          <AnimateInView
            key={product.id}
            direction="up"
            delay={Math.min(index * 0.03, 0.2)}
          >
            <ProductCard product={product} priority={index < 2} />
          </AnimateInView>
        ))}
      </div>
    </section>
  );
}
