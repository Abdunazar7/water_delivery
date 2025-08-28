const express = require("express");
const {
  createRegion,
  getRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
} = require("../controllers/region.controller");

const router = express.Router();

router.post("/", createRegion);
router.get("/", getRegions);
router.get("/:id", getRegionById);
router.patch("/:id", updateRegion);
router.delete("/:id", deleteRegion);

module.exports = router;
