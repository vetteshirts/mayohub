"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  size: string;
  uniqueId: string;
  quantity: number;  // ✅ Hier toegevoegd
  }

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (uniqueId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, { ...item, uniqueId: `${item.id}-${item.size}-${Date.now()}` }]);
  };

  const removeFromCart = (uniqueId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.uniqueId !== uniqueId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const getTotalItems = () => {
    return cart.length;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
