import Link from "next/link";
import {
  Apple,
  Carrot,
  Croissant,
  GlassWater,
  Milk,
  Package,
  Popcorn,
  Snowflake,
} from "lucide-react";
import AnimateInView from "@/components/sections/animate-in-view";

const categoryDetailsByName = {
  Fruits: {
    Icon: Apple,
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=80",
    teaser: "Sweet and seasonal picks",
  },
  Vegetables: {
    Icon: Carrot,
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
    teaser: "Farm-fresh daily selection",
  },
  Dairy: {
    Icon: Milk,
    image:
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=1200&q=80",
    teaser: "Milk, cheese, and yogurt",
  },
  Snacks: {
    Icon: Popcorn,
    image:
      "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=1200&q=80",
    teaser: "Crunchy and savory treats",
  },
  Beverages: {
    Icon: GlassWater,
    image:
      "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=80",
    teaser: "Juices, coffee, and hydration",
  },
  Bakery: {
    Icon: Croissant,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    teaser: "Freshly baked classics",
  },
  Pantry: {
    Icon: Package,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e17b?auto=format&fit=crop&w=1200&q=80",
    teaser: "Kitchen staples and grains",
  },
  Frozen: {
    Icon: Snowflake,
    image:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=80",
    teaser: "Quick and easy meal prep",
  },
};

export default function CategoryGrid({ categories }) {
  return (
    <section className="space-y-6">
      <AnimateInView direction="up">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Shop by category
            </p>
            <h2 className="mt-1 text-3xl font-semibold">Your daily departments</h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-accent transition-opacity hover:opacity-80"
          >
            View all products
          </Link>
        </div>
      </AnimateInView>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {categories.map((category, index) => {
          const categoryDetails = categoryDetailsByName[category] ?? {
            Icon: Package,
            image:
              "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
            teaser: "Smart picks for your cart",
          };

          const Icon = categoryDetails.Icon;

          return (
            <AnimateInView key={category} direction="up" delay={index * 0.04}>
              <Link
                href={`/products?category=${encodeURIComponent(category)}`}
                className="group relative flex min-h-36 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundImage: `linear-gradient(140deg, rgba(11, 102, 195, 0.16), rgba(17, 24, 39, 0.12)), url(${categoryDetails.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/92" />

                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                  <Icon size={18} />
                </span>

                <div className="relative">
                  <p className="text-sm font-semibold transition-colors duration-300 group-hover:text-accent">{category}</p>
                  <p className="text-xs text-muted transition-colors duration-300 group-hover:text-foreground/70">{categoryDetails.teaser}</p>
                </div>
              </Link>
            </AnimateInView>
          );
        })}
      </div>
    </section>
  );
}
