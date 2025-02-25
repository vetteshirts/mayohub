import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/cart/CartContext";
import NavBar from "@/components/ui/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vette Shirts",
  description: "Vette Shirts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        <CartProvider>
          <NavBar />
          <main>
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
