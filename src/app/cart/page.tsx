"use client";

import React from "react";
import { useCart, CartItem } from "@/app/cart/CartContext";
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart, getTotalQuantity } = useCart();

  // ✅ Bereken de totale prijs correct door rekening te houden met de quantity
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4 p-8 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg border border-gray-300">
        {/* ✅ Titel en Bedankbericht */}
        <h1 className="text-center text-xl font-bold mb-4">*** RECEIPT ***</h1>
        <p className="text-center text-sm mt-2">THANK YOU</p>
        <hr className="border-dashed border-gray-400 my-2" />

        {/* ✅ Controleer of de winkelwagen leeg is */}
        {cart.length === 0 ? (
          <p className="text-lg text-center">Your cart is empty.</p>
        ) : (
          <div className="text-sm">
            {cart.map((item: CartItem, index) => (
              <div key={index} className="flex items-center py-2 border-b border-dashed border-gray-300">
                {/* ✅ Hoeveelheid links van de afbeelding */}
                <p className="text-left text-sm mr-2 w-9">{item.quantity}x</p>
                {/* ✅ Productafbeelding */}
                <Image src={item.image} alt={item.name} width={500} height={500} className="w-12 h-12 object-cover mr-4" />
                {/* ✅ Productnaam en maat */}
                <p className="text-left flex-1">{item.name} ({item.size})</p>
                {/* ✅ Prijs en Verwijderknop rechts */}
                <div className="flex items-center justify-end w-1/3 text-right">
                  <p className="mr-2">€{(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.uniqueId)}
                    className="text-red-500 text-sm hover:text-red-700 transform scale-75"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
            <hr className="border-dashed border-gray-400 my-2" />
            
            {/* ✅ Totale prijs en aantal producten */}
            <div className="flex justify-between text-lg font-semibold mt-2">
              <p>TOTAL ({getTotalQuantity()} items)</p>
              <p className="text-right">€{totalPrice.toFixed(2)}</p>
            </div>
            <hr className="border-dashed border-gray-400 my-2" />

            {/* ✅ Betaalknop */}
            <button className="w-full py-3 mt-4 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Pay now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}