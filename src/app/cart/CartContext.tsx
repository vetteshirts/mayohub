"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

// ✅ Exporteer CartItem zodat het ook in andere bestanden gebruikt kan worden
export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  size: string;
  uniqueId: string;
  quantity: number;
}

// ✅ Definieer het CartContextType
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (uniqueId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalQuantity: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Haal de opgeslagen cart op bij laden van de pagina
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  // ✅ Sla de cart op in localStorage bij wijzigingen
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Voeg een item toe aan de cart, als uniek item
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, { ...item, uniqueId: `${item.id}-${item.size}-${Date.now()}` }]);
  };

  // ✅ Verwijder een specifiek item op basis van uniqueId
  const removeFromCart = (uniqueId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.uniqueId !== uniqueId));
  };

  // ✅ Wis de gehele cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // ✅ Haal het totaal aantal unieke items op
  const getTotalItems = () => {
    return cart.length;
  };

  // ✅ Haal het totaal aantal stuks op (rekening houdend met quantity)
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalItems, getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook om CartContext te gebruiken
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};