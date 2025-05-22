const express = require("express");
const router = express.Router();
const Customer = require("../model/Customer");
const CustomerController = require("../controller/Customer");
const verifyToken = require("../middleware/Auth");

router.post(
  "/customer",
  verifyToken(["admin", "manager"]),
  CustomerController.saveCustomer
);
router.get(
  "/customer",
  verifyToken(["admin", "manager", "user"]),
  CustomerController.loadAllCustomers
);
router.get(
  "/customer/:id",
  verifyToken(["admin", "manager", "user"]),
  CustomerController.findCustomer
);
router.put(
  "/customer/:id",
  verifyToken(["admin"]),
  CustomerController.updateCustomer
);
router.delete(
  "/customer/:id",
  verifyToken(["admin"]),
  CustomerController.deleteCustomer
);

module.exports = router;
