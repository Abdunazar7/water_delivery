const express = require("express");
const {
createdistrict, getdistricts, getdistrictById, updatedistrict, deletedistrict
} = require("../controllers/district.controller");

const router = express.Router();

router.post("/", createdistrict);
router.get("/", getdistricts);
router.get("/:id", getdistrictById);
router.patch("/:id", updatedistrict);
router.delete("/:id", deletedistrict);

module.exports = router;
