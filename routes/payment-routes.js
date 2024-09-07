const paymentControllers=require("../controllers/payment-controller.js")
const express=require("express");

const router=express.Router();


router.get("/",paymentControllers.getAllPayments);
router.get("/:id",paymentControllers.getPaymentById);
router.post("/add",paymentControllers.addPayment);
router.delete("/delete/:id",paymentControllers.deletePayment);
router.put("/update/:id",paymentControllers.updatePayment);
router.patch('/update/order_id/:id',paymentControllers.updatePaymentOrderId);
router.patch('/update/method/:id',paymentControllers.updatePaymentMethod);
router.patch('/update/status/:id',paymentControllers.updatePaymentStatus);
router.patch('/update/date/:id',paymentControllers.updatePaymentDate);

module.exports=router;


