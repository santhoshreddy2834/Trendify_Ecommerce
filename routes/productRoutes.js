// server/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// 🔹 GET all products
router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    let products;

    if (q) {
      products = await Product.find({ name: new RegExp(q, "i") });
    } else {
      products = await Product.find();
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching products." });
  }
});

// 🔹 GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product by ID" });
  }
});

module.exports = router;
