const cartItemController=require("../controllers/cart_items-controller.js")
const express=require("express");

const router=express.Router();


router.get("/",cartItemController.getAllCartItems);
router.get("/:id",cartItemController.getCartItemById);
router.post("/add",cartItemController.addCartItem);
router.delete("/delete/:id",cartItemController.deleteCartItem);
router.put("/update/:id",cartItemController.updateCartItem);
router.patch('/update/user_id/:id',cartItemController.updateCartItemUserId);
router.patch('/update/product_id/:id',cartItemController.updateCartItemProductId);
router.patch('/update/quantity/:id',cartItemController.updateCartItemQuantity);


module.exports=router;