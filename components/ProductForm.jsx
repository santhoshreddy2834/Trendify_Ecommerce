import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", formData);
      alert("✅ Product Added Successfully");
      setFormData({ name: "", description: "", image: "", price: "", category: "" });
    } catch (err) {
      console.error("❌ Failed to add product:", err.message);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-orange-400">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full p-3 rounded bg-gray-800" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-3 rounded bg-gray-800" required />
        <input type="url" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full p-3 rounded bg-gray-800" required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-3 rounded bg-gray-800" required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-3 rounded bg-gray-800" required />
        <button type="submit" className="w-full bg-orange-500 py-2 rounded hover:bg-orange-600 font-semibold">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
