const Payment = require("../model/Payment");

// functions
const savePayment = async (req, res) => {
  // admin, manager
  try {
    const payment = new Payment(req.body);
    const savedPayment = await payment.save();
    res.status(201).json({ message: "Payment Saved", data: savedPayment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePayment = async (req, res) => {
  // admin, manager
  try {
    const payment = new Payment(req.body);
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedPayment) {
      return res
        .status(404)
        .json({ message: "Payment Updated", data: updatedPayment });
    }
    res.status(404).json({ message: "Payment not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {};
