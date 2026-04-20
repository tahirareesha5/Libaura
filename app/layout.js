import { Suspense } from "react";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import SiteFooter from "@/components/layout/site-footer";
import CartDrawer from "@/components/cart/cart-drawer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Libaura | Fresh Grocery Delivery",
    template: "%s | Libaura",
  },
  description:
    "Serving Liberia with Quality Groceries. Discover fresh produce, dairy, pantry essentials, and same-day delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="flex min-h-full flex-col">
          <Suspense>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
