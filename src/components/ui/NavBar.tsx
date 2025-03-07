"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/app/cart/CartContext";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const { cart } = useCart();
  const pathname = usePathname();
  const showBackButton = pathname !== "/";
  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      setAnimateCart(true);
      setTimeout(() => setAnimateCart(false), 1000); // Reset animatie na 1 sec
    }
  }, [cart.length]);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 z-50">
      {/* Terugknop (indien niet op homepage) */}
      {showBackButton && (
        <Link href="/" className="text-black text-xl hover:opacity-75 transition-opacity">
          ←
        </Link>
      )}

      {/* Winkelwagen rechts */}
      <div className="flex-1 flex justify-end relative">
        <Link href="/cart" className={`flex items-center space-x-1 text-black cart-icon ${animateCart ? "cart-moving" : ""}`}>
          🛒 <span>({cart.length})</span>
        </Link>
      </div>

      {/* CSS animatie */}
      <style>
        {`
          @keyframes cartMove {
            0% { transform: translateX(100vw); }
            100% { transform: translateX(0); }
          }
          .cart-moving {
            animation: cartMove 1s ease-in-out;
          }
        `}
      </style>
    </nav>
  );
}