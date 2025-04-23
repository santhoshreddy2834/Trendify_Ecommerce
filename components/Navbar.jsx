// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length > 1) {
      axios.get(`http://localhost:5000/api/products/search?q=${query}`)
        .then(res => setSuggestions(res.data))
        .catch(err => console.error("Search error", err));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/products?search=${query}`);
      setQuery('');
      setSuggestions([]);
    }
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-orange-500 font-bold text-xl">Trendify</Link>

      <div className="relative w-1/2 mx-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search for products..."
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-12 left-0 bg-white text-black w-full rounded shadow-md z-50">
            {suggestions.map(product => (
              <li
                key={product._id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  navigate(`/products/${product._id}`);
                  setQuery('');
                  setSuggestions([]);
                }}
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-4 text-white">
        <Link to="/products" className="hover:text-orange-400">Collections</Link>
        <Link to="/login" className="hover:text-orange-400">Login</Link>
        <Link to="/cart" className="hover:text-orange-400 relative">
          🛒 Cart
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
              {cartItems.length}
            </span>
          )}
        </Link>
        <Link to="/profile" className="hover:text-orange-400">👤 Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;