// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="group relative block bg-white rounded shadow overflow-hidden hover:shadow-lg transition">
      <div className="relative h-[350px] sm:h-[450px] overflow-hidden">
        <img
          src={product.image1}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition"
        />
        <img
          src={product.image2}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
        <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
