const reviewService=require("../services/review-service.js");

const getAllReviews=async (req,res)=>{
    let result=await reviewService.getAllReviews();
    res.json(result);
};

const getReviewById=async (req,res)=>{
    let result=await reviewService.getReviewById(req.params.id);
    res.json(result);
}


const addReview=async (req,res)=>{
    const result=await reviewService.addReview(req.body);
    res.json(result);
}

const deleteReview=async (req,res)=>{
    const result=await reviewService.deleteReview(req.params.id);
    res.json(result);
}

const updateReview=async(req,res)=>{
    const result=await reviewService.updateReview(req.params.id,req.body);
    res.json(result);
}

const updateReviewProductId=async(req,res)=>{
    const result=await reviewService.updateReviewProductId(req.params.id,req.body.product_id);
    res.json(result);

}
const updateReviewUserId=async(req,res)=>{
    const result=await reviewService.updateReviewUserId(req.params.id,req.body.user_id);
    res.json(result);

}

const updateReviewRating=async(req,res)=>{
    const result=await reviewService.updateReviewRating(req.params.id,req.body.rating);
    res.json(result);

}

const updateReviewComment=async(req,res)=>{
    const result=await reviewService.updateReviewComment(req.params.id,req.body.comment);
    res.json(result);

}



module.exports={
    getAllReviews,
    getReviewById,
    addReview,
    deleteReview,
    updateReview,
    updateReviewProductId,
    updateReviewUserId,
    updateReviewRating,
    updateReviewComment
}
