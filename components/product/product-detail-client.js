"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import ProductCard from "@/components/product/product-card";
import AnimateInView from "@/components/sections/animate-in-view";
import QuantityStepper from "@/components/ui/quantity-stepper";
import { useStore } from "@/hooks/use-store";
import { formatCurrency } from "@/lib/currency";
import { getDiscountedPrice } from "@/lib/products";

export default function ProductDetailClient({ product, relatedProducts }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = useStore((state) => state.addToCart);
  const openCart = useStore((state) => state.openCart);

  const discountedPrice = getDiscountedPrice(product);

  const totalPrice = useMemo(
    () => Number((discountedPrice * quantity).toFixed(2)),
    [discountedPrice, quantity]
  );

  function addSelectedQuantity() {
    addToCart(product, quantity);
    openCart();
  }

  return (
    <div className="section-shell flex w-full flex-col gap-10 pb-14 pt-6 lg:gap-14 lg:pt-8">
      <Link
        href="/products"
        className="inline-flex w-fit items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={15} />
        Back to products
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <AnimateInView direction="right" className="surface-card overflow-hidden rounded-3xl p-3 sm:p-5">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-background">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </AnimateInView>

        <AnimateInView direction="left" className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {product.category}
            </p>
            <h1 className="text-4xl font-semibold leading-tight">{product.name}</h1>
            <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em]">
            <span className="rounded-full bg-accent-soft px-3 py-1.5 text-accent">
              Delivery in 2-4 hours
            </span>
            <span className="rounded-full bg-background px-3 py-1.5 text-muted">
              Cash on Delivery Available
            </span>
          </div>

          <div className="flex items-end gap-3">
            <p className="text-3xl font-bold text-foreground">
              {formatCurrency(discountedPrice)}
            </p>
            {product.discount > 0 && (
              <p className="pb-1 text-base text-muted line-through">
                {formatCurrency(product.price)}
              </p>
            )}
          </div>

          <div className="surface-card rounded-2xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Select quantity</p>
                <p className="text-xs text-muted">Total: {formatCurrency(totalPrice)}</p>
              </div>
              <QuantityStepper
                quantity={quantity}
                onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
                onIncrease={() => setQuantity((current) => current + 1)}
              />
            </div>

            <motion.button
              type="button"
              onClick={addSelectedQuantity}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Add to Cart
            </motion.button>
          </div>

          <div className="grid gap-3 text-sm text-muted sm:grid-cols-2">
            <div className="surface-card rounded-2xl p-3">
              <p className="inline-flex items-center gap-2 font-semibold text-foreground">
                <Truck size={15} />
                Fast Dispatch
              </p>
              <p className="mt-1 text-xs">Orders placed before 6 PM ship same day.</p>
            </div>
            <div className="surface-card rounded-2xl p-3">
              <p className="inline-flex items-center gap-2 font-semibold text-foreground">
                <ShieldCheck size={15} />
                Freshness Promise
              </p>
              <p className="mt-1 text-xs">Quality checked before every delivery.</p>
            </div>
          </div>
        </AnimateInView>
      </section>

      {relatedProducts.length > 0 && (
        <section className="space-y-5">
          <AnimateInView direction="up">
            <h2 className="text-3xl font-semibold">Related products</h2>
          </AnimateInView>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {relatedProducts.map((relatedProduct, index) => (
              <AnimateInView
                key={relatedProduct.id}
                direction="up"
                delay={Math.min(index * 0.04, 0.2)}
              >
                <ProductCard product={relatedProduct} />
              </AnimateInView>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
