"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "@/hooks/use-store";
import { formatCurrency } from "@/lib/currency";
import { getDiscountedPrice } from "@/lib/products";
import { products } from "@/data/products";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [mounted, setMounted] = useState(false);
  const addToCart = useStore((state) => state.addToCart);
  const openCart = useStore((state) => state.openCart);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);
    setMounted(true);
  }, []);

  // Get wishlist products
  const wishlistProducts = mounted
    ? products.filter((p) => wishlist.includes(p.id))
    : [];

  function handleRemoveFromWishlist(productId) {
    const updated = wishlist.filter((id) => id !== productId);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  }

  function handleAddToCart(product) {
    addToCart(product, 1);
    openCart();
  }

  if (!mounted) return null;

  return (
    <div className="section-shell py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Wishlist
        </p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">
          Your Favorites {wishlistProducts.length > 0 && `(${wishlistProducts.length})`}
        </h1>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white py-16">
          <div className="rounded-full bg-gray-100 p-6">
            <Heart className="text-gray-400" size={32} />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">No items yet</h2>
            <p className="mt-2 text-gray-600">
              Start adding products to your wishlist to see them here!
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            <ShoppingCart size={18} />
            Browse Products
          </Link>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {wishlistProducts.map((product, idx) => {
            const discountedPrice = getDiscountedPrice(product);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  {product.discount > 0 && (
                    <span className="absolute left-3 top-3 z-10 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                      {product.discount}% OFF
                    </span>
                  )}

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <motion.button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-lg backdrop-blur transition-all hover:bg-white"
                    aria-label="Remove from wishlist"
                  >
                    <Heart size={18} className="fill-danger text-danger" />
                  </motion.button>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      {product.category}
                    </p>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 hover:text-accent">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(discountedPrice)}
                      </span>
                      {product.discount > 0 && (
                        <span className="text-xs font-semibold text-gray-400 line-through">
                          {formatCurrency(product.price)}
                        </span>
                      )}
                    </div>

                    <motion.button
                      onClick={() => handleAddToCart(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full rounded-lg bg-gradient-to-r from-accent to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:shadow-xl"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
