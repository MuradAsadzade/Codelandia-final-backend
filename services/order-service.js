const Order=require("../models/order/order.js");
const pool=require("../config/db.js");
const {ErrorResult,SuccessResult,EmptyResult}=require("../utils/results.js")


const getAllOrders=async ()=>{
    let result=await pool.query("SELECT * FROM orders where orders.deleted=0");
    result=Order.MapAll(result.rows);
    if(result.length==0){
        return new SuccessResult(null,"No order found")
    }
    return new SuccessResult(result,"All orders displayed");
}

const getOrderById=async (id)=>{
    let result=await pool.query("SELECT * FROM orders where orders.id=$1",[id]);
    result=Order.MapOne(result.rows[0]);
    // console.log(result);
    
    if(result.user_id==undefined){
        return new SuccessResult(null,`Order with this id:${id} was not found`);
    }
    return new SuccessResult(result,"Order was found");
}


const addOrder=async (order)=>{
    try {
        
        let result=await pool.query("INSERT INTO orders(user_id,total_amount,status) VALUES($1,$2,$3)",[
            order.user_id,
            order.total_amount,
            order.status ? order.status : "pending"
        ]);
        console.log(result);
        
        let new_order=Order.MapOne(order);
        
        return new SuccessResult(new_order,"Order created successfully");
    } catch (error) {
        return new ErrorResult(null,"This order is already available");
    }
}

const deleteOrder=async (id)=>{
    
    let res=await pool.query("UPDATE orders SET deleted=$1 WHERE id=$1 returning *" ,[id]);
    let result=Order.MapOne(res.rows[0]);
    if(result.name==undefined){
        return new ErrorResult(null,"Order not found")
    };
    return new SuccessResult(result,"Order deleted");
}

const updateOrder=async (id,order)=>{
    
    let res = await pool.query('UPDATE orders SET user_id=$1, total_amount=$2,status=$3 WHERE id=$4 AND deleted=0 returning *', [order.user_id,order.total_amount,order.status ? order.status : "pending", id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Order was not found")
    }
    let result=Order.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"Order updated");
}

const updateOrderUserId=async (id,user_id)=>{
    
    let res = await pool.query('UPDATE orders SET user_id=$1 WHERE id=$2 AND deleted=0 returning *', [user_id, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Order was not found")
    }
    let result=Order.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"Order updated");
}

const updateOrderTotalAmount=async (id,total_amount)=>{
    
    let res = await pool.query('UPDATE orders SET total_amount=$1 WHERE id=$2 AND deleted=0 returning *', [total_amount, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Order was not found")
    }
    let result=Order.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"Order updated");
}

const updateOrderStatus=async (id,status)=>{
    
    let res = await pool.query('UPDATE orders SET status=$1 WHERE id=$2 AND deleted=0 returning *', [status, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Order was not found")
    }
    let result=Order.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"Order updated");
}




module.exports={
    getAllOrders,
    getOrderById,
    addOrder,
    deleteOrder,
    updateOrder,
    updateOrderUserId,
    updateOrderTotalAmount,
    updateOrderStatus
}