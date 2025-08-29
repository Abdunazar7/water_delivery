const express = require("express");
const customerRoutes = require("./customer.routes");
const districtRoutes = require("./district.routes");
const productRoutes = require("./water_products.routes");
const addressRoutes = require("./address.routes");
const staffRoutes = require("./delivery_staff.routes");
const ordersRoutes = require("./orders.routes");
const orderItemsRoutes = require("./order_items.routes");
const paymentsRoutes = require("./payments.routes");

const router = express.Router();

router.use("/customers", customerRoutes);
router.use("/districts", districtRoutes);
router.use("/products", productRoutes);
router.use("/address", addressRoutes);
router.use("/staff", staffRoutes);
router.use("/orders", ordersRoutes);
router.use("/order-items", orderItemsRoutes);
router.use("/payments", paymentsRoutes);

module.exports = router;
