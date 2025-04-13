const express = require("express");
const router = express.Router();
const orderController = require("../controller/Order");

router.post("/create", orderController.saveOrder); // Create a new order
router.put("/update/:id", orderController.updateOrder); // Update an existing order
router.put("/update-status/:id", orderController.updateOrderStatus); // Update order status
router.delete("/delete/:id", orderController.deleteOrder); // Delete an order
router.get("/find/:id", orderController.findOrder); // Find an order by ID
router.get("/find", orderController.loadAllOrders); // Find all orders

module.exports = router;
