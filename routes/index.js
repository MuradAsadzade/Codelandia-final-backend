const express=require("express");
const categoryControllers=require("../controllers/category-controller.js");
const categoryRoute=require("./category-routes.js");
const userRoute=require("./user-routes.js");
const authRoute=require("./auth-routes.js");
const productRoute=require("./product-routes.js");
const orderRoute=require("./order-routes.js");
const orderItemRoute=require("./order_items-routes.js");
const cartItemRoute=require("./cart_items-routes.js");
const paymentRoute=require("./payment-routes.js");
const shippingRoute=require("./shipping-routes.js");
const reviewRoute=require("./review-routes.js");
const productImageRoute=require("./product_image-routes.js");

const router=express.Router();
router.use("/categories",categoryRoute);
router.use("/users",userRoute);
router.use("/auth", authRoute);
router.use("/products",productRoute);
router.use("/orders",orderRoute);
router.use("/order-items",orderItemRoute);
router.use("/cart-items",cartItemRoute);
router.use("/payments",paymentRoute);
router.use("/shippings",shippingRoute);
router.use("/reviews",reviewRoute);
router.use("/product-images/",productImageRoute);


module.exports=router;