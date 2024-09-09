const Review=require("../models/review/review.js");
const pool=require("../config/db.js");
const {ErrorResult,SuccessResult,EmptyResult}=require("../utils/results.js")


const getAllReviews=async ()=>{
    let result=await pool.query("SELECT * FROM reviews where reviews.deleted=0 ORDER BY id");
    result=Review.MapAll(result.rows);
    if(result.length==0){
        return new SuccessResult(null,"No reviews found")
    }
    return new SuccessResult(result,"All Reviews displayed");
}

const getReviewById=async (id)=>{
    let result=await pool.query("SELECT * FROM reviews where reviews.id=$1",[id]);
    result=Review.MapOne(result.rows[0]);
    if(result.name==undefined){
        return new SuccessResult(null,`Review with this id:${id} was not found`);
    }
    return new SuccessResult(result,"Review was found");
}


const addReview=async (review)=>{
    try {
        
        let result=await pool.query("INSERT INTO reviews(product_id,user_id,rating,comment) VALUES($1,$2,$3,$4)",[
            review.product_id,
            review.user_id,
            review.rating,
            review.comment
        ]);
        console.log(result);
        
        let new_Review=Review.MapOne(review);
        
        return new SuccessResult(new_Review,"Review created successfully");
    } catch (error) {
        return new ErrorResult(null,error);
    }
}

const deleteReview=async (id)=>{
    
    let res=await pool.query("UPDATE reviews SET deleted=$1 WHERE id=$1 returning *" ,[id]);
    let result=Review.MapOne(res.rows[0]);
    if(result.name==undefined){
        return new ErrorResult(null,"Review not found")
    };
    return new SuccessResult(result,"Review deleted");
}

const updateReview=async (id,review)=>{
    
    let res = await pool.query('UPDATE reviews SET product_id=$1, user_id=$2,rating=$3,comment=$4 WHERE id=$5 AND deleted=0 returning *', [review.product_id, review.user_id,review.rating,review.comment, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Review was not found")
    }
    let result=Review.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"Review updated");
}

const updateReviewProductId=async (id,product_id)=>{
    
    let res = await pool.query('UPDATE reviews SET product_id=$1 WHERE id=$2 AND deleted=0 returning *', [product_id, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Review was not found")
    }
    let result=Review.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"Review updated");
}

const updateReviewUserId=async (id,user_id)=>{
    
    let res = await pool.query('UPDATE reviews SET user_id=$1 WHERE id=$2 AND deleted=0 returning *', [user_id, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Review was not found")
    }
    let result=Review.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"Review updated");
}

const updateReviewRating=async (id,rating)=>{
    
    let res = await pool.query('UPDATE reviews SET rating=$1 WHERE id=$2 AND deleted=0 returning *', [rating, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Review was not found")
    }
    let result=Review.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"Review updated");
}

const updateReviewComment=async (id,comment)=>{
    
    let res = await pool.query('UPDATE reviews SET comment=$1 WHERE id=$2 AND deleted=0 returning *', [comment, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Review was not found")
    }
    let result=Review.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"Review updated");
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