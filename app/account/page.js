import Link from "next/link";

export const metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <div className="section-shell flex min-h-[50vh] flex-col justify-center gap-5 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Account
      </p>
      <h1 className="max-w-2xl text-4xl font-semibold">Manage your profile and orders</h1>
      <p className="max-w-2xl text-sm text-muted sm:text-base">
        Account dashboard modules can be expanded here for profile management,
        addresses, and order tracking.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/products"
          className="inline-flex items-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white"
        >
          Continue shopping
        </Link>
        <Link
          href="/checkout"
          className="inline-flex items-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground"
        >
          Go to checkout
        </Link>
      </div>
    </div>
  );
}
