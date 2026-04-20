"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import LogoMark from "@/components/layout/logo-mark";
import { megaMenuCategories, topNavLinks } from "@/data/navigation";
import { selectCartCount, useStore } from "@/hooks/use-store";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const cartCount = useStore(selectCartCount);
  const toggleCart = useStore((state) => state.toggleCart);

  const [searchText, setSearchText] = useState(
    () => searchParams.get("search") ?? ""
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMegaOpen, setDesktopMegaOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(
    megaMenuCategories[0].id
  );
  const [mobileCategoryId, setMobileCategoryId] = useState(
    megaMenuCategories[0].id
  );
  const [isScrolled, setIsScrolled] = useState(false);

  const megaMenuRef = useRef(null);

  const activeCategory = useMemo(
    () =>
      megaMenuCategories.find((category) => category.id === activeCategoryId) ??
      megaMenuCategories[0],
    [activeCategoryId]
  );

  useEffect(() => {
    setSearchText(searchParams.get("search") ?? "");
  }, [searchParams]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    function onPointerDown(event) {
      if (!desktopMegaOpen) {
        return;
      }

      if (!megaMenuRef.current?.contains(event.target)) {
        setDesktopMegaOpen(false);
      }
    }

    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [desktopMegaOpen]);

  useEffect(() => {
    setDesktopMegaOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  function handleSearchSubmit(event) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    const query = searchText.trim();

    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`);
    setMobileMenuOpen(false);
  }

  function toggleMobileCategory(categoryId) {
    setMobileCategoryId((current) => (current === categoryId ? "" : categoryId));
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="overflow-hidden border-b border-accent/20 bg-gradient-to-r from-[#0b66c3] via-[#0b66c3] to-[#0e4ea2] py-2">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap text-xs font-semibold text-white md:text-sm"
        >
          <span className="flex items-center gap-6 px-8 md:gap-8 md:px-12">
            <span className="flex items-center gap-2">🚚 <span>Free delivery on orders above L$ 5000</span></span>
            <span className="text-white/60">•</span>
            <span className="flex items-center gap-2">📱 <span>Download app for exclusive offers</span></span>
            <span className="text-white/60">•</span>
            <span className="flex items-center gap-2">⚡ <span>Same-day delivery available</span></span>
            <span className="text-white/60">•</span>
            <span className="flex items-center gap-2">💳 <span>Cash on delivery accepted</span></span>
          </span>
          <span className="flex items-center gap-6 px-8 md:gap-8 md:px-12">
            <span className="flex items-center gap-2">🚚 <span>Free delivery on orders above L$ 5000</span></span>
            <span className="text-white/60">•</span>
            <span className="flex items-center gap-2">📱 <span>Download app for exclusive offers</span></span>
            <span className="text-white/60">•</span>
            <span className="flex items-center gap-2">⚡ <span>Same-day delivery available</span></span>
            <span className="text-white/60">•</span>
            <span className="flex items-center gap-2">💳 <span>Cash on delivery accepted</span></span>
          </span>
        </motion.div>
      </div>

      <motion.div
        animate={{
          boxShadow: isScrolled
            ? "0 16px 38px rgba(12, 26, 44, 0.12)"
            : "0 0 0 rgba(12, 26, 44, 0)",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="border-b border-gray-200 bg-white backdrop-blur-xl"
      >
        <div className="section-shell py-3">
          <div className="grid items-center gap-2 md:grid-cols-[auto_minmax(260px,1fr)_auto] lg:grid-cols-[auto_minmax(420px,1fr)_auto] lg:gap-4">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((current) => !current)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:border-accent hover:text-accent lg:hidden"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              <LogoMark />

              <div
                className="relative hidden lg:block"
                ref={megaMenuRef}
                onMouseEnter={() => setDesktopMegaOpen(true)}
                onMouseLeave={() => setDesktopMegaOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setDesktopMegaOpen((current) => !current)}
                  onFocus={() => setDesktopMegaOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-foreground transition-all hover:border-accent hover:bg-blue-50 hover:text-accent"
                  aria-expanded={desktopMegaOpen}
                  aria-controls="desktop-categories-menu"
                >
                  Categories
                  <ChevronDown size={16} />
                </button>

                <AnimatePresence>
                  {desktopMegaOpen && (
                    <motion.div
                      id="desktop-categories-menu"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className="card-shadow absolute left-0 top-[calc(100%+0.85rem)] z-40 w-[min(92vw,980px)] overflow-hidden rounded-3xl border border-gray-200 bg-white"
                    >
                      <div className="grid grid-cols-[290px_1fr]">
                        <nav className="h-full border-r border-gray-200 bg-white p-2">
                          {megaMenuCategories.map((category) => {
                            const isActive = activeCategory.id === category.id;

                            return (
                              <button
                                key={category.id}
                                type="button"
                                onMouseEnter={() => setActiveCategoryId(category.id)}
                                onFocus={() => setActiveCategoryId(category.id)}
                                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                                  isActive
                                    ? "border border-accent bg-white text-accent shadow-md"
                                    : "border border-gray-200 text-foreground hover:border-accent hover:bg-blue-50 hover:text-accent hover:shadow-sm"
                                }`}
                              >
                                <div>
                                  <p className="font-semibold">{category.label}</p>
                                  <p className="text-xs text-muted">{category.description}</p>
                                </div>
                                <ChevronRight size={14} />
                              </button>
                            );
                          })}
                        </nav>

                        <div className="bg-white p-6">
                          <div className="flex items-end justify-between gap-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                                Browse
                              </p>
                              <h3 className="mt-1 text-2xl font-semibold">
                                {activeCategory.label}
                              </h3>
                            </div>
                            <Link
                              href={activeCategory.href}
                              className="text-sm font-semibold text-accent transition-opacity hover:opacity-80"
                            >
                              View all
                            </Link>
                          </div>

                          <div className="mt-5 grid grid-cols-2 gap-3">
                            {activeCategory.subcategories.map((subcategory) => (
                              <Link
                                key={subcategory.label}
                                href={subcategory.href}
                                className="group flex items-center justify-between rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:text-accent"
                              >
                                {subcategory.label}
                                <ChevronRight
                                  size={16}
                                  className="text-gray-400 transition-all group-hover:text-accent group-hover:translate-x-0.5"
                                />
                              </Link>
                            ))}
                          </div>

                          <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#0b66c3] to-[#0e4ea2] px-4 py-4 text-white shadow-lg">
                            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-white/80">
                              Limited Time
                            </p>
                            <p className="mt-1 text-lg font-semibold">
                              Free delivery over L$ 5000
                            </p>
                            <p className="mt-1 text-sm text-white/80">
                              Add daily essentials and get same-day delivery.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search groceries, snacks, and essentials"
                className="h-12 w-full rounded-full border border-border bg-background pl-12 pr-5 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-4 focus:ring-accent/15"
                aria-label="Search products"
              />
            </form>

            <div className="flex items-center justify-end gap-1 sm:gap-2">
              <Link
                href="/account"
                className="hidden items-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-foreground transition-all hover:border-accent hover:bg-blue-50 hover:text-accent sm:inline-flex"
              >
                <User size={16} />
                <span className="hidden xl:inline">Account</span>
              </Link>

              <Link
                href="/wishlist"
                className="hidden items-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-foreground transition-all hover:border-accent hover:bg-blue-50 hover:text-accent sm:inline-flex"
              >
                <Heart size={16} />
                <span className="hidden xl:inline">Wishlist</span>
              </Link>

              <button
                type="button"
                onClick={toggleCart}
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-gray-300 bg-white text-foreground transition-all hover:border-accent hover:bg-blue-50 hover:text-accent"
                aria-label="Open cart"
              >
                <ShoppingCart size={18} />
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          <div className="hidden items-center justify-between pt-2 lg:flex">
            <nav className="flex items-center gap-1">
              {topNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
              Delivery in 1-3 days | COD Available
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative mt-3 md:hidden">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search groceries"
              className="h-11 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-4 focus:ring-accent/15"
              aria-label="Search products"
            />
          </form>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 overflow-hidden border-t border-border lg:hidden"
              >
                <div className="space-y-3 py-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold"
                    >
                      <User size={15} /> Account
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold"
                    >
                      <Heart size={15} /> Wishlist
                    </Link>
                  </div>

                  <div className="space-y-1">
                    {topNavLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-xl border border-transparent bg-background px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-border"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-border bg-[#f7f9fd] p-2">
                    <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      Categories
                    </p>

                    {megaMenuCategories.map((category) => {
                      const isActive = mobileCategoryId === category.id;

                      return (
                        <div key={category.id} className="rounded-xl">
                          <button
                            type="button"
                            onClick={() => toggleMobileCategory(category.id)}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-foreground"
                          >
                            {category.label}
                            <ChevronDown
                              size={14}
                              className={`transition-transform ${isActive ? "rotate-180" : ""}`}
                            />
                          </button>

                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-2 px-2 pb-2">
                                  {category.subcategories.map((subcategory) => (
                                    <Link
                                      key={subcategory.label}
                                      href={subcategory.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="block rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-accent hover:text-accent hover:shadow-md"
                                    >
                                      {subcategory.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
}
