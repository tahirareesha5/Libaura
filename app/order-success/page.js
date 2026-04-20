"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import { useStore } from "@/hooks/use-store";
import { formatCurrency } from "@/lib/currency";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const lastOrder = useStore((state) => state.lastOrder);

  const orderFromStore =
    lastOrder && (!orderId || lastOrder.id === orderId) ? lastOrder : null;

  const [fetchedOrder, setFetchedOrder] = useState(null);

  const [isFetching, setIsFetching] = useState(false);

  const order = orderFromStore ?? fetchedOrder;

  useEffect(() => {
    if (orderFromStore) {
      return;
    }

    if (!orderId) {
      return;
    }

    let isMounted = true;

    async function fetchOrder() {
      setIsFetching(true);
      try {
        const response = await fetch(`/api/orders?id=${encodeURIComponent(orderId)}`);

        if (!response.ok) {
          return;
        }

        const payload = await response.json();

        if (isMounted) {
          setFetchedOrder(payload);
        }
      } finally {
        if (isMounted) {
          setIsFetching(false);
        }
      }
    }

    fetchOrder();

    return () => {
      isMounted = false;
    };
  }, [orderFromStore, orderId]);

  return (
    <div className="section-shell flex w-full max-w-5xl flex-col gap-6 pb-16 pt-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[2rem] border border-border bg-surface p-6 text-center shadow-[0_16px_36px_rgba(10,22,40,0.1)] sm:p-10"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent">
          <CheckCircle2 size={32} />
        </span>

        <h1 className="mt-4 text-4xl font-semibold">Order placed successfully!</h1>
        <p className="mt-2 text-sm text-muted sm:text-base">
          You will pay cash on delivery.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.1em]">
          <span className="rounded-full bg-background px-3 py-1.5 text-muted">
            Delivery in 2-4 hours
          </span>
          <span className="rounded-full bg-accent-soft px-3 py-1.5 text-accent">
            Cash on Delivery
          </span>
        </div>
      </motion.section>

      <section className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-border bg-surface p-4 shadow-[0_12px_26px_rgba(10,22,40,0.08)]">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <Truck size={15} />
            Delivery window
          </p>
          <p className="mt-1 text-sm text-muted">Your order arrives within 2-4 hours.</p>
        </article>

        <article className="rounded-2xl border border-border bg-surface p-4 shadow-[0_12px_26px_rgba(10,22,40,0.08)]">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <ShieldCheck size={15} />
            Payment method
          </p>
          <p className="mt-1 text-sm text-muted">Pay with cash upon delivery.</p>
        </article>
      </section>

      <section className="rounded-3xl border border-border bg-surface p-5 shadow-[0_16px_34px_rgba(10,22,40,0.1)] sm:p-6">
        <h2 className="text-2xl font-semibold">Order summary</h2>

        {isFetching ? (
          <p className="mt-3 text-sm text-muted">Loading your order details...</p>
        ) : order ? (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-muted">
              Order ID: <span className="font-semibold text-foreground">{order.id}</span>
            </p>

            <div className="space-y-2">
              {order.items.map((item) => (
                <article
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2 text-sm"
                >
                  <p>
                    {item.name} x {item.quantity}
                  </p>
                  <p className="font-semibold">{formatCurrency(item.lineTotal)}</p>
                </article>
              ))}
            </div>

            <div className="rounded-xl border border-border px-3 py-2 text-sm">
              <div className="flex items-center justify-between text-muted">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">
            Order details are not available yet. You can continue shopping.
          </p>
        )}
      </section>

      <Link
        href="/products"
        className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-fit"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense>
      <OrderSuccessContent />
    </Suspense>
  );
}
