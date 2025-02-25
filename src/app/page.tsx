import React from 'react';

const products = [
  {
    id: 1,
    name: 'insidejob',
    image: '/insidejob.svg'
  },
  {
    id: 2,
    name: 'maserati',
    image: '/maserati.svg'
  },
  {
    id: 3,
    name: 'bobba',
    image: '/bobba.svg'
  },
  {
    id: 4,
    name: 'vroom',
    image: '/vroom.svg'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <img 
            src="/teequality.jpg" 
            alt="Tee Quality 7/10" 
            className="mx-auto w-1/4 max-w-full h-auto"
          />
        </header>

        <div className="flex flex-col items-center space-y-[125px]">
          {products.map((product) => (
            <a 
              href={`/product/${product.id}`} 
              key={product.id} 
              className="w-full max-w-md"
            >
              <div className="group cursor-pointer">
                <div className="aspect-square overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:opacity-75 transition"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="flex justify-center items-center mt-[125px]">
          <a 
            href="mailto:manager@vetteshirts.nl" 
            className="inline-block w-1/6 max-w-md"
          >
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="w-full cursor-pointer"
            />
          </a>
        </footer>
      </div>
    </main>
  );
}