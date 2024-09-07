const productControllers=require("../controllers/product-controller.js")
const express=require("express");

const router=express.Router();


router.get("/",productControllers.getAllProducts);
router.get("/:id",productControllers.getProductById);
router.post("/add",productControllers.addProduct);
router.delete("/delete/:id",productControllers.deleteProduct);
router.put("/update/:id",productControllers.updateProduct);
router.patch('/update/name/:id',productControllers.updateProductName);
router.patch('/update/description/:id',productControllers.updateProductDescription);
router.patch('/update/price/:id',productControllers.updateProductPrice);

module.exports=router;