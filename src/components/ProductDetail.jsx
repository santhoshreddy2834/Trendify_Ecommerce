// src/components/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 flex justify-center">
      <div className="max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-400 mb-2">{product.description}</p>
        <p className="text-orange-400 font-semibold text-lg mb-4">
          ₹{product.price}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white font-semibold"
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
