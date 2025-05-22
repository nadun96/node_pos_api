const express = require("express");
const router = express.Router();
const Product = require("../model/Product");
const ProductController = require("../controller/Product");
const verifyToken = require("../middleware/Auth");
router.post(
  "/create",
  verifyToken(["admin", "manager"]),
  ProductController.saveProduct
);
router.get(
  "/find:id",
  verifyToken(["admin", "manager", "user"]),
  ProductController.getProduct
);
router.get(
  "/find",
  verifyToken(["admin", "manager", "user"]),
  ProductController.getProducts
);
router.put(
  "/update/:id",
  verifyToken(["admin"]),
  ProductController.updateProduct
);
router.delete(
  "/delete/:id",
  verifyToken(["admin", "manager", "user"]),
  ProductController.deleteProduct
);
router.get(
  "/lowstock",
  verifyToken(["admin", "manager"]),
  ProductController.findLowStockProducts
);

module.exports = router;
