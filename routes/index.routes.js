const express = require("express");
const customerRoutes = require("./customer.routes");
const regionRoutes = require("./region.routes");
const productRoutes = require("./water_products.routes");

const router = express.Router();

router.use("/customers", customerRoutes);
router.use("/regions", regionRoutes);
router.use("/products", productRoutes);

module.exports = router;
