const express = require("express");
const router = express.Router();
const orderController = require("../controller/Order");
const verifyToken = require("../middleware/Auth");

router.post(
  "/create",
  verifyToken(["admin", "manager"]),
  orderController.saveOrder
); // Create a new order

router.put(
  "/update/:id",
  verifyToken(["admin"]),
  orderController.updateOrder
); // Update an existing order

router.put(
  "/update-status/:id",
  verifyToken(["admin"]),
  orderController.updateOrderStatus
); // Update order status

router.delete(
  "/delete/:id",
  verifyToken(["admin"]),
  orderController.deleteOrder
); // Delete an order

router.get(
  "/find/:id",
  verifyToken(["admin", "manager", "user"]),
  orderController.findOrder
); // Find an order by ID

router.get(
  "/find",
  verifyToken(["admin", "manager", "user"]),
  orderController.loadAllOrders
); // Find all orders

module.exports = router;
