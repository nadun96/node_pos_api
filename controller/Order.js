const Order = require("../model/Order");

// functions
const saveOrder = async (req, res) => {
  // admin, manager
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json({ message: "Order Saved", data: savedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  // admin, manager
  try {
    const order = new Order(req.body);
    const updatedOrder = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedOrder) {
      return res
        .status(404)
        .json({ message: "Order Updated", data: updatedOrder });
    }
    res.status(404).json({ message: "Order not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  // admin, manager
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (["PENDING", "CIOMPLETED", "REJECTED", "CANCELLED"].includes(status)) {
      const order = await Order.findByIdAndUpdate(id, status, {
        new: true,
        runValidators: true,
      });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res
        .status(200)
        .json({ message: "Order status updated", data: order });
    }
    return res.status(400).json({ message: "Invalid status value" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const selectedOrder = await Order.findById(
      { _id: req.params.id },
      req.body
    );
    if (!selectedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(201).json({ message: "Order found", data: selectedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
loadAllOrders = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const cutomerList = await order
      .find()
      .sort({ Date: -1 })
      .limit(parseInt(size))
      .skip((page - 1) * size);
    const totalOrders = await order.countDocuments();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  saveOrder,
  updateOrder,
  updateOrderStatus,
  findOrder,
};
