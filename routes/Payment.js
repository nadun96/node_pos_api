const express = require("express");
const router = express.Router();
const payments = require("../model/Payment");
const paymentsController = require("../controller/Payment");

router.post("/create", paymentsController.makePayment);
router.put("/update/:id", paymentsController.updatePayment);
router.get("/day", paymentsController.findIncomeToday);
router.get("/month", paymentsController.findIncomeMonth);

module.exports = router;
