const { Router } = require("express");

const {
  getFilterbyQuery,
  postCategory,
  getProductCategories,
  modifyProductCategories,
} = require("../../controllers/category.controller");
// const { getProduct } = require("../../controllers/products.controller");

const router = Router();

router.post("/category", postCategory);
router.get("/product/:productId/category", getProductCategories);
router.put("/product/:productId/category", modifyProductCategories);
router.get("/products/category", getFilterbyQuery);

module.exports = router;
