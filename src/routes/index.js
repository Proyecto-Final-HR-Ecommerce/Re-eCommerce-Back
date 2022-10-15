const { Router } = require("express");
const productRoutes = require("./productRoutes/product.routes");
const userForAdminRoutes = require("./userForAdminRoutes/userForAdmin.routes");
const login = require("./login/login.routes");
const userRoutes = require("./user/user.routes");
const userCategory = require("./category/category.routes.js");
const reviewsRoutes = require("./review/review.routes");
const mercagoPago = require("./mercadoPago/mercagoPago.routes");
const orderRoutes = require("./orders/order.routes");

const router = Router();

router.use("/", productRoutes);
router.use("/", userForAdminRoutes);
router.use("/", userRoutes);
router.use("/", reviewsRoutes);
router.use("/", login);
router.use("/", userCategory);
router.use("/", mercagoPago);
router.use("/", orderRoutes);

module.exports = router;
