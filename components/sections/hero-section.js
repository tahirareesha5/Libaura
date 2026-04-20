"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const heroSlides = [
  {
    id: "fresh-market",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=80",
    heading: "Fresh groceries, delivered with care",
    description:
      "Shop premium produce, pantry staples, and daily essentials in one smooth experience.",
  },
  {
    id: "fruits",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1800&q=80",
    heading: "From farm to doorstep in record time",
    description:
      "Curated quality checks and rapid dispatch keep every order fresh and reliable.",
  },
  {
    id: "checkout",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6FvzoGyz9jX4e7SYgk43iiMjCjncNYFJKQ&s",
    heading: "Simple shopping with smooth checkout",
    description:
      "Find what you need fast, add in one tap, and pay conveniently with cash on delivery.",
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const activeSlide = heroSlides[activeIndex];

  return (
    <section className="relative isolate overflow-hidden bg-[#0f1728]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${activeSlide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1728]/86 via-[#0f1728]/65 to-[#0f1728]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1728]/80 via-[#0f1728]/25 to-transparent" />

      <div className="section-shell relative z-10 flex min-h-[calc(100vh-140px)] sm:min-h-[calc(100vh-160px)] lg:min-h-[calc(100vh-150px)] items-end pb-10 pt-10 sm:pb-12 sm:pt-12 lg:pb-16 lg:pt-16">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,770px)_minmax(0,1fr)] lg:items-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSlide.id}-content`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                <Sparkles size={14} />
                Fresh picks everyday
              </span>

              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  {activeSlide.heading}
                </h1>
                <p className="max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                  {activeSlide.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0f1728] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Shop Now
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/products?sort=discount"
                  className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  Explore Offers
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="hidden justify-end lg:flex">
            <div className="w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/75">
                Why shoppers choose us
              </p>
              <div className="mt-4 space-y-3 text-sm text-white/90">
                <p className="rounded-xl border border-white/15 bg-white/10 px-3 py-2">
                  Premium quality checks on every order
                </p>
                <p className="rounded-xl border border-white/15 bg-white/10 px-3 py-2">
                  Smooth checkout with cash on delivery
                </p>
                <p className="rounded-xl border border-white/15 bg-white/10 px-3 py-2">
                  Fast dispatch and reliable customer support
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-8">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-7 bg-white" : "w-2.5 bg-white/55"
              }`}
              aria-label={`Go to hero slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
