const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  qtyOnHand: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  images: { type: Array },
});

ProductSchema.statics.findLowStockProducts = function () {
  return this.find({ qtyOnHand: { $lt: 10 } });
};

module.exports = mongoose.model("product", ProductSchema);
