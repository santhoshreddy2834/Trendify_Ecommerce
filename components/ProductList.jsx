import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const categories = ["All", "Men", "Women", "Kids", "Footwear", "Accessories"];
const brands = ["Nike", "Adidas", "Puma","GUCCI"];
const colors = ["White", "Black", "Red", "Blue","Yellow","Pink"];
const sizes = ["S", "M", "L", "XL","XXL"];
const priceOptions = [
  { label: "All", value: "all" },
  { label: "Under ₹500", value: 500 },
  { label: "Under ₹1000", value: 1000 },
  { label: "Under ₹2000", value: 2000 },
  { label: "Under ₹3000", value: 3000 },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("all");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("API error:", err));
  }, []);

  const handleBrandChange = (brand) => {
    setSelectedBrand(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchBrand = selectedBrand.length === 0 || selectedBrand.includes(product.brand);
    const matchColor = !selectedColor || product.color === selectedColor;
    const matchSize = !selectedSize || (product.size && product.size.includes(selectedSize));
    const matchPrice = selectedPrice === "all" || product.price <= selectedPrice;
    return matchCategory && matchBrand && matchColor && matchSize && matchPrice;
  });

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      {/* Sidebar Filters */}
      <div className="w-64 p-6 border-r border-gray-700 space-y-6">
        <div>
          <h2 className="font-semibold text-orange-400 mb-2">Category</h2>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block w-full text-left px-3 py-2 rounded ${selectedCategory === cat ? "bg-orange-500" : "hover:bg-gray-700"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div>
          <h2 className="font-semibold text-orange-400 mb-2">Brand</h2>
          {brands.map((brand) => (
            <label key={brand} className="block">
              <input
                type="checkbox"
                checked={selectedBrand.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="mr-2"
              />
              {brand}
            </label>
          ))}
        </div>

        <div>
          <h2 className="font-semibold text-orange-400 mb-2">Color</h2>
          <div className="flex gap-2 flex-wrap">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color === selectedColor ? "" : color)}
                className={`h-6 w-6 rounded-full border-2 ${selectedColor === color ? "border-white" : "border-gray-500"}`}
                style={{ backgroundColor: color.toLowerCase() }}
              ></button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-orange-400 mb-2">Size</h2>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size === selectedSize ? "" : size)}
                className={`px-3 py-1 rounded border ${selectedSize === size ? "bg-orange-500" : "hover:bg-gray-700"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-orange-400 mb-2">Price</h2>
          <select
            className="w-full bg-gray-800 text-white p-2 rounded"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value === "all" ? "all" : parseInt(e.target.value))}
          >
            {priceOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-orange-400 mb-6">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Link to={`/products/${product._id}`} key={product._id}>
                <div className="bg-white text-black rounded-lg p-4 shadow-md hover:shadow-lg transition">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover mb-4 rounded"
                  />
                  <h2 className="font-semibold text-lg">{product.name}</h2>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="mt-2 text-orange-500 font-bold">₹{product.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-white">No products found</p>
          )}
        </div>

        {/* AI-Based Recommendations */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">Recommended for You</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {products.slice(0, 5).map(product => (
              <Link to={`/products/${product._id}`} key={product._id}>
                <div className="min-w-[200px] bg-white text-black rounded-lg p-3 shadow-md hover:shadow-lg transition">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full object-cover mb-2 rounded"
                  />
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
                  <p className="mt-1 text-orange-500 font-bold text-sm">₹{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
