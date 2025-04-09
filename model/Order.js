const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  customer: { type: Object, required: true },
  products: { type: Array },
  cost: { type: Number, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("order", OrderSchema);
