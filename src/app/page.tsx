"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "insidejob",
    image: "/insidejob.svg",
    description: "Inside Job T-Shirt",
    price: 30,
  },
  {
    id: 2,
    name: "maserati",
    image: "/maserati.svg",
    description: "Maserati T-Shirt",
    price: 30,
  },
  {
    id: 3,
    name: "bobba",
    image: "/bobba.svg",
    description: "Bobba T-Shirt",
    price: 30,
  },
  {
    id: 4,
    name: "vroom",
    image: "/vroom.svg",
    description: "Vroom T-Shirt",
    price: 30,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Producten Grid */}
        <div className="flex flex-col items-center space-y-[125px]">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="w-full max-w-md">
              <div className="group cursor-pointer">
                <div className="aspect-square overflow-hidden mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover group-hover:opacity-75 transition"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-medium text-gray-900">{product.description}</h2>
                  <p className="mt-1 text-sm text-gray-500">€{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <footer className="flex justify-center items-center mt-[125px]">
          <Link href="mailto:manager@vetteshirts.nl" className="inline-block w-1/6 max-w-md">
            <Image src="/logo.svg" alt="Logo" width={100} height={100} className="w-full cursor-pointer" />
          </Link>
        </footer>
      </div>
    </main>
  );
}