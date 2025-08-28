const express = require("express");
const {
  createDeliveryStaff,
  getDeliveryStaff,
  getDeliveryStaffById,
  patchDeliveryStaff,
  deleteDeliveryStaff,
} = require("../controllers/delivery_staff.controller");

const router = express.Router();

router.post("/", createDeliveryStaff);
router.get("/", getDeliveryStaff);
router.get("/:id", getDeliveryStaffById);
router.patch("/:id", patchDeliveryStaff);
router.delete("/:id", deleteDeliveryStaff);

module.exports = router;
