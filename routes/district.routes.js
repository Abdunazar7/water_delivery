const express = require("express");
const {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
} = require("../controllers/district.controller");

const router = express.Router();
router.post("/", createDistrict);
router.get("/", getDistricts);
router.get("/:id", getDistrictById);
router.put("/:id", updateDistrict);
router.delete("/:id", deleteDistrict);

module.exports = router;
