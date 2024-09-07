const productImageControllers = require("../controllers/product_image-controller.js");
const express = require("express");

const router = express.Router();

router.get("/", productImageControllers.getAllProductImages);
router.get("/:id", productImageControllers.getProductImageById);
router.post("/add", productImageControllers.addProductImage);
router.delete("/delete/:id", productImageControllers.deleteProductImage);
router.put("/update/:id", productImageControllers.updateProductImage);
router.patch('/update/image_url/:id', productImageControllers.updateProductImageURL);
router.patch('/update/product_id/:id', productImageControllers.updateProductImageProductId);

module.exports = router;