"use client";

import { useState } from "react";
import Link from "next/link";
import PromoBanner from "@/components/sections/promo-banner";
import {
  CircleDollarSign,
  Heart,
  Headset,
  Mail,
  MapPin,
  Phone,
  RefreshCcw,
  Truck,
  Plus,
  Minus,
} from "lucide-react";

const serviceHighlights = [
  {
    title: "Fast Shipping",
    description: "Shipped in 1-3 days",
    Icon: Truck,
  },
  {
    title: "Free Returns",
    description: "Easy 7-day return",
    Icon: RefreshCcw,
  },
  {
    title: "Cash On Delivery",
    description: "Pay when your order arrives",
    Icon: CircleDollarSign,
  },
  {
    title: "Customer Support",
    description: "Phone and email support",
    Icon: Headset,
  },
];

const customerServiceLinks = [
  { label: "Contact Us and Location", href: "/checkout" },
  { label: "Delivery Info", href: "/products" },
  { label: "FAQs", href: "/products?search=faq" },
  { label: "Loyalty Program", href: "/products?sort=discount" },
];

const informationLinks = [
  { label: "About Us", href: "/products" },
  { label: "Return & Refund", href: "/checkout" },
  { label: "Privacy Policy", href: "/products?search=privacy" },
  { label: "Terms & Conditions", href: "/products?search=terms" },
  { label: "Careers", href: "/products?search=careers" },
];

const socialLinks = [
  { label: "Facebook", href: "#", Icon: Heart },
  { label: "Instagram", href: "#", Icon: Heart },
  { label: "LinkedIn", href: "#", Icon: Mail },
  { label: "Twitter", href: "#", Icon: Heart },
];

const paymentMethods = [
  "HBL",
  "VISA",
  "Mastercard",
  "UnionPay",
  "PayFast",
  "easypaisa",
];

const faqItems = [
  {
    id: "delivery",
    question: "How does our delivery and pickup work?",
    answer: "We offer fast and reliable delivery across Pakistan. You can choose standard delivery (1-3 business days) or express delivery options. We also offer pickup from our designated collection points for your convenience. Track your order in real-time through our app.",
  },
  {
    id: "cost",
    question: "How much does shipping cost?",
    answer: "Shipping costs vary based on location and order value. Orders over a certain amount qualify for free shipping. Express delivery has a nominal charge. You'll see all shipping options with prices during checkout before confirming your purchase.",
  },
  {
    id: "pricing",
    question: "Will I pay the same price on our store as I would in physical shops?",
    answer: "Our online prices are often more competitive than physical stores since we have lower overhead costs. We pass these savings to our customers. Additionally, we offer exclusive online deals and discounts that aren't available in-store.",
  },
  {
    id: "outofstock",
    question: "What happens if something is out of stock and I need special instructions?",
    answer: "If an item is out of stock, you can join the waitlist or choose an alternative product. During checkout, there's a section for special instructions. Our customer service team will review your requests and contact you if we need clarification.",
  },
  {
    id: "returns",
    question: "What is your return policy?",
    answer: "We offer hassle-free returns within 7 days of delivery. Items must be in original condition with all packaging. Simply initiate a return through your account, and we'll arrange pickup. Refunds are processed within 5-7 business days.",
  },
];

export default function SiteFooter() {
  const [openFAQ, setOpenFAQ] = useState({});

  const toggleFAQ = (faqId) => {
    setOpenFAQ((prev) => ({
      ...prev,
      [faqId]: !prev[faqId],
    }));
  };

  return (
    <>
      {/* FAQ Section */}
      <section className="mt-14  bg-white">
        <div className="section-shell py-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Common Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    {item.question}
                  </span>
                  {openFAQ[item.id] ? (
                    <Minus size={24} className="text-gray-600 shrink-0" />
                  ) : (
                    <Plus size={24} className="text-gray-600 shrink-0" />
                  )}
                </button>
                {openFAQ[item.id] && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200 animate-in fade-in slide-in-from-up-2 duration-300">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <PromoBanner
        title="Weight Loss"
        description="Shop nutritious and high fiber/protein foods to complement GLP-1 and other wellness focused lifestyles.*"
        linkText="Start Shopping"
        image="/images.jfif"
        imageName="Fresh Produce Selection"
      />

      {/* Footer */}
      <footer className="mt-14">
      {/* Service Highlights */}
      <div className="border-y border-border bg-surface">
        <div className="section-shell grid grid-cols-2 gap-4 py-6 md:grid-cols-4 md:gap-6">
          {serviceHighlights.map((service) => (
            <article
              key={service.title}
              className="flex items-start gap-3 border-r border-border/80 pr-3 last:border-r-0 last:pr-0"
            >
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <service.Icon size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{service.title}</p>
                <p className="text-xs text-muted">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="bg-[var(--footer)] text-white">
        <div className="section-shell grid gap-10 py-10 sm:py-12 lg:grid-cols-4">
          <section>
            <h2 className="text-2xl font-semibold">Contact Details</h2>
            <div className="mt-5 space-y-4 text-sm text-white/75">
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                156-157, Block 3, Main Boulevard, Karachi, Pakistan
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                Safa Mall, Ziarat Line, Malir Cantonment, Karachi
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                (021) 111-624-333
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                support@libaura.pk
              </p>
              <p>Customer Support: 7 days a week, 9:00am - 10:00pm</p>
            </div>

            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white hover:text-[var(--footer)]"
                >
                  <social.Icon size={15} />
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Customer Services</h2>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              {customerServiceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Information</h2>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              {informationLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Subscribe our Newsletter</h2>
            <p className="mt-5 text-sm text-white/80">
              Get the latest offers, launches, and promotions directly in your inbox.
            </p>

            <form className="mt-4 flex overflow-hidden rounded-xl border border-white/20 bg-white/10">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 w-full bg-transparent px-4 text-sm text-white placeholder:text-white/60 outline-none"
              />
              <button
                type="submit"
                className="h-11 shrink-0 bg-[#0b66c3] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.08em]">
              <span className="rounded-lg border border-white/25 px-3 py-1.5 text-white/80">
                Get it on Google Play
              </span>
              <span className="rounded-lg border border-white/25 px-3 py-1.5 text-white/80">
                Download on App Store
              </span>
            </div>
          </section>
        </div>

        <div className="border-t border-white/10">
          <div className="section-shell flex flex-col gap-4 py-4 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
            <p>Copyright 2026 Libaura.pk. All rights reserved.</p>

            <div className="flex flex-wrap items-center gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="rounded-md border border-white/20 bg-white/10 px-2 py-1 text-xs font-semibold text-white/85"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
