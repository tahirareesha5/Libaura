"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, BadgeCheck, LoaderCircle, Trash2 } from "lucide-react";
import QuantityStepper from "@/components/ui/quantity-stepper";
import { selectSubtotal, useStore } from "@/hooks/use-store";
import { formatCurrency } from "@/lib/currency";

const phonePattern = /^\+?[0-9]{7,15}$/;

function validateCheckout(values) {
  const errors = {};

  if (!values.fullName.trim() || values.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!phonePattern.test(values.phone.trim())) {
    errors.phone = "Use a valid phone number format.";
  }

  if (!values.address.trim() || values.address.trim().length < 8) {
    errors.address = "Please enter a complete delivery address.";
  }

  if (!values.city.trim()) {
    errors.city = "City is required.";
  }

  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();

  const cartItems = useStore((state) => state.cartItems);
  const subtotal = useStore(selectSubtotal);
  const checkoutDraft = useStore((state) => state.checkoutDraft);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);
  const setCheckoutDraft = useStore((state) => state.setCheckoutDraft);
  const setLastOrder = useStore((state) => state.setLastOrder);

  const [formValues, setFormValues] = useState(checkoutDraft);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field, value) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setCheckoutDraft({ [field]: value });
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handlePlaceOrder(event) {
    event.preventDefault();
    setSubmitError("");

    if (cartItems.length === 0) {
      setSubmitError("Your cart is empty. Add items before placing an order.");
      return;
    }

    const nextErrors = validateCheckout(formValues);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer: {
          fullName: formValues.fullName.trim(),
          phone: formValues.phone.trim(),
          address: formValues.address.trim(),
          city: formValues.city.trim(),
          notes: formValues.notes.trim(),
        },
        paymentMethod: "Cash on Delivery",
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          image: item.image,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal: Number((item.quantity * item.unitPrice).toFixed(2)),
        })),
        subtotal,
        total: subtotal,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body?.message ?? "Unable to place your order.");
      }

      setLastOrder(body);
      clearCart();

      router.push(`/order-success?orderId=${encodeURIComponent(body.id)}`);
    } catch (error) {
      setSubmitError(error.message || "Unable to place your order.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="section-shell flex w-full flex-col gap-6 pb-16 pt-6 lg:gap-8 lg:pt-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Checkout
        </p>
        <h1 className="text-4xl font-semibold sm:text-5xl">Complete your order</h1>
        <p className="max-w-2xl text-sm text-muted sm:text-base">
          Cash on Delivery only. Your groceries will be dispatched as soon as the
          order is confirmed.
        </p>
      </header>

      <form
        onSubmit={handlePlaceOrder}
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]"
      >
        <section className="space-y-4">
          <article className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-[0_14px_32px_rgba(10,22,40,0.08)] sm:p-6">
            <h2 className="text-xl font-semibold">Delivery details</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-semibold">Full Name</span>
                <input
                  value={formValues.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/10"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-xs text-danger">{errors.fullName}</p>
                )}
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold">Phone Number</span>
                <input
                  value={formValues.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/10"
                  placeholder="+231..."
                />
                {errors.phone && <p className="text-xs text-danger">{errors.phone}</p>}
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold">City</span>
                <input
                  value={formValues.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/10"
                  placeholder="Monrovia"
                />
                {errors.city && <p className="text-xs text-danger">{errors.city}</p>}
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-semibold">Address</span>
                <textarea
                  value={formValues.address}
                  onChange={(event) => updateField("address", event.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/10"
                  placeholder="Street, landmark, and delivery instructions"
                />
                {errors.address && (
                  <p className="text-xs text-danger">{errors.address}</p>
                )}
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-semibold">Order Notes (optional)</span>
                <textarea
                  value={formValues.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/10"
                  placeholder="Any optional delivery notes"
                />
              </label>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-[0_14px_32px_rgba(10,22,40,0.08)] sm:p-6">
            <h2 className="text-xl font-semibold">Payment Method</h2>
            <div className="mt-4 rounded-2xl border border-accent/25 bg-accent-soft p-4">
              <p className="text-sm font-semibold text-accent">Cash on Delivery</p>
              <p className="mt-1 text-sm text-muted">Pay with cash upon delivery</p>
              <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-accent">
                COD Enabled
              </span>
            </div>
          </article>
        </section>

        <aside className="h-fit rounded-[1.75rem] border border-border bg-surface p-5 shadow-[0_16px_34px_rgba(10,22,40,0.1)] sm:p-6 lg:sticky lg:top-28">
          <h2 className="text-xl font-semibold">Order summary</h2>

          {cartItems.length === 0 ? (
            <div className="mt-4 rounded-2xl bg-background p-4 text-sm text-muted">
              Your cart is empty.
              <Link
                href="/products"
                className="mt-2 block font-semibold text-accent hover:opacity-80"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-border bg-background p-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="line-clamp-1 text-sm font-semibold">{item.name}</p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-red-50 hover:text-danger"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <QuantityStepper
                          quantity={item.quantity}
                          compact
                          onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                          onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                        />
                        <p className="text-sm font-bold">
                          {formatCurrency(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              <div className="rounded-2xl border border-border p-4 text-sm">
                <div className="flex items-center justify-between text-muted">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-muted">
                  <span>Delivery</span>
                  <span>Included</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-base font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
              </div>
            </div>
          )}

          {submitError && (
            <p className="mt-4 inline-flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-danger">
              <AlertCircle size={16} className="mt-0.5" />
              {submitError}
            </p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: cartItems.length === 0 ? 1 : 1.01 }}
            whileTap={{ scale: cartItems.length === 0 ? 1 : 0.98 }}
            disabled={cartItems.length === 0 || isSubmitting}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle size={16} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <BadgeCheck size={16} />
                Place Order
              </>
            )}
          </motion.button>
        </aside>
      </form>
    </div>
  );
}
