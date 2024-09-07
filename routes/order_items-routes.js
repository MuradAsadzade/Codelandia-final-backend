const orderItemController=require("../controllers/order_items-controller.js")
const express=require("express");

const router=express.Router();


router.get("/",orderItemController.getAllOrderItems);
router.get("/:id",orderItemController.getOrderItemById);
router.post("/add",orderItemController.addOrderItem);
router.delete("/delete/:id",orderItemController.deleteOrderItem);
router.put("/update/:id",orderItemController.updateOrderItem);
router.patch('/update/order_id/:id',orderItemController.updateOrderItemOrderId);
router.patch('/update/product_id/:id',orderItemController.updateOrderItemProductId);
router.patch('/update/quantity/:id',orderItemController.updateOrderItemQuantity);
router.patch('/update/price/:id',orderItemController.updateOrderItemPrice);

module.exports=router;