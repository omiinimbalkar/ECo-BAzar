// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  pname: String,
  pdesc: String,
  price: Number,
  category: String,
  pimg: String,
  plat: Number,
  plog: Number,
  address: String,
  phone: String,
  condition: String,
  userId: String,
  
  // 🔥 Date field
  createdAt: {
    type: Date,
    default: () => new Date(),  // ⬅️ This creates a fresh timestamp on creation only
    immutable: true             // ⬅️ This makes sure it's NEVER changed again
  }
});

module.exports = mongoose.model("Product", ProductSchema);
