const express = require("express");
const {
  createDeliveryStaff,
  getDeliveryStaff,
  getDeliveryStaffById,
  updateDeliveryStaff,
  deleteDeliveryStaff,
} = require("../controllers/delivery_staff.controller");

const router = express.Router();

router.post("/", createDeliveryStaff);
router.get("/", getDeliveryStaff);
router.get("/:id", getDeliveryStaffById);
router.put("/:id", updateDeliveryStaff);
router.delete("/:id", deleteDeliveryStaff);

module.exports = router;
