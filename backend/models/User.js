const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin", "Vendor", "Super Admin"], default: "User" },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
