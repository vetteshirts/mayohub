"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCart } from "@/app/cart/CartContext";

export default function ProductDetailPage() {
  const { addToCart } = useCart();
  const params = useParams();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [productId, setProductId] = useState<number | null>(null);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (params?.id) {
      setProductId(Number(params.id));
    }
  }, [params]);

  if (productId === null) return null;

  const productDetails: { [key: number]: { name: string; image: string; price: number } } = {
    1: { name: "Inside Job", image: "/insidejob.svg", price: 30 },
    2: { name: "Maserati", image: "/maserati.svg", price: 30 },
    3: { name: "Bobba", image: "/bobba.svg", price: 30 },
    4: { name: "Vroom", image: "/vroom.svg", price: 30 },
    5: { name: "Pythagoras", image: "/pythagoras.svg", price: 30 },
  };

  const product = productDetails[productId] || productDetails[1];
  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({
      id: productId,
      name: product.name,
      image: product.image,
      price: product.price,
      size: selectedSize,
      uniqueId: `${productId}-${selectedSize}-${Date.now()}`,
      quantity: 1,
    });

    // Flip animatie winkelwagentje
    setFlipping(true);
    setTimeout(() => setFlipping(false), 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      {/* Productafbeelding */}
      <div className="w-full max-w-md aspect-square overflow-hidden">
        <Image src={product.image} alt={product.name} width={500} height={500} className="w-full h-full object-cover" />
      </div>

      {/* Prijs */}
      <p className="text-2xl font-semibold text-center">€{product.price}</p>

      {/* Selecteer maat */}
      <div className="text-center">
        <div className="flex justify-center space-x-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 rounded-full border-2 border-black border-dotted ${
                selectedSize === size ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Toevoegen aan winkelwagen */}
      <button
        onClick={handleAddToCart}
        className="w-full max-w-md py-3 rounded-full border-2 border-black border-dotted bg-black text-white hover:bg-gray-800"
        disabled={!selectedSize}
      >
        {selectedSize ? `Add to Cart (${selectedSize})` : "Select a Size"}
      </button>

      {/* Flip animatie voor winkelwagentje */}
      <style>
        {`
          @keyframes flip {
            0% { transform: rotateY(0); }
            50% { transform: rotateY(180deg); }
            100% { transform: rotateY(0); }
          }
          .cart-icon {
            display: inline-block;
            animation: ${flipping ? "flip 0.5s ease-in-out" : "none"};
          }
        `}
      </style>
    </div>
  );
}