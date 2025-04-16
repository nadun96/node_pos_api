const express = require("express");
const router = express.Router();
const payments = require("../model/Payment");
const paymentsController = require("../controller/Payment");
const verifyToken = require("../middleware/Auth");
router.post(
  "/create",
  verifyToken(["admin", "manager", "user"]),
  paymentsController.makePayment
);
router.put(
  "/update/:id",
  verifyToken(["admin", "manager", "user"]),
  paymentsController.updatePayment
);
router.get(
  "/day",
  verifyToken(["admin", "manager", "user"]),
  paymentsController.findIncomeToday
);
router.get(
  "/month",
  verifyToken(["admin", "manager", "user"]),
  paymentsController.findIncomeMonth
);

module.exports = router;
