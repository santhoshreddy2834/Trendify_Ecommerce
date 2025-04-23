import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  price: Number,
  category: String,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
