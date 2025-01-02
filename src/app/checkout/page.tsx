'use client';
import React, { useState, useEffect } from 'react';

const CheckoutPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [orderSummary, setOrderSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setOrderSummary(parsedCart);
        } else {
          console.error('Invalid cart format in localStorage');
        }
      } catch (error) {
        console.error('Error parsing cart data from localStorage', error);
      }
    }
  }, []);

  const totalAmount = orderSummary.reduce((total, item) => total + item.quantity * item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const orderData = {
      name,
      email,
      phone,
      address,
      city,
      zipCode,
      cardNumber,
      expiration,
      cvv,
      orderSummary,
      totalAmount,
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Order confirmed:', data);
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-white text-black">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg shadow-lg p-4 w-full max-w-md bg-white"
      >
        <h1 className="text-center mb-4 text-lg font-bold">Checkout</h1>

        <h2 className="text-sm mb-2">Personal Information</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 p-2 border rounded-lg text-sm w-full border-gray-300"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded-lg text-sm w-full border-gray-300"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-2 p-2 border rounded-lg text-sm w-full border-gray-300"
        />

        <h2 className="text-sm mb-2">Shipping Address</h2>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mb-2 p-2 border rounded-lg text-sm w-full border-gray-300"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mb-2 p-2 border rounded-lg text-sm w-full border-gray-300"
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="mb-2 p-2 border rounded-lg text-sm w-full border-gray-300"
        />

        <h2 className="text-sm mb-2">Payment Information</h2>
        <input
          type="text"
          placeholder="Credit Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="mb-2 p-2 border rounded-lg text-sm w-full border-gray-300"
        />
        <input
          type="text"
          placeholder="Expiration Date (MM/YY)"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
          className="mb-2 p-2 border rounded-lg text-sm w-full border-gray-300"
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="mb-2 p-2 border rounded-lg text-sm w-full border-gray-300"
        />

        <h2 className="text-sm mb-2">Order Summary</h2>
        <ul className="mb-4 pl-4 text-xs">
          {orderSummary.length > 0 ? (
            orderSummary.map((item, index) => (
              <li key={index} className="mb-1">
                {item.quantity} x {item.name} @ ${item.price.toFixed(2)} each
              </li>
            ))
          ) : (
            <p>No items in cart.</p>
          )}
        </ul>
        <p className="text-xs font-bold">Total: ${totalAmount.toFixed(2)}</p>

        <button
          type="submit"
          className="p-2 rounded-lg w-full mt-4 font-bold bg-black text-white"
        >
          {loading ? 'Processing...' : 'Complete Order'}
        </button>

        {error && <p className="text-red-500 mt-4 text-xs">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutPage;
