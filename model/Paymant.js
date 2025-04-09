const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
  order: { type: Object, required: true },
  amount: { type: Number, required: true },
  tax: { type: Number, required: true },
  discount: { type: Number, required: true },
  extraCharges: { type: Array, required: true }, // [{reasom: String, amount: Number}]
  status: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  date: { type: Date, required: true },
  transDetails: { type: String, required: true },
});
module.exports = mongoose.model("payment", PaymentSchema);
