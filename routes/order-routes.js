const orderControllers=require("../controllers/order-controller.js")
const express=require("express");

const router=express.Router();


router.get("/",orderControllers.getAllOrders);
router.get("/:id",orderControllers.getOrderById);
router.post("/add",orderControllers.addOrder);
router.delete("/delete/:id",orderControllers.deleteOrder);
router.put("/update/:id",orderControllers.updateOrder);
router.patch('/update/user_id/:id',orderControllers.updateOrderUserId);
router.patch('/update/total_amount/:id',orderControllers.updateOrderTotalAmount);
router.patch('/update/status/:id',orderControllers.updateOrderStatus);

module.exports=router;