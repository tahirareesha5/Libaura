import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimateInView from "@/components/sections/animate-in-view";

export default function PromoStrip() {
  return (
    <section className="grid gap-3 md:grid-cols-2">
      <AnimateInView direction="up" className="h-full">
        <article className="relative h-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[#0f3e77] to-[#0b66c3] p-6 text-white">
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/20" />
          <div className="pointer-events-none absolute bottom-0 right-10 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
            Weekend Deal
          </p>
          <h3 className="mt-2 text-2xl font-semibold">Save 20% on Fruit Boxes</h3>
          <p className="mt-2 max-w-sm text-sm text-white/80">
            Buy any two fruit bundles and unlock instant checkout discounts.
          </p>

          <Link
            href="/products?category=Fruits"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0f3e77]"
          >
            Shop Fruits
            <ArrowRight size={14} />
          </Link>
        </article>
      </AnimateInView>

      <AnimateInView direction="up" delay={0.05} className="h-full">
        <article className="relative h-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[#fff2df] to-[#fde4c1] p-6">
          <div className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-white/45 blur-xl" />

          <p className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#8d5f26]">
            <Sparkles size={12} />
            Premium pantry
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-[#4f2f13]">
            Stock your kitchen this week
          </h3>
          <p className="mt-2 max-w-sm text-sm text-[#6f5133]">
            Curated oils, grains, and breakfast essentials with same-day delivery.
          </p>

          <Link
            href="/products?category=Pantry"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Explore Pantry
            <ArrowRight size={14} />
          </Link>
        </article>
      </AnimateInView>
    </section>
  );
}
