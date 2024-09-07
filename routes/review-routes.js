const reviewControllers=require("../controllers/review-controller.js")
const express=require("express");

const router=express.Router();


router.get("/",reviewControllers.getAllReviews);
router.get("/:id",reviewControllers.getReviewById);
router.post("/add",reviewControllers.addReview);
router.delete("/delete/:id",reviewControllers.deleteReview);
router.put("/update/:id",reviewControllers.updateReview);
router.patch('/update/product_id/:id',reviewControllers.updateReviewProductId);
router.patch('/update/user_id/:id',reviewControllers.updateReviewUserId);
router.patch('/update/rating/:id',reviewControllers.updateReviewRating);
router.patch('/update/comment/:id',reviewControllers.updateReviewComment);

module.exports=router;