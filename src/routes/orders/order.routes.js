const { Router } = require("express");
const {
  getAllOrders,
  getUserOrders,
  getOrdersProduct,
  getOrder,
} = require("../../controllers/order.controller");

const router = Router();
//Todas las órdenes
router.get("/orders", getAllOrders);
//Todas las órdenes de un usuario
router.get("/:userId/orders", getUserOrders);
//Todas las órdenes de un producto
router.get("/:productId/orders", getOrdersProduct);
//Una orden en particular
router.put("/order/:orderId", getOrder);

module.exports = router;
