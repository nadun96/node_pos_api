const express = require("express");
const router = express.Router();
const Customer = require("../model/Customer");
const CustomerController = require("../controller/Customer");

router.post("/customer", CustomerController.saveCustomer);
router.get("/customer", CustomerController.loadAllCustomers);
router.get("/customer/:id", CustomerController.findCustomer);
router.put("/customer/:id", CustomerController.updateCustomer);
router.delete("/customer/:id", CustomerController.deleteCustomer);

module.exports = router;
