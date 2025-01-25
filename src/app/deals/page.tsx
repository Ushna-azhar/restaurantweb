'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity?: number; // Optional to accommodate products added to the cart
}

// Mock product data
const products: Product[] = [
  { id: 1, name: 'Nihari', price: 10.99, image: '/p1.jpeg', description: 'Delicious Nihari' },
  { id: 2, name: 'Biryani', price: 8.99, image: '/p2.jpg', description: 'Delicious Biryani' },
  { id: 3, name: 'Qorma', price: 12.99, image: '/p3.webp', description: 'Badami Qorma' },
  { id: 4, name: 'Karahi', price: 7.99, image: '/p4.jpg', description: 'Shahi Karahi' },
  { id: 5, name: 'Haleem', price: 14.99, image: '/p5.webp', description: 'Deghi Haleem' },
  { id: 6, name: 'Chicken Pulao', price: 9.99, image: '/p6.jpg', description: 'Delicious Pulao' },
  { id: 7, name: 'Desi Kheer Special', price: 19.99, image: '/p7.jpg', description: 'Kheer' },
  { id: 8, name: 'Desi Zarda Special', price: 4.99, image: '/p8.jpg', description: 'Overloaded Zarda' },
];

const DealsPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        } else {
          console.error('Invalid cart data in localStorage');
          localStorage.removeItem('cart');
        }
      } catch (error) {
        console.error('Error parsing cart data from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Page Title */}
      <h1 className="text-5xl font-bold text-center mb-6 text-[#4D0011] dark:text-gray-100">
        Shop All
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <Link href={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover transition-transform hover:scale-110"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</p>
              </div>
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-[#4D0011] text-white py-2 mt-2 hover:bg-red-500"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      {cart.length > 0 && (
        <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-2 border-b border-gray-300"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">Qty: {item.quantity}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-lg font-bold">Total: ${calculateTotal()}</p>
            <button
              onClick={() => alert('Proceed to Checkout')}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealsPage;

