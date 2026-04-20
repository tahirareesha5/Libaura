"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import { useStore } from "@/hooks/use-store";
import { formatCurrency } from "@/lib/currency";
import { getDiscountedPrice } from "@/lib/products";
import { useState, useEffect } from "react";

export default function ProductCard({ product, priority = false }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const addToCart = useStore((state) => state.addToCart);
  const openCart = useStore((state) => state.openCart);

  const discountedPrice = getDiscountedPrice(product);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsWishlisted(wishlist.includes(product.id));
    setMounted(true);
  }, [product.id]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!mounted) return;
    
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (isWishlisted && !wishlist.includes(product.id)) {
      wishlist.push(product.id);
    } else if (!isWishlisted && wishlist.includes(product.id)) {
      wishlist.splice(wishlist.indexOf(product.id), 1);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [isWishlisted, product.id, mounted]);

  function handleAddToCart() {
    addToCart(product, 1);
    openCart();
  }

  function handleToggleWishlist(e) {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  }

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-xl hover:border-gray-200"
    >
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {product.discount > 0 && (
            <motion.span 
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1 }}
              className="absolute left-4 top-4 z-10 rounded-lg bg-gradient-to-r from-warm to-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg"
            >
              {product.discount}% OFF
            </motion.span>
          )}

          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <motion.button
            onClick={handleToggleWishlist}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-lg backdrop-blur transition-all hover:bg-white"
            aria-label="Add to wishlist"
          >
            <Heart
              size={18}
              className={`transition-all duration-300 ${
                isWishlisted
                  ? "fill-danger text-danger"
                  : "text-gray-400 group-hover:text-danger"
              }`}
            />
          </motion.button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4 transition-all duration-300 group-hover:p-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {product.category}
          </p>

          <Link href={`/products/${product.id}`}>
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900 transition-colors hover:text-accent">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(discountedPrice)}
            </span>
            {product.discount > 0 && (
              <span className="text-xs font-semibold text-gray-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <motion.div
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              className="text-xs font-medium text-gray-500"
            >
              🚚 2-4 hours
            </motion.div>
            <motion.button
              type="button"
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-accent to-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
            >
              <Plus size={15} />
              Add
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
