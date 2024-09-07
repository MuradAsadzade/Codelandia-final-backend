const shippingControllers=require("../controllers/shipping-controller.js")
const express=require("express");

const router=express.Router();


router.get("/",shippingControllers.getAllShippings);
router.get("/:id",shippingControllers.getShippingById);
router.post("/add",shippingControllers.addShipping);
router.delete("/delete/:id",shippingControllers.deleteShipping);
router.put("/update/:id",shippingControllers.updateShipping);
router.patch('/update/order_id/:id',shippingControllers.updateShippingOrderId);
router.patch('/update/address/:id',shippingControllers.updateShippingAddress);
router.patch('/update/method/:id',shippingControllers.updateShippingMethod);
router.patch('/update/status/:id',shippingControllers.updateShippingStatus);
router.patch('/update/date/:id',shippingControllers.updateShippingDate);

module.exports=router;


