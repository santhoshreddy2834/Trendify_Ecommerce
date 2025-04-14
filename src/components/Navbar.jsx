// src/components/Navbar.jsx

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold text-orange-500">Trendify</h1>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-orange-400">Home</Link>
        <Link to="/login" className="hover:text-orange-400">Login</Link>
        <Link to="/register" className="hover:text-orange-400">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
