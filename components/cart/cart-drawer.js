"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import CartItem from "@/components/cart/cart-item";
import { selectSubtotal, useStore } from "@/hooks/use-store";
import { formatCurrency } from "@/lib/currency";

export default function CartDrawer() {
  const pathname = usePathname();

  const cartOpen = useStore((state) => state.cartOpen);
  const cartItems = useStore((state) => state.cartItems);
  const subtotal = useStore(selectSubtotal);
  const closeCart = useStore((state) => state.closeCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  useEffect(() => {
    if (!cartOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-[#080f1d]/40 backdrop-blur-[2px]"
            onClick={closeCart}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-lg flex-col border-l border-border bg-white"
          >
            <div className="flex items-center justify-between border-b border-border bg-white px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  Your Cart
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                  Grocery Basket
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-accent-soft text-accent">
                  <ShoppingBag size={24} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">Your cart is empty</h3>
                  <p className="mt-1 text-sm text-muted">
                    Add fresh groceries and they will appear right here.
                  </p>
                </div>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto bg-[#fcfdff] px-4 py-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                      onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                      onRemove={() => removeFromCart(item.id)}
                    />
                  ))}
                </div>

                <div className="space-y-4 border-t border-border bg-white px-5 py-4">
                  <div className="rounded-2xl border border-border bg-blue-100 p-3 text-sm">
                    <div className="flex items-center justify-between text-muted">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-muted">
                      <span>Delivery</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-base font-bold text-foreground">
                      <span>Total</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
