const Payment = require("../model/Payment");

// functions
const makePayment = async (req, res) => {
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

const findIncomeToday = async (req, res) => {
  try {
    const { day } = req.query; // YYYY MM DD
    const stardDay = new Date(day);
    const endDay = new Date(day);

    endDay.setDate(endDay.getDate() + 1);

    const data = await Payment.find({
      createdAt: {
        $gte: stardDay,
        $lt: endDay,
      },
    });
    if (!data) {
      return res.status(404).json({ message: "No payment found" });
    }

    const totalIncome = payments.reduce((acc, payment) => {
      return acc + payment.amount;
    }, 0);

    res.status(200).json({
      message: "Todays's found",
      data: payments,
      totalIncome: totalIncome,
    });
  } catch {
    res.status(500).json({ error: error.message });
  }
};

const findIncomeMonth = async (req, res) => {
  try {
    const { month } = req.query; // YYYY MM
    const startMonth = new Date(month);
    const endMonth = new Date(month);

    endMonth.setMonth(endMonth.getMonth() + 1);

    const payments = await Payment.find({
      createdAt: {
        $gte: startMonth,
        $lt: endMonth,
      },
    });
    if (!payments) {
      return res.status(404).json({ message: "No payment found" });
    }

    const totalIncome = payments.reduce((acc, payment) => {
      const day = Payment.Date.toISOString().split("T")[0];
      acc[day] = (acc[day] || 0) + payment.amount;
      return acc;
    }, []);

    res.status(200).json({
      message: "Month's found",
      data: { month: nw.getMonth() + 1, income: totalIncome },
      totalIncome: totalIncome,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const selectedPayment = await Payment.findById(
      { _id: req.params.id },
      req.body
    );
    if (!selectedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(201).json({ message: "Payment found", data: selectedPayment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const deletedPayment = await Payment.findByIdAndDelete(
      { _id: req.params.id },
      req.body
    );
    if (deletedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment Deleted", data: deletedPayment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  makePayment,
  updatePayment,
  findPayment,
  deletePayment,
  findIncomeToday,
  findIncomeMonth,
};
