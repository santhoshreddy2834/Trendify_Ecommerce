const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  price: { type: Number, required: true },
  category: String,           // Men, Women, Kids, etc.
  brand: String,              // Nike, Adidas, etc.
  color: String,              // Red, Blue, etc.
  size: [String],             // ["S", "M", "L", "XL"]
  discount: { type: Number }, // 10, 20, etc. (% off)
});

module.exports = mongoose.model("Product", productSchema);
