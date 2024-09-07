const categoryControllers=require("../controllers/category-controller.js")
const express=require("express");

const router=express.Router();


router.get("/",categoryControllers.getAllCategories);
router.get("/:id",categoryControllers.getCategoryById);
router.post("/add",categoryControllers.addCategory);
router.delete("/delete/:id",categoryControllers.deleteCategory);
router.put("/update/:id",categoryControllers.updateCategory);
router.patch('/update/name/:id',categoryControllers.updateCategoryName);
router.patch('/update/description/:id',categoryControllers.updateCategoryDescription);

module.exports=router;