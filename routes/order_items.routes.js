const express = require("express");
const {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
} = require("../controllers/order_items.controller");

const router = express.Router();

router.post("/", createOrderItem);
router.get("/", getOrderItems);
router.get("/:id", getOrderItemById);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);

module.exports = router;
